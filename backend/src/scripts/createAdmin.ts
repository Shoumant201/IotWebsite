import dotenv from 'dotenv';
dotenv.config();

import { initializeDB, createTables } from '../config/db.js';
import { createUser, findUserByEmail } from '../models/userModel.js';

const createDefaultAdmin = async (): Promise<void> => {
  try {
    console.log('🔧 Initializing database...');
    initializeDB();
    await createTables();

    const adminEmail = 'admin@iot.com';
    
    // Check if admin already exists
    const existingAdmin = await findUserByEmail(adminEmail);
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists:', adminEmail);
      return;
    }

    // Create default admin user
    const adminUser = await createUser(
      'Admin User',
      adminEmail,
      'admin123',
      'admin'
    );

    console.log('✅ Default admin user created successfully!');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Role:', adminUser.role);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
};

createDefaultAdmin();