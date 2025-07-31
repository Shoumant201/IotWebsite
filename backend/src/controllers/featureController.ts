import { Request, Response } from 'express';
import {
  findAllFeatures,
  findFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
  toggleFeatureStatus,
  CreateFeatureData,
  UpdateFeatureData
} from '../models/featureModel.js';

export const getAllFeatures = async (req: Request, res: Response): Promise<void> => {
  try {
    const features = await findAllFeatures();
    res.status(200).json({
      success: true,
      data: features
    });
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getFeatureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const feature = await findFeatureById(parseInt(id));
    
    if (!feature) {
      res.status(404).json({
        success: false,
        message: 'Feature not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: feature
    });
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNewFeature = async (req: Request, res: Response): Promise<void> => {
  try {
    const featureData: CreateFeatureData = req.body;
    const feature = await createFeature(featureData);
    
    res.status(201).json({
      success: true,
      data: feature,
      message: 'Feature created successfully'
    });
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create feature'
    });
  }
};

export const updateFeatureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const featureData: UpdateFeatureData = req.body;
    const feature = await updateFeature(parseInt(id), featureData);
    
    if (!feature) {
      res.status(404).json({
        success: false,
        message: 'Feature not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: feature,
      message: 'Feature updated successfully'
    });
  } catch (error) {
    console.error('Error updating feature:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update feature'
    });
  }
};

export const deleteFeatureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteFeature(parseInt(id));
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Feature not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Feature deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const toggleFeatureStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const feature = await toggleFeatureStatus(parseInt(id));
    
    if (!feature) {
      res.status(404).json({
        success: false,
        message: 'Feature not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: feature,
      message: `Feature ${feature.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling feature status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};