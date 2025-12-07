import { Router } from 'express';
import {
  registerContoller,
  loginController,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middelware.js';

const router = Router();

router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'User data',
    userId: req.userId,
  });
});
router.post('/register', registerContoller);
router.post('/login', loginController);

export default router;
