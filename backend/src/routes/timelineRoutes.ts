import express from 'express';
import {
  getAllTimelineEvents,
  getTimelineEventById,
  createNewTimelineEvent,
  updateTimelineEventById,
  deleteTimelineEventById,
  toggleTimelineEventStatusById
} from '../controllers/timelineController.js';

const router = express.Router();

// GET /api/timeline - Get all timeline events
router.get('/', getAllTimelineEvents);

// GET /api/timeline/:id - Get timeline event by ID
router.get('/:id', getTimelineEventById);

// POST /api/timeline - Create new timeline event
router.post('/', createNewTimelineEvent);

// PUT /api/timeline/:id - Update timeline event
router.put('/:id', updateTimelineEventById);

// DELETE /api/timeline/:id - Delete timeline event
router.delete('/:id', deleteTimelineEventById);

// PATCH /api/timeline/:id/toggle - Toggle timeline event active status
router.patch('/:id/toggle', toggleTimelineEventStatusById);

export default router;