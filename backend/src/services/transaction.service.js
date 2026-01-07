import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';
import { MESSAGES } from '../constants/messages.js';

// Create a new transaction linked to a user
export const createTransaction = async (userId, transactionData) => {
  return await prisma.transaction.create({
    data: {
      ...transactionData,
      userId,
    },
  });
};

// Get all transactions for a specific user
export const getUserTransactions = async (userId) => {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
};

// Update a transaction (ensure it belongs to the user)
export const updateTransaction = async (userId, transactionId, updateData) => {
  // First check if transaction exists and belongs to user
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, userId },
  });

  if (!transaction) {
    throw new AppError(MESSAGES.EXPENSES.NOT_FOUND, 404);
  }

  return await prisma.transaction.update({
    where: { id: transactionId },
    data: updateData,
  });
};

// Delete a transaction
export const deleteTransaction = async (userId, transactionId) => {
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, userId },
  });

  if (!transaction) {
    throw new AppError(MESSAGES.EXPENSES.NOT_FOUND, 404);
  }

  return await prisma.transaction.delete({
    where: { id: transactionId },
  });
};

export const getDashboardStats = async (userId) => {
    // Implement grouped query for easier dashboard stats if needed later
    // For now, getUserTransactions handles it.
};
