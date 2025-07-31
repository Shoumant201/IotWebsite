import { Request, Response } from 'express';
import {
  findAllEvents,
  findEventById,
  findEventBySlug,
  findGrandEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventStatus,
  CreateEventData,
  UpdateEventData
} from '../models/eventModel.js';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isGrandEvent } = req.query;
    const isGrand = isGrandEvent === 'true' ? true : isGrandEvent === 'false' ? false : undefined;
    const events = await findAllEvents(isGrand);
    
    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await findEventById(parseInt(id));
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const event = await findEventBySlug(slug);
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCurrentGrandEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const grandEvent = await findGrandEvent();
    
    if (!grandEvent) {
      res.status(404).json({
        success: false,
        message: 'Grand event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: grandEvent
    });
  } catch (error) {
    console.error('Error fetching grand event:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNewEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventData: CreateEventData = req.body;
    const event = await createEvent(eventData);
    
    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully'
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create event'
    });
  }
};

export const updateEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eventData: UpdateEventData = req.body;
    const event = await updateEvent(parseInt(id), eventData);
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update event'
    });
  }
};

export const deleteEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteEvent(parseInt(id));
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const toggleEventStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await toggleEventStatus(parseInt(id));
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event,
      message: `Event ${event.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling event status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};