import { createUser, loginUser } from '../services/user.service.js';
import AppError from '../utils/AppError.js';
import { MESSAGES } from '../constants/messages.js';

// Handles user registration.
export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError(MESSAGES.AUTH.ALL_FIELDS_REQUIRED, 400));
  }
  if (password.length < 6) {
    return next(new AppError(MESSAGES.AUTH.PASSWORD_MIN_LENGTH, 400));
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

// Handles user login.
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(MESSAGES.AUTH.EMAIL_PASSWORD_REQUIRED, 400));
  }

  const { token } = await loginUser(email, password);

  res.status(200).json({
    status: 'success',
    message: MESSAGES.AUTH.LOGIN_SUCCESS,
    token: token,
  });
};