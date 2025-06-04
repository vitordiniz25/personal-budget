import { Router } from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction-controller.js";

const router = Router();

/**
 * @openapi
 * /transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Lista todas as transações
 *     responses:
 *       200:
 *         description: Lista de transações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransactionWithEnvelope'
 */
router.get("/", getAllTransactions);

/**
 * @openapi
 * /transactions/{id}:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Busca uma transação pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da transação
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionWithEnvelope'
 *       404:
 *         description: Transação não encontrada
 */
router.get("/:id", getTransactionById);

/**
 * @openapi
 * /transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Cria uma nova transação e ajusta o budget do envelope
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTransaction'
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionWithEnvelope'
 *       400:
 *         description: Falha por campos obrigatórios ou budget insuficiente
 */
router.post("/", createTransaction);

/**
 * @openapi
 * /transactions/{id}:
 *   put:
 *     tags:
 *       - Transactions
 *     summary: Atualiza uma transação existente e ajusta o budget do envelope
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da transação a ser atualizada
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransaction'
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionWithEnvelope'
 *       400:
 *         description: Budget insuficiente ou mudança de envelope não suportada
 *       404:
 *         description: Transação não encontrada
 */
router.put("/:id", updateTransaction);

/**
 * @openapi
 * /transactions/{id}:
 *   delete:
 *     tags:
 *       - Transactions
 *     summary: Exclui uma transação e reverte o budget no envelope
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da transação a ser excluída
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transação removida e budget revertido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction deleted and budget reverted
 *       404:
 *         description: Transação não encontrada
 */
router.delete("/:id", deleteTransaction);

export default router;
