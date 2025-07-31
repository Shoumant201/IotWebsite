import express from 'express';
import {
  getAllHeroes,
  getHeroById,
  createNewHero,
  updateHeroById,
  deleteHeroById,
  toggleHeroStatusById
} from '../controllers/heroController.js';

const router = express.Router();

// GET /api/heroes - Get all heroes
router.get('/', getAllHeroes);

// GET /api/heroes/:id - Get hero by ID
router.get('/:id', getHeroById);

// POST /api/heroes - Create new hero
router.post('/', createNewHero);

// PUT /api/heroes/:id - Update hero
router.put('/:id', updateHeroById);

// DELETE /api/heroes/:id - Delete hero
router.delete('/:id', deleteHeroById);

// PATCH /api/heroes/:id/toggle - Toggle hero active status
router.patch('/:id/toggle', toggleHeroStatusById);

export default router;