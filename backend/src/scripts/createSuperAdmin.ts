import { initializeDB, getPool } from '../config/db.js';
import bcrypt from 'bcryptjs';

const createSuperAdmin = async () => {
  try {
    console.log('🚀 Creating super admin account...');
    
    // Initialize database connection
    await initializeDB();
    const pool = getPool();
    
    // Get super admin details from environment variables
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@iot-hub.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'AdminPassword123!';
    const name = process.env.SUPER_ADMIN_NAME || 'Super Administrator';
    
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);
    
    // Check if super admin already exists
    const existingAdmin = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Super admin already exists!');
      console.log('✅ You can login with:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create super admin user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, is_banned, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) 
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, 'super_admin', false]
    );
    
    const newAdmin = result.rows[0];
    
    console.log('🎉 Super admin created successfully!');
    console.log('📋 Admin Details:');
    console.log(`   ID: ${newAdmin.id}`);
    console.log(`   Name: ${newAdmin.name}`);
    console.log(`   Email: ${newAdmin.email}`);
    console.log(`   Role: ${newAdmin.role}`);
    console.log('');
    console.log('✅ You can now login to the admin panel with:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('');
    console.log('🔗 Admin Panel: https://iot-website-admin.vercel.app');
    
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        console.log('⚠️  Super admin with this email already exists!');
      } else if (error.message.includes('relation "users" does not exist')) {
        console.log('⚠️  Users table does not exist. Please run database setup first.');
        console.log('💡 Try running: npm run setup-db');
      } else {
        console.log('💡 Error details:', error.message);
      }
    }
  } finally {
    process.exit(0);
  }
};

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createSuperAdmin();
}

export default createSuperAdmin;