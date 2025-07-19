import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, validatePassword } from '../models/userModel.js';

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role = 'admin' } = req.body;
    
    if (!name || !email || !password) {
      res.status(400).json({ 
        success: false,
        message: 'Name, email, and password are required' 
      });
      return;
    }
    
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ 
          success: false,
          message: 'User already exists' 
        });
        return;
      }
  
      const user = await createUser(name, email, password, role);
  
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
  
      res.status(201).json({ 
        success: true,
        message: 'User registered successfully',
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
      console.error('Registration Error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Server error', 
        error: err instanceof Error ? err.message : 'Unknown error'
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