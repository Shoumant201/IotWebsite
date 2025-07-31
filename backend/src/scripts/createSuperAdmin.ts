import dotenv from 'dotenv';
dotenv.config();

import { createUser, findUserByEmail } from '../models/userModel.js';
import { initializeDB, testDBConnection } from '../config/db.js';

const createSuperAdmin = async () => {
  try {
    // Initialize database connection
    initializeDB();
    await testDBConnection();

    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@admin.com';
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!';
    const superAdminName = process.env.SUPER_ADMIN_NAME || 'Super Administrator';

    // Check if super admin already exists
    const existingSuperAdmin = await findUserByEmail(superAdminEmail);
    
    if (existingSuperAdmin) {
      console.log('✅ Super admin already exists with email:', superAdminEmail);
      console.log('   Role:', existingSuperAdmin.role);
      return;
    }

    // Create super admin
    const superAdmin = await createUser(
      superAdminName,
      superAdminEmail,
      superAdminPassword,
      'super_admin'
    );

    console.log('🎉 Super admin created successfully!');
    console.log('📧 Email:', superAdmin.email);
    console.log('👤 Name:', superAdmin.name);
    console.log('🔑 Role:', superAdmin.role);
    console.log('📅 Created:', superAdmin.created_at);
    console.log('');
    console.log('⚠️  IMPORTANT: Please change the default password after first login!');
    console.log('');
    console.log('Login credentials:');
    console.log('Email:', superAdminEmail);
    console.log('Password:', superAdminPassword);

  } catch (error) {
    console.error('❌ Error creating super admin:', error);
    process.exit(1);
  }
};

// Run the script
createSuperAdmin()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });