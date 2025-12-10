import { verifyToken } from '../utils/token.js';
import AppError from '../utils/AppError.js';
import { MESSAGES } from '../constants/messages.js';

// Middleware to protect routes by verifying JWT token.
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(MESSAGES.AUTH.NO_TOKEN, 401);
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, 401);
    }

    const decode = verifyToken(token);
    // console.log('Decoded Token:', decode.userId);
    req.userId = decode.userId;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    }
    return next(new AppError(MESSAGES.AUTH.INVALID_TOKEN, 401));
  }
};