import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { findUserByEmail, validatePassword } from '../models/userModel.js';

// Verify token endpoint
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided'
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    const user = await findUserByEmail(decoded.email);
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    if (user.is_banned) {
      res.status(403).json({
        success: false,
        message: 'Account is banned'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Token is valid',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Logout endpoint
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // But we can still provide a logout endpoint for consistency
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }
    
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
        return;
      }

      if (user.is_banned) {
        res.status(403).json({ 
          success: false,
          message: 'This account has been banned' 
        });
        return;
      }
  
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email,
          role: user.role
        }, 
        jwtSecret, 
        { expiresIn: '30d' }
      );
      
      res.status(200).json({ 
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        }
      });
    } catch (err) {
      console.error('Login Error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Server error',
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
};