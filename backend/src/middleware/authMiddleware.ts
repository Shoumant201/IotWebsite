import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserById } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { getPool } from "../config/db.js";
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token missing or invalid format",
    });
    return;
  }

  // Extract token from the authorization header
  const token = authHeader.split(" ")[1];

  // Verify the token with the secret key
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      res.status(403).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    // Attach the user object from the token to the request
    req.user = decoded;
    next();
  });
};

// Middleware to prevent banned users from accessing certain routes
export const preventBannedUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user && req.user.id) {
      const user = await findUserById(req.user.id);
      if (user && user.is_banned) {
        res.status(403).json({
          success: false,
          message: "This account has been banned.",
        });
        return;
      }
    }
    next();
  } catch (error) {
    console.error("Error in preventBannedUser middleware:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking ban status.",
    });
  }
};

// Role-based middleware to check if the user is an admin or super admin
export const isAdminOrSuperAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ 
      success: false,
      message: "Authentication required" 
    });
    return;
  }

  if (!req.user.role) {
    res.status(403).json({ 
      success: false,
      message: "Access denied. Role information missing." 
    });
    return;
  }

  if (req.user.role === "admin" || req.user.role === "super_admin") {
    next();
    return;
  }

  res.status(403).json({ 
    success: false,
    message: "Access denied. Admin privileges required." 
  });
};

// Middleware to check if user is super admin only
export const isSuperAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ 
      success: false,
      message: "Authentication required" 
    });
    return;
  }

  if (req.user.role !== "super_admin") {
    res.status(403).json({ 
      success: false,
      message: "Access denied. Super admin privileges required." 
    });
    return;
  }

  next();
};

export const verifyPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // User should be attached to req by the auth middleware
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { password } = req.body;

    if (!password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    // Get the user's hashed password from the database
    const pool = getPool();
    const userResult = await pool.query("SELECT password FROM users WHERE id = $1", [user.id]);

    if (userResult.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = userResult.rows[0].password;

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Password is valid
    res.json({
      success: true,
      message: "Password verified successfully",
    });
  } catch (err) {
    console.error("Error verifying password:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
};