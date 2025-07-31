import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { findUserById, findUserByEmail, createUser } from '../models/userModel.js';
import { getPool } from '../config/db.js';

// Get all admins (super admin only)
export const getAllAdmins = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, name, email, role, created_at, is_banned 
       FROM users 
       WHERE role IN ('admin', 'super_admin') 
       ORDER BY 
         CASE WHEN role = 'super_admin' THEN 1 ELSE 2 END,
         created_at DESC`
    );
    
    res.json({
      success: true,
      message: 'Admins retrieved successfully',
      data: result.rows
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching admins',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new admin (super admin only)
export const createAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
      return;
    }

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
      return;
    }

    // Create admin user
    const newAdmin = await createUser(name, email, password, 'admin');
    
    // Remove password from response
    const { password: _, ...adminWithoutPassword } = newAdmin;

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: adminWithoutPassword
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update admin (super admin only)
export const updateAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const adminId = parseInt(id);
    
    if (isNaN(adminId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid admin ID'
      });
      return;
    }
    
    // Check if admin exists
    const existingAdmin = await findUserById(adminId);
    if (!existingAdmin) {
      res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
      return;
    }

    // Prevent updating super admin
    if (existingAdmin.role === 'super_admin') {
      res.status(403).json({
        success: false,
        message: 'Cannot update super admin account'
      });
      return;
    }
    
    // Check if email is already taken by another user
    if (email && email !== existingAdmin.email) {
      const emailUser = await findUserByEmail(email);
      if (emailUser && emailUser.id !== adminId) {
        res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
        return;
      }
    }
    
    const pool = getPool();
    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email)
       WHERE id = $3 AND role = 'admin'
       RETURNING id, name, email, role, created_at, is_banned`,
      [name, email, adminId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Admin not found or cannot be updated'
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Admin updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete admin (super admin only)
export const deleteAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const adminId = parseInt(id);
    
    if (isNaN(adminId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid admin ID'
      });
      return;
    }
    
    // Check if admin exists
    const existingAdmin = await findUserById(adminId);
    if (!existingAdmin) {
      res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
      return;
    }

    // Prevent deleting super admin
    if (existingAdmin.role === 'super_admin') {
      res.status(403).json({
        success: false,
        message: 'Cannot delete super admin account'
      });
      return;
    }
    
    // Prevent deleting yourself
    if (req.user && req.user.id === adminId) {
      res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
      return;
    }
    
    const pool = getPool();
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 AND role = $2 RETURNING id', 
      [adminId, 'admin']
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Admin not found or cannot be deleted'
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Ban admin (super admin only)
export const banAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const adminId = parseInt(id);
    
    if (isNaN(adminId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid admin ID'
      });
      return;
    }
    
    // Check if admin exists
    const existingAdmin = await findUserById(adminId);
    if (!existingAdmin) {
      res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
      return;
    }

    // Prevent banning super admin
    if (existingAdmin.role === 'super_admin') {
      res.status(403).json({
        success: false,
        message: 'Cannot ban super admin account'
      });
      return;
    }
    
    // Prevent banning yourself
    if (req.user && req.user.id === adminId) {
      res.status(400).json({
        success: false,
        message: 'Cannot ban your own account'
      });
      return;
    }
    
    const pool = getPool();
    const result = await pool.query(
      `UPDATE users 
       SET is_banned = true 
       WHERE id = $1 AND role = 'admin'
       RETURNING id, name, email, role, created_at, is_banned`,
      [adminId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Admin not found or cannot be banned'
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Admin banned successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Ban admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error banning admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Unban admin (super admin only)
export const unbanAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const adminId = parseInt(id);
    
    if (isNaN(adminId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid admin ID'
      });
      return;
    }
    
    // Check if admin exists
    const existingAdmin = await findUserById(adminId);
    if (!existingAdmin || existingAdmin.role !== 'admin') {
      res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
      return;
    }
    
    const pool = getPool();
    const result = await pool.query(
      `UPDATE users 
       SET is_banned = false 
       WHERE id = $1 AND role = 'admin'
       RETURNING id, name, email, role, created_at, is_banned`,
      [adminId]
    );
    
    res.json({
      success: true,
      message: 'Admin unbanned successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Unban admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error unbanning admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Change password (both admin and super admin)
export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
      return;
    }
    
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }
    
    // Get current user
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }
    
    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }
    
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    
    // Update password
    const pool = getPool();
    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedNewPassword, userId]
    );
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get current user profile
export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }
    
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update own profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }
    
    // Check if user exists
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }
    
    // Check if email is already taken by another user
    if (email && email !== existingUser.email) {
      const emailUser = await findUserByEmail(email);
      if (emailUser && emailUser.id !== userId) {
        res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
        return;
      }
    }
    
    const pool = getPool();
    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email)
       WHERE id = $3 
       RETURNING id, name, email, role, created_at, is_banned`,
      [name, email, userId]
    );
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};