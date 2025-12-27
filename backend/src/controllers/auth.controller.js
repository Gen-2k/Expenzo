import {
  createUser,
  loginUser,
  findUserById,
} from '../services/user.service.js';
import AppError from '../utils/AppError.js';
import { MESSAGES } from '../constants/messages.js';

// Handles user registration.
export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError(MESSAGES.AUTH.ALL_FIELDS_REQUIRED, 400);
  }
  if (password.length < 6) {
    throw new AppError(MESSAGES.AUTH.PASSWORD_MIN_LENGTH, 400);
  }

  const user = await createUser(name, email, password);

  res.status(201).json({
    status: 'success',
    message: MESSAGES.AUTH.USER_CREATED,
    data: {
      user,
    },
  });
};

// Handles fetching the authenticated user's details.

export const getMeController = async (req, res) => {
  const user = await findUserById(req.userId);
  if (!user) {
    throw new AppError(MESSAGES.AUTH.USER_NOT_FOUND, 404);
  }
  res.status(200).json({
    status: 'success',
    message: MESSAGES.AUTH.USER_FETCHED,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

// Handles user login.
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(MESSAGES.AUTH.EMAIL_PASSWORD_REQUIRED, 400);
  }

  const { token, user } = await loginUser(email, password);

  res.status(200).json({
    status: 'success',
    message: MESSAGES.AUTH.LOGIN_SUCCESS,
    data: {
      user: { id: user.id, name: user.name, email: user.email },
      token: token,
    },
  });
};
