import { Router } from "express";
import {
  getAllEnvelopes,
  getEnvelopeById,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  getTransactionsByEnvelope,
} from "../controllers/envelope-controller.js";

const router = Router();

/**
 * @openapi
 * /envelopes:
 *   get:
 *     tags:
 *       - Envelopes
 *     summary: Lista todos os envelopes
 *     responses:
 *       200:
 *         description: Lista de envelopes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Envelope'
 */
router.get("/", getAllEnvelopes);

/**
 * @openapi
 * /envelopes/{id}:
 *   get:
 *     tags:
 *       - Envelopes
 *     summary: Busca um envelope pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do envelope
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Envelope encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnvelopeWithTransactions'
 *       404:
 *         description: Envelope não encontrado
 */
router.get("/:id", getEnvelopeById);

/**
 * @openapi
 * /envelopes:
 *   post:
 *     tags:
 *       - Envelopes
 *     summary: Cria um novo envelope
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewEnvelope'
 *     responses:
 *       201:
 *         description: Envelope criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envelope'
 *       400:
 *         description: Falta de campos obrigatórios (name ou budget)
 */
router.post("/", createEnvelope);

/**
 * @openapi
 * /envelopes/{id}:
 *   put:
 *     tags:
 *       - Envelopes
 *     summary: Atualiza um envelope existente
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do envelope a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEnvelope'
 *     responses:
 *       200:
 *         description: Envelope atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envelope'
 *       404:
 *         description: Envelope não encontrado
 */
router.put("/:id", updateEnvelope);

/**
 * @openapi
 * /envelopes/{id}:
 *   delete:
 *     tags:
 *       - Envelopes
 *     summary: Exclui um envelope e todas as transações associadas
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do envelope a ser excluído
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Envelope excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope deleted successfully
 *       404:
 *         description: Envelope não encontrado
 */
router.delete("/:id", deleteEnvelope);

/**
 * @openapi
 * /envelopes/{id}/transactions:
 *   get:
 *     tags:
 *       - Envelopes
 *     summary: Lista as transações de um envelope específico
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do envelope
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de transações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Envelope não encontrado
 */
router.get("/:id/transactions", getTransactionsByEnvelope);

export default router;
