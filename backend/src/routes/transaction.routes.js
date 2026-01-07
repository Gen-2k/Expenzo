import { Router } from 'express';
import {
  createTransactionController,
  getTransactionsController,
  updateTransactionController,
  deleteTransactionController,
} from '../controllers/transaction.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

//Apply auth middleware to all transaction routes
router.use(authMiddleware);

// Route to create a new transaction (protected).
router.post('/', createTransactionController);

// Route to get all transactions for the authenticated user (protected).
router.get('/', getTransactionsController);

// Route to update a transaction by ID (protected).
router.put('/:id', updateTransactionController);

// Route to delete a transaction by ID (protected).
router.delete('/:id', deleteTransactionController);

export default router;
