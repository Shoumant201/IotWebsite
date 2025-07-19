import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initializeDB, createTables, testDBConnection } from './config/db.js';
import apiRoutes from './routes/index.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/api', apiRoutes);

(async () => {
  initializeDB();
  await testDBConnection();
  await createTables();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API endpoints:`);
    console.log(`   - GET  /api/hello`);
    console.log(`   - GET  /api/health`);
    console.log(`   - POST /api/auth/login`);
    console.log(`   - POST /api/auth/register`);
    console.log(`   - GET  /api/auth/profile`);
    console.log(`   - POST /api/auth/logout`);
  });
})();