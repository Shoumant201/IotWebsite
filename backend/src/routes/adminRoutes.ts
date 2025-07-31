import express from 'express';
import { 
  getAllAdmins, 
  createAdmin, 
  updateAdmin, 
  deleteAdmin, 
  banAdmin, 
  unbanAdmin, 
  changePassword,
  getProfile,
  updateProfile
} from '../controllers/adminController.js';
import { 
  authenticate, 
  preventBannedUser, 
  isAdminOrSuperAdmin, 
  isSuperAdmin 
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication and ban check to all routes
router.use(authenticate);
router.use(preventBannedUser);

// Profile routes (both admin and super admin)
router.get('/profile', isAdminOrSuperAdmin, getProfile);
router.put('/profile', isAdminOrSuperAdmin, updateProfile);
router.post('/change-password', isAdminOrSuperAdmin, changePassword);

// Admin management routes (super admin only)
router.get('/admins', isSuperAdmin, getAllAdmins);
router.post('/admins', isSuperAdmin, createAdmin);
router.put('/admins/:id', isSuperAdmin, updateAdmin);
router.delete('/admins/:id', isSuperAdmin, deleteAdmin);
router.patch('/admins/:id/ban', isSuperAdmin, banAdmin);
router.patch('/admins/:id/unban', isSuperAdmin, unbanAdmin);

export default router;