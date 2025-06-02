import { Envelope } from "../models/envelope.js";
import { Transaction } from "../models/transaction.js";

/**
 * GET /envelopes
 * Lista todos os envelopes existentes.
 */
export async function getAllEnvelopes(req, res, next) {
  try {
    const envelopes = await Envelope.findAll();
    return res.status(200).json(envelopes);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /envelopes/:id
 * Busca um envelope pelo ID.
 */
export async function getEnvelopeById(req, res, next) {
  const { id } = req.params;
  try {
    const envelope = await Envelope.findByPk(id, {
      include: { model: Transaction, as: "Transactions" },
    });

    if (!envelope) {
      return res.status(404).json({ message: "Envelope not found" });
    }
    return res.status(200).json(envelope);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /envelopes
 * Cria um novo envelope.
 * Body esperado: { name: string, budget: number }
 */
export async function createEnvelope(req, res, next) {
  const { name, budget } = req.body;
  if (!name || budget == null) {
    return res
      .status(400)
      .json({ message: "Missing required fields: name and budget" });
  }

  try {
    const newEnvelope = await Envelope.create({ name, budget });
    return res.status(201).json(newEnvelope);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /envelopes/:id
 * Atualiza um envelope existente.
 * Body esperado: { name?: string, budget?: number }
 */
export async function updateEnvelope(req, res, next) {
  const { id } = req.params;
  const { name, budget } = req.body;

  try {
    const envelope = await Envelope.findByPk(id);
    if (!envelope) {
      return res.status(404).json({ message: "Envelope not found" });
    }

    if (name !== undefined) envelope.name = name;
    if (budget !== undefined) envelope.budget = budget;

    await envelope.save();
    return res.status(200).json(envelope);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /envelopes/:id
 * Remove um envelope e, em cascata, todas as transações associadas.
 */
export async function deleteEnvelope(req, res, next) {
  const { id } = req.params;
  try {
    const envelope = await Envelope.findByPk(id);
    if (!envelope) {
      return res.status(404).json({ message: "Envelope not found" });
    }

    await envelope.destroy();
    return res.status(200).json({ message: "Envelope deleted successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /envelopes/:id/transactions
 * Lista todas as transações associadas a um envelope específico.
 */
export async function getTransactionsByEnvelope(req, res, next) {
  const { id } = req.params;
  try {
    const envelope = await Envelope.findByPk(id);
    if (!envelope) {
      return res.status(404).json({ message: "Envelope not found" });
    }

    const transactions = await Transaction.findAll({
      where: { envelopeId: id },
      order: [["date", "DESC"]],
    });

    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
}
