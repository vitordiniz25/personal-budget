import { Transaction, Envelope, sequelize } from "../infra/index.js";

/**
 * GET /transactions
 * Lista todas as transações no sistema.
 */
export async function getAllTransactions(req, res, next) {
  try {
    const transactions = await Transaction.findAll({
      include: { model: Envelope, as: "Envelope" },
      order: [["date", "DESC"]],
    });
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /transactions/:id
 * Busca uma transação pelo ID.
 */
export async function getTransactionById(req, res, next) {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id, {
      include: { model: Envelope, as: "Envelope" },
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /transactions
 * Cria uma nova transação e atualiza o budget do envelope associado.
 * Body esperado:
 * {
 *   envelopeId: number,
 *   amount: number,
 *   description?: string,
 *   date?: string (YYYY-MM-DD)
 * }
 */
export async function createTransaction(req, res, next) {
  const { envelopeId, amount, description = null, date = null } = req.body;

  if (!envelopeId || amount == null) {
    return res
      .status(400)
      .json({ message: "Missing required fields: envelopeId and amount" });
  }

  const t = await sequelize.transaction();
  try {
    const envelope = await Envelope.findByPk(envelopeId, { transaction: t });
    if (!envelope) {
      await t.rollback();
      return res.status(404).json({ message: "Envelope not found" });
    }

    const currentBudget = parseFloat(envelope.budget);
    const transactionAmount = parseFloat(amount);
    if (transactionAmount > currentBudget) {
      await t.rollback();
      return res.status(400).json({ message: "Insufficient envelope budget" });
    }

    const newTransaction = await Transaction.create(
      {
        envelopeId,
        amount: transactionAmount,
        description,
        date: date || new Date().toISOString().slice(0, 10),
      },
      { transaction: t }
    );

    envelope.budget = (currentBudget - transactionAmount).toFixed(2);
    await envelope.save({ transaction: t });

    await t.commit();
    const created = await Transaction.findByPk(newTransaction.id, {
      include: { model: Envelope, as: "Envelope" },
    });
    return res.status(201).json(created);
  } catch (error) {
    await t.rollback();
    next(error);
  }
}

/**
 * DELETE /transactions/:id
 * Remove uma transação (e reverte o valor no envelope).
 */
export async function deleteTransaction(req, res, next) {
  const { id } = req.params;

  const t = await sequelize.transaction();
  try {
    const transaction = await Transaction.findByPk(id, { transaction: t });
    if (!transaction) {
      await t.rollback();
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Recupera o envelope e acrescenta de volta o valor
    const envelope = await Envelope.findByPk(transaction.envelopeId, {
      transaction: t,
    });
    if (!envelope) {
      await t.rollback();
      return res.status(500).json({ message: "Envelope inconsistency" });
    }

    const currentBudget = parseFloat(envelope.budget);
    const amountValue = parseFloat(transaction.amount);
    envelope.budget = (currentBudget + amountValue).toFixed(2);
    await envelope.save({ transaction: t });

    await transaction.destroy({ transaction: t });
    await t.commit();
    return res
      .status(200)
      .json({ message: "Transaction deleted and budget reverted" });
  } catch (error) {
    await t.rollback();
    next(error);
  }
}

/**
 * PUT /transactions/:id
 * Atualiza uma transação (e ajusta o budget do envelope de forma proporcional).
 * Body possível: { envelopeId?, amount?, description?, date? }
 */
export async function updateTransaction(req, res, next) {
  const { id } = req.params;
  const { envelopeId, amount, description, date } = req.body;

  const t = await sequelize.transaction();
  try {
    const transaction = await Transaction.findByPk(id, { transaction: t });
    if (!transaction) {
      await t.rollback();
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (envelopeId && envelopeId !== transaction.envelopeId) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "Changing envelopeId is not supported" });
    }

    const oldAmount = parseFloat(transaction.amount);
    const newAmount = amount != null ? parseFloat(amount) : oldAmount;
    const difference = newAmount - oldAmount;

    const envelope = await Envelope.findByPk(transaction.envelopeId, {
      transaction: t,
    });
    if (!envelope) {
      await t.rollback();
      return res.status(500).json({ message: "Envelope inconsistency" });
    }

    const currentBudget = parseFloat(envelope.budget);
    if (difference > 0 && difference > currentBudget) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "Insufficient envelope budget for update" });
    }

    if (amount != null) transaction.amount = newAmount;
    if (description !== undefined) transaction.description = description;
    if (date !== undefined) transaction.date = date;

    await transaction.save({ transaction: t });

    envelope.budget = (currentBudget - difference).toFixed(2);
    await envelope.save({ transaction: t });

    await t.commit();

    const updated = await Transaction.findByPk(id, {
      include: { model: Envelope, as: "Envelope" },
    });
    return res.status(200).json(updated);
  } catch (error) {
    await t.rollback();
    next(error);
  }
}
