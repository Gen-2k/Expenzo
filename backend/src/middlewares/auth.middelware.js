import { verifyToken } from '../utils/token.js';

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized access ',
      });
    }

    const decode = verifyToken(token);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}
