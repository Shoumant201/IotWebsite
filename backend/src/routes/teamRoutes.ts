import express from 'express';
import {
  getAllTeamMembers,
  getTeamMembersOrganized,
  getLeadershipTeam,
  getSteeringLeaders,
  getTeamMemberById,
  createNewTeamMember,
  updateTeamMemberById,
  deleteTeamMemberById,
  toggleTeamMemberStatusById
} from '../controllers/teamController.js';

const router = express.Router();

// GET /api/team - Get all team members (with optional query params)
router.get('/', getAllTeamMembers);

// GET /api/team/organized - Get team members organized by year and type
router.get('/organized', getTeamMembersOrganized);

// GET /api/team/leadership - Get current leadership team
router.get('/leadership', getLeadershipTeam);

// GET /api/team/steering - Get current steering leaders
router.get('/steering', getSteeringLeaders);

// GET /api/team/:id - Get team member by ID
router.get('/:id', getTeamMemberById);

// POST /api/team - Create new team member
router.post('/', createNewTeamMember);

// PUT /api/team/:id - Update team member
router.put('/:id', updateTeamMemberById);

// DELETE /api/team/:id - Delete team member
router.delete('/:id', deleteTeamMemberById);

// PATCH /api/team/:id/toggle - Toggle team member active status
router.patch('/:id/toggle', toggleTeamMemberStatusById);

export default router;