import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing

// API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler (must be the last middleware)
app.use(errorMiddleware);

export default app;