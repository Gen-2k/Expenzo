import { Router } from 'express';
import {
  createExpenseController,
  getExpensesController,
  updateExpenseController,
  deleteExpenseController,
} from '../controllers/expense.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

//Apply auth middleware to all expense routes
router.use(authMiddleware);

// Route to create a new expense (protected).
router.post('/', createExpenseController);

// Route to get all expenses for the authenticated user (protected).
router.get('/', getExpensesController);

// Route to update an expense by ID (protected).
router.put('/:id', updateExpenseController);

// Route to delete an expense by ID (protected).
router.delete('/:id', deleteExpenseController);

export default router;
