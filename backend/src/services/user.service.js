import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import AppError from '../utils/AppError.js';
import { generateToken } from '../utils/token.js';
import { MESSAGES } from '../constants/messages.js';

// Finds a user by their ID.
export const findUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

// Finds a user by their email address.
export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

// Creates a new user, checks for existing users and hashes the password.
export const createUser = async (name, email, password) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AppError(MESSAGES.AUTH.USER_EXISTS, 400);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  user.password = undefined; // Remove password from response.

  return user;
};

// Authenticates a user and generates a JWT token upon successful login.
export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);
  }

  const token = generateToken({
    userId: user.id,
  });

  return { token, user };
};
