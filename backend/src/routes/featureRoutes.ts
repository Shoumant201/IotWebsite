import express from 'express';
import {
  getAllFeatures,
  getFeatureById,
  createNewFeature,
  updateFeatureById,
  deleteFeatureById,
  toggleFeatureStatusById
} from '../controllers/featureController.js';

const router = express.Router();

// GET /api/features - Get all features
router.get('/', getAllFeatures);

// GET /api/features/:id - Get feature by ID
router.get('/:id', getFeatureById);

// POST /api/features - Create new feature
router.post('/', createNewFeature);

// PUT /api/features/:id - Update feature
router.put('/:id', updateFeatureById);

// DELETE /api/features/:id - Delete feature
router.delete('/:id', deleteFeatureById);

// PATCH /api/features/:id/toggle - Toggle feature active status
router.patch('/:id/toggle', toggleFeatureStatusById);

export default router;