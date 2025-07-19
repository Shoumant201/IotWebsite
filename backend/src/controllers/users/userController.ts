import { Request, Response } from 'express';
import { findUserById, findUserByEmail, createUser } from '../../models/userModel.js';
import { getPool } from '../../config/db.js';
import { AuthenticatedRequest } from '../../middleware/authMiddleware.js';

// Get all users
export const getAllUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT id, name, email, role, created_at, is_banned FROM users ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.rows
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get user by ID
export const getUserById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid user ID'
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
      message: 'User retrieved successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update user
export const updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, role, is_banned } = req.body;
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid user ID'
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
           email = COALESCE($2, email), 
           role = COALESCE($3, role), 
           is_banned = COALESCE($4, is_banned)
       WHERE id = $5 
       RETURNING id, name, email, role, created_at, is_banned`,
      [name, email, role, is_banned, userId]
    );
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete user
export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid user ID'
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
    
    // Prevent deleting yourself
    if (req.user && req.user.id === userId) {
      res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
      return;
    }
    
    const pool = getPool();
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};