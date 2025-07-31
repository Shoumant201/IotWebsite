import { Request, Response } from 'express';
import {
  findAllTimelineEvents,
  findTimelineEventById,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
  toggleTimelineEventStatus,
  CreateTimelineData,
  UpdateTimelineData
} from '../models/timelineModel.js';

export const getAllTimelineEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const timelineEvents = await findAllTimelineEvents();
    res.status(200).json({
      success: true,
      data: timelineEvents
    });
  } catch (error) {
    console.error('Error fetching timeline events:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getTimelineEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timelineEvent = await findTimelineEventById(parseInt(id));
    
    if (!timelineEvent) {
      res.status(404).json({
        success: false,
        message: 'Timeline event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: timelineEvent
    });
  } catch (error) {
    console.error('Error fetching timeline event:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNewTimelineEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const timelineData: CreateTimelineData = req.body;
    const timelineEvent = await createTimelineEvent(timelineData);
    
    res.status(201).json({
      success: true,
      data: timelineEvent,
      message: 'Timeline event created successfully'
    });
  } catch (error) {
    console.error('Error creating timeline event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create timeline event'
    });
  }
};

export const updateTimelineEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timelineData: UpdateTimelineData = req.body;
    const timelineEvent = await updateTimelineEvent(parseInt(id), timelineData);
    
    if (!timelineEvent) {
      res.status(404).json({
        success: false,
        message: 'Timeline event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: timelineEvent,
      message: 'Timeline event updated successfully'
    });
  } catch (error) {
    console.error('Error updating timeline event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update timeline event'
    });
  }
};

export const deleteTimelineEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteTimelineEvent(parseInt(id));
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Timeline event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Timeline event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting timeline event:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const toggleTimelineEventStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timelineEvent = await toggleTimelineEventStatus(parseInt(id));
    
    if (!timelineEvent) {
      res.status(404).json({
        success: false,
        message: 'Timeline event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: timelineEvent,
      message: `Timeline event ${timelineEvent.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling timeline event status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};