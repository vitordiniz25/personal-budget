// routes/transactionRoutes.js
import { Router } from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";

const router = Router();

router.get("/", getAllTransactions);

router.get("/:id", getTransactionById);

router.post("/", createTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;
