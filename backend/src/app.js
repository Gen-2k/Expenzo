import express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

// Global Error Handler (must be the last middleware)
app.use(errorMiddleware);

export default app;
