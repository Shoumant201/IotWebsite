import express from 'express';
import { upload, uploadToCloudinary } from '../config/cloudinary.js';
import { Request, Response } from 'express';

const router = express.Router();

// Generic image upload endpoint
router.post('/image', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    const { folder = 'iot-hub', filename } = req.body;
    
    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      folder,
      filename
    );

    res.status(200).json({
      success: true,
      data: {
        url: imageUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload image'
    });
  }
});

// Hero image upload
router.post('/hero', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      'iot-hub/heroes',
      `hero-${Date.now()}`
    );

    res.status(200).json({
      success: true,
      data: { url: imageUrl },
      message: 'Hero image uploaded successfully'
    });

  } catch (error) {
    console.error('Hero upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload hero image'
    });
  }
});

// Feature image upload
router.post('/feature', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      'iot-hub/features',
      `feature-${Date.now()}`
    );

    res.status(200).json({
      success: true,
      data: { url: imageUrl },
      message: 'Feature image uploaded successfully'
    });

  } catch (error) {
    console.error('Feature upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload feature image'
    });
  }
});

// Event image upload
router.post('/event', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      'iot-hub/events',
      `event-${Date.now()}`
    );

    res.status(200).json({
      success: true,
      data: { url: imageUrl },
      message: 'Event image uploaded successfully'
    });

  } catch (error) {
    console.error('Event upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload event image'
    });
  }
});

// Team member image upload
router.post('/team', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      'iot-hub/team',
      `team-${Date.now()}`
    );

    res.status(200).json({
      success: true,
      data: { url: imageUrl },
      message: 'Team member image uploaded successfully'
    });

  } catch (error) {
    console.error('Team upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload team member image'
    });
  }
});

// Testimonial image upload
router.post('/testimonial', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
      return;
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      'iot-hub/testimonials',
      `testimonial-${Date.now()}`
    );

    res.status(200).json({
      success: true,
      data: { url: imageUrl },
      message: 'Testimonial image uploaded successfully'
    });

  } catch (error) {
    console.error('Testimonial upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload testimonial image'
    });
  }
});

export default router;