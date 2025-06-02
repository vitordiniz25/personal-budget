import { Router } from "express";
import {
  getAllEnvelopes,
  getEnvelopeById,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  getTransactionsByEnvelope,
} from "../controllers/envelopeController.js";

const router = Router();

router.get("/", getAllEnvelopes);

router.get("/:id", getEnvelopeById);

router.post("/", createEnvelope);

router.put("/:id", updateEnvelope);

router.delete("/:id", deleteEnvelope);

router.get("/:id/transactions", getTransactionsByEnvelope);

export default router;
