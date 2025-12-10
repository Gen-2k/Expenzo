import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';
import { MESSAGES } from '../constants/messages.js';

// Create a new expense linked to a user
export const createExpense = async (userId, expenseData) => {
  return await prisma.expense.create({
    data: {
      ...expenseData,
      userId,
    },
  });
};

// Get all expenses for a specific user
export const getUserExpenses = async (userId) => {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
};

// Update an expense (ensure it belongs to the user)
export const updateExpense = async (userId, expenseId, updateData) => {
  // First check if expense exists and belongs to user
  const expense = await prisma.expense.findFirst({
    where: { id: expenseId, userId },
  });

  if (!expense) {
    throw new AppError(MESSAGES.EXPENSES.NOT_FOUND, 404);
  }

  return await prisma.expense.update({
    where: { id: expenseId },
    data: updateData,
  });
};

// Delete an expense
export const deleteExpense = async (userId, expenseId) => {
  const expense = await prisma.expense.findFirst({
    where: { id: expenseId, userId },
  });

  if (!expense) {
    throw new AppError(MESSAGES.EXPENSES.NOT_FOUND, 404);
  }

  return await prisma.expense.delete({
    where: { id: expenseId },
  });
};
