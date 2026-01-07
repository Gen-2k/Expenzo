import {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} from '../services/transaction.service.js';
import { MESSAGES } from '../constants/messages.js';

export const createTransactionController = async (req, res) => {
  const { amount, description, category, date, note, type } = req.body;

  // req.userId comes from the authMiddleware
  const transaction = await createTransaction(req.userId, {
    amount: parseFloat(amount),
    description,
    category,
    date: date ? new Date(date) : undefined,
    note,
    type: type || 'expense', // Default to 'expense'
  });

  res.status(201).json({
    status: 'success',
    message: MESSAGES.EXPENSES.CREATED, // You might want to update this message constant too
    data: { transaction },
  });
};

export const getTransactionsController = async (req, res) => {
  const transactions = await getUserTransactions(req.userId);

  res.status(200).json({
    status: 'success',
    data: { transactions },
  });
};

export const updateTransactionController = async (req, res) => {
  const { id } = req.params;
  const updated = await updateTransaction(req.userId, id, req.body);

  res.status(200).json({
    status: 'success',
    data: { transaction: updated },
  });
};

export const deleteTransactionController = async (req, res) => {
  const { id } = req.params;
  await deleteTransaction(req.userId, id);

  res.status(204).send();
};
