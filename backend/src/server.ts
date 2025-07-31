import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initializeDB, createTables, testDBConnection } from './config/db.js';
import apiRoutes from './routes/index.js';

const app = express();

// CORS Configuration - Allow multiple origins
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',  // Frontend
      'http://localhost:3001',  // Admin Panel
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_PANEL_URL || 'http://localhost:3001'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());


const PORT = process.env.PORT || 5000;

// Health check endpoint with database test
app.get('/api/health', async (req, res) => {
  try {
    await testDBConnection();
    
    res.status(200).json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'Connected',
      timestamp: new Date().toISOString(),
      cors: 'Enabled for localhost:3000 and localhost:3001'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Debug endpoint to check CORS
app.get('/api/cors-test', (req, res) => {
  res.json({
    origin: req.get('Origin'),
    headers: req.headers,
    message: 'CORS test endpoint'
  });
});

// API Routes
app.use('/api', apiRoutes);

(async () => {
  initializeDB();
  await testDBConnection();
  await createTables();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`\n🔗 API Endpoints Available:`);
    
    console.log(`\n   🔐 Authentication:`);
    console.log(`   - POST /api/auth/login`);
    console.log(`   - POST /api/auth/logout`);
    console.log(`   - GET  /api/auth/verify-token`);
    
    console.log(`\n   👤 Admin Management:`);
    console.log(`   - GET  /api/admin/profile`);
    console.log(`   - PUT  /api/admin/profile`);
    console.log(`   - POST /api/admin/change-password`);
    console.log(`   - GET  /api/admin/admins (Super Admin only)`);
    console.log(`   - POST /api/admin/admins (Super Admin only)`);
    console.log(`   - PUT  /api/admin/admins/:id (Super Admin only)`);
    console.log(`   - DELETE /api/admin/admins/:id (Super Admin only)`);
    
    console.log(`\n   🦸 Heroes Section:`);
    console.log(`   - GET    /api/heroes`);
    console.log(`   - GET    /api/heroes/:id`);
    console.log(`   - POST   /api/heroes`);
    console.log(`   - PUT    /api/heroes/:id`);
    console.log(`   - DELETE /api/heroes/:id`);
    console.log(`   - PATCH  /api/heroes/:id/toggle`);
    
    console.log(`\n   ⭐ Features Section:`);
    console.log(`   - GET    /api/features`);
    console.log(`   - GET    /api/features/:id`);
    console.log(`   - POST   /api/features`);
    console.log(`   - PUT    /api/features/:id`);
    console.log(`   - DELETE /api/features/:id`);
    console.log(`   - PATCH  /api/features/:id/toggle`);
    
    console.log(`\n   📅 Events Section:`);
    console.log(`   - GET    /api/events`);
    console.log(`   - GET    /api/events?isGrandEvent=true`);
    console.log(`   - GET    /api/events/grand/current`);
    console.log(`   - GET    /api/events/slug/:slug`);
    console.log(`   - GET    /api/events/:id`);
    console.log(`   - POST   /api/events`);
    console.log(`   - PUT    /api/events/:id`);
    console.log(`   - DELETE /api/events/:id`);
    console.log(`   - PATCH  /api/events/:id/toggle`);
    
    console.log(`\n   📈 Timeline Section:`);
    console.log(`   - GET    /api/timeline`);
    console.log(`   - GET    /api/timeline/:id`);
    console.log(`   - POST   /api/timeline`);
    console.log(`   - PUT    /api/timeline/:id`);
    console.log(`   - DELETE /api/timeline/:id`);
    console.log(`   - PATCH  /api/timeline/:id/toggle`);
    
    console.log(`\n   👥 Team Section:`);
    console.log(`   - GET    /api/team`);
    console.log(`   - GET    /api/team?type=leadership`);
    console.log(`   - GET    /api/team?type=steering`);
    console.log(`   - GET    /api/team/organized`);
    console.log(`   - GET    /api/team/leadership`);
    console.log(`   - GET    /api/team/steering`);
    console.log(`   - GET    /api/team/:id`);
    console.log(`   - POST   /api/team`);
    console.log(`   - PUT    /api/team/:id`);
    console.log(`   - DELETE /api/team/:id`);
    console.log(`   - PATCH  /api/team/:id/toggle`);
    
    console.log(`\n   💬 Testimonials Section:`);
    console.log(`   - GET    /api/testimonials`);
    console.log(`   - GET    /api/testimonials/:id`);
    console.log(`   - POST   /api/testimonials`);
    console.log(`   - PUT    /api/testimonials/:id`);
    console.log(`   - DELETE /api/testimonials/:id`);
    console.log(`   - PATCH  /api/testimonials/:id/toggle`);
    
    console.log(`\n   🔧 System:`);
    console.log(`   - GET  /api/health`);
    console.log(`   - GET  /api/hello`);
    
    console.log(`\n💡 Setup Commands:`);
    console.log(`   - npm run create-super-admin (Create admin user)`);
    console.log(`   - npm run seed-sample (Add sample data)`);
    console.log(`\n🎉 All APIs are ready for frontend integration!`);
  });
})();