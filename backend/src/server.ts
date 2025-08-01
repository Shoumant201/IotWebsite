import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initializeDB, createTables, testDBConnection, getPool } from './config/db.js';
import apiRoutes from './routes/index.js';

const app = express();

// CORS Configuration - Allow all Vercel domains temporarily
const corsOptions = {
  origin: true, // Allow all origins temporarily
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

// Log environment variables for debugging
console.log('🔍 Environment variables:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  ADMIN_PANEL_URL: process.env.ADMIN_PANEL_URL,
  NODE_ENV: process.env.NODE_ENV
});

app.use(cors(corsOptions));

// Add explicit CORS headers as backup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

app.use(express.json());


const PORT = process.env.PORT || 5000;

// Auto-create super admin function
const createSuperAdminIfNotExists = async () => {
  try {
    const pool = getPool();
    
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@iot-hub.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'AdminPassword123!';
    const name = process.env.SUPER_ADMIN_NAME || 'Super Admin';
    
    // Check if super admin already exists
    const existingAdmin = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingAdmin.rows.length > 0) {
      console.log('✅ Super admin already exists');
      return;
    }
    
    // Import bcrypt dynamically
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(password, 12);
    
    // Create super admin user
    await pool.query(
      `INSERT INTO users (name, email, password, role, is_banned, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [name, email, hashedPassword, 'super_admin', false]
    );
    
    console.log('🎉 Super admin created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('🔗 Admin Panel: https://iot-website-admin.vercel.app');
    
  } catch (error) {
    console.error('⚠️ Error creating super admin:', error);
  }
};

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
  
  // Auto-create super admin after tables are created
  await createSuperAdminIfNotExists();

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