import {
  createExpense,
  getUserExpenses,
  updateExpense,
  deleteExpense,
} from '../services/expense.service.js';
import { MESSAGES } from '../constants/messages.js';

export const createExpenseController = async (req, res) => {
  const { amount, description, category, date, note } = req.body;
  
  // req.userId comes from the authMiddleware
  const expense = await createExpense(req.userId, {
    amount: parseFloat(amount),
    description,
    category,
    date: date ? new Date(date) : undefined,
    note,
  });

  res.status(201).json({
    status: 'success',
    message: MESSAGES.EXPENSES.CREATED,
    data: { expense },
  });
};

export const getExpensesController = async (req, res) => {
  const expenses = await getUserExpenses(req.userId);
  
  res.status(200).json({
    status: 'success',
    data: { expenses },
  });
};

export const updateExpenseController = async (req, res) => {
  const { id } = req.params;
  const updated = await updateExpense(req.userId, id, req.body);
  
  res.status(200).json({
    status: 'success',
    data: { expense: updated },
  });
};

export const deleteExpenseController = async (req, res) => {
  const { id } = req.params;
  await deleteExpense(req.userId, id);
  
  res.status(204).send();
};