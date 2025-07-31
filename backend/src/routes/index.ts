import express from 'express';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import heroRoutes from './heroRoutes.js';
import featureRoutes from './featureRoutes.js';
import eventRoutes from './eventRoutes.js';
import timelineRoutes from './timelineRoutes.js';
import teamRoutes from './teamRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();

// Authentication & Admin Routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

// Content Management Routes
router.use('/heroes', heroRoutes);
router.use('/features', featureRoutes);
router.use('/events', eventRoutes);
router.use('/timeline', timelineRoutes);
router.use('/team', teamRoutes);
router.use('/testimonials', testimonialRoutes);

// Upload Routes
router.use('/upload', uploadRoutes);

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