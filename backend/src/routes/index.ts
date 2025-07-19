import express from 'express';
import authRoutes from './auth/index.js';
import userRoutes from './users/index.js';

const router = express.Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Test endpoint
router.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello from IoT Backend API!',
    timestamp: new Date().toISOString()
  });
});

export default router;