import { Request, Response } from 'express';
import {
  findAllTestimonials,
  findTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
  CreateTestimonialData,
  UpdateTestimonialData
} from '../models/testimonialModel.js';

export const getAllTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await findAllTestimonials();
    res.status(200).json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial = await findTestimonialById(parseInt(id));
    
    if (!testimonial) {
      res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNewTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonialData: CreateTestimonialData = req.body;
    const testimonial = await createTestimonial(testimonialData);
    
    res.status(201).json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully'
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create testimonial'
    });
  }
};

export const updateTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonialData: UpdateTestimonialData = req.body;
    const testimonial = await updateTestimonial(parseInt(id), testimonialData);
    
    if (!testimonial) {
      res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: testimonial,
      message: 'Testimonial updated successfully'
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update testimonial'
    });
  }
};

export const deleteTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteTestimonial(parseInt(id));
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const toggleTestimonialStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial = await toggleTestimonialStatus(parseInt(id));
    
    if (!testimonial) {
      res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: testimonial,
      message: `Testimonial ${testimonial.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling testimonial status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};