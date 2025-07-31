import { Request, Response } from 'express';
import {
  findAllHeroes,
  findHeroById,
  createHero,
  updateHero,
  deleteHero,
  toggleHeroStatus,
  CreateHeroData,
  UpdateHeroData
} from '../models/heroModel.js';

export const getAllHeroes = async (req: Request, res: Response): Promise<void> => {
  try {
    const heroes = await findAllHeroes();
    res.status(200).json({
      success: true,
      data: heroes
    });
  } catch (error) {
    console.error('Error fetching heroes:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getHeroById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const hero = await findHeroById(parseInt(id));
    
    if (!hero) {
      res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: hero
    });
  } catch (error) {
    console.error('Error fetching hero:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNewHero = async (req: Request, res: Response): Promise<void> => {
  try {
    const heroData: CreateHeroData = req.body;
    const hero = await createHero(heroData);
    
    res.status(201).json({
      success: true,
      data: hero,
      message: 'Hero created successfully'
    });
  } catch (error) {
    console.error('Error creating hero:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create hero'
    });
  }
};

export const updateHeroById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const heroData: UpdateHeroData = req.body;
    const hero = await updateHero(parseInt(id), heroData);
    
    if (!hero) {
      res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: hero,
      message: 'Hero updated successfully'
    });
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update hero'
    });
  }
};

export const deleteHeroById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteHero(parseInt(id));
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Hero deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting hero:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const toggleHeroStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const hero = await toggleHeroStatus(parseInt(id));
    
    if (!hero) {
      res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: hero,
      message: `Hero ${hero.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling hero status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};