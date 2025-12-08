import { Router } from 'express';
import {
  registerController,
  loginController,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Route to get current user data (protected).
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'User data',
    userId: req.userId,
  });
});

// Route to register a new user (public).
router.post('/register', registerController);

// Route to log in a user (public).
router.post('/login', loginController);

export default router;