import { Request, Response } from 'express';
import {
  findAllTeamMembers,
  findTeamMembersOrganized,
  findLeadershipTeam,
  findSteeringLeaders,
  findTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberStatus,
  CreateTeamMemberData,
  UpdateTeamMemberData
} from '../models/teamMemberModel.js';

export const getAllTeamMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, year } = req.query;
    const teamMembers = await findAllTeamMembers(
      type as string,
      year as string
    );
    
    res.status(200).json({
      success: true,
      data: teamMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getTeamMembersOrganized = async (req: Request, res: Response): Promise<void> => {
  try {
    const organizedTeam = await findTeamMembersOrganized();
    
    res.status(200).json({
      success: true,
      data: organizedTeam
    });
  } catch (error) {
    console.error('Error fetching organized team members:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getLeadershipTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const leadership = await findLeadershipTeam();
    
    res.status(200).json({
      success: true,
      data: leadership
    });
  } catch (error) {
    console.error('Error fetching leadership team:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getSteeringLeaders = async (req: Request, res: Response): Promise<void> => {
  try {
    const steering = await findSteeringLeaders();
    
    res.status(200).json({
      success: true,
      data: steering
    });
  } catch (error) {
    console.error('Error fetching steering leaders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getTeamMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const teamMember = await findTeamMemberById(parseInt(id));
    
    if (!teamMember) {
      res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNewTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const memberData: CreateTeamMemberData = req.body;
    const teamMember = await createTeamMember(memberData);
    
    res.status(201).json({
      success: true,
      data: teamMember,
      message: 'Team member created successfully'
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create team member'
    });
  }
};

export const updateTeamMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const memberData: UpdateTeamMemberData = req.body;
    const teamMember = await updateTeamMember(parseInt(id), memberData);
    
    if (!teamMember) {
      res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: teamMember,
      message: 'Team member updated successfully'
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update team member'
    });
  }
};

export const deleteTeamMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteTeamMember(parseInt(id));
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const toggleTeamMemberStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const teamMember = await toggleTeamMemberStatus(parseInt(id));
    
    if (!teamMember) {
      res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: teamMember,
      message: `Team member ${teamMember.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling team member status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};