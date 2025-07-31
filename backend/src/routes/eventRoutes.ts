import express from 'express';
import {
  getAllEvents,
  getEventById,
  getEventBySlug,
  getCurrentGrandEvent,
  createNewEvent,
  updateEventById,
  deleteEventById,
  toggleEventStatusById
} from '../controllers/eventController.js';

const router = express.Router();

// GET /api/events - Get all events (with optional query params)
router.get('/', getAllEvents);

// GET /api/events/grand/current - Get current grand event
router.get('/grand/current', getCurrentGrandEvent);

// GET /api/events/slug/:slug - Get event by slug
router.get('/slug/:slug', getEventBySlug);

// GET /api/events/:id - Get event by ID
router.get('/:id', getEventById);

// POST /api/events - Create new event
router.post('/', createNewEvent);

// PUT /api/events/:id - Update event
router.put('/:id', updateEventById);

// DELETE /api/events/:id - Delete event
router.delete('/:id', deleteEventById);

// PATCH /api/events/:id/toggle - Toggle event active status
router.patch('/:id/toggle', toggleEventStatusById);

export default router;