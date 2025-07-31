import express from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  createNewTestimonial,
  updateTestimonialById,
  deleteTestimonialById,
  toggleTestimonialStatusById
} from '../controllers/testimonialController.js';

const router = express.Router();

// GET /api/testimonials - Get all testimonials
router.get('/', getAllTestimonials);

// GET /api/testimonials/:id - Get testimonial by ID
router.get('/:id', getTestimonialById);

// POST /api/testimonials - Create new testimonial
router.post('/', createNewTestimonial);

// PUT /api/testimonials/:id - Update testimonial
router.put('/:id', updateTestimonialById);

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/:id', deleteTestimonialById);

// PATCH /api/testimonials/:id/toggle - Toggle testimonial active status
router.patch('/:id/toggle', toggleTestimonialStatusById);

export default router;