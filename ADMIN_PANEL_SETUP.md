# Admin Panel Setup Guide

## Overview
This admin panel provides role-based access control with two user roles:
- **Super Admin**: Full access to all features including admin management
- **Admin**: Access to dashboard and profile management only

## Features

### Super Admin Features
- ✅ Create new admin accounts
- ✅ Update admin information (name, email)
- ✅ Delete admin accounts
- ✅ Ban/Unban admin accounts
- ✅ View all admin accounts
- ✅ Change own password
- ✅ Update own profile

### Admin Features
- ✅ View dashboard (shared with super admin)
- ✅ Change own password
- ✅ Update own profile
- ❌ Cannot manage other admin accounts

## Backend API Endpoints

### Authentication
- `POST /api/auth/login` - Login for admin/super admin
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify-token` - Verify JWT token

### Profile Management (Admin & Super Admin)
- `GET /api/admin/profile` - Get current user profile
- `PUT /api/admin/profile` - Update current user profile
- `POST /api/admin/change-password` - Change password

### Admin Management (Super Admin Only)
- `GET /api/admin/admins` - Get all admin accounts
- `POST /api/admin/admins` - Create new admin account
- `PUT /api/admin/admins/:id` - Update admin account
- `DELETE /api/admin/admins/:id` - Delete admin account
- `PATCH /api/admin/admins/:id/ban` - Ban admin account
- `PATCH /api/admin/admins/:id/unban` - Unban admin account

### System
- `GET /api/health` - Health check
- `GET /api/hello` - Test endpoint

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iot_admin_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Super Admin Configuration (for initial setup)
SUPER_ADMIN_EMAIL=superadmin@admin.com
SUPER_ADMIN_PASSWORD=SuperAdmin123!
SUPER_ADMIN_NAME=Super Administrator

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

#### Database Setup
Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE iot_admin_db;
```

#### Create Super Admin Account
```bash
cd backend
npm run create-super-admin
```

This will create the initial super admin account with the credentials from your `.env` file.

#### Start Backend Server
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 2. Admin Frontend Setup

#### Install Dependencies
```bash
cd admin
npm install
```

#### Environment Configuration
Create a `.env.local` file in the admin directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Start Frontend
```bash
npm run dev
```

The admin panel will be available at `http://localhost:3001`

## Default Login Credentials

After running the super admin creation script, use these credentials:
- **Email**: `superadmin@admin.com` (or your custom email from .env)
- **Password**: `SuperAdmin123!` (or your custom password from .env)

⚠️ **Important**: Change the default password immediately after first login!

## Role-Based Access Control

### Middleware Protection
- `authenticate`: Verifies JWT token
- `preventBannedUser`: Blocks banned users
- `isAdminOrSuperAdmin`: Allows both admin and super admin
- `isSuperAdmin`: Allows only super admin

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based route protection
- Ban/unban functionality
- Input validation and sanitization

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Response Format

All API responses follow this format:
```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Optional data payload
  "error": "Error details" // Only on errors
}
```

## Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### 2. Test Super Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@admin.com","password":"SuperAdmin123!"}'
```

### 3. Test Admin Creation (Super Admin Only)
```bash
# First get the token from login response, then:
curl -X POST http://localhost:5000/api/admin/admins \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Test Admin","email":"admin@test.com","password":"TestPassword123"}'
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **JWT Secret Error**
   - Make sure `JWT_SECRET` is set in `.env`
   - Use a strong, unique secret key

3. **CORS Issues**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check admin panel URL matches

4. **Super Admin Creation Fails**
   - Check database connection
   - Verify email doesn't already exist
   - Check console for detailed error messages

### Logs and Debugging
- Backend logs are displayed in the console
- Check browser developer tools for frontend errors
- API responses include detailed error messages

## Next Steps

1. **Customize the Dashboard**: Add your specific admin functionality
2. **Add More Roles**: Extend the role system if needed
3. **Implement Password Reset**: Add forgot password functionality
4. **Add Audit Logging**: Track admin actions
5. **Enhance Security**: Add rate limiting, 2FA, etc.

## Security Considerations

- Always use HTTPS in production
- Regularly rotate JWT secrets
- Implement proper session management
- Add rate limiting for login attempts
- Monitor for suspicious activities
- Keep dependencies updated