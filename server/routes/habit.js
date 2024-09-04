import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createHabit,
    getHabits,
    getTemplateHabits,
    getHabitById,
    updateHabit,
    deleteHabit,
    archiveHabit,
    getArchivedHabits
} from '../controllers/index.js';

const habitRouter = express.Router();

habitRouter.use(authMiddleware);

// Create a new habit
habitRouter.post('/', createHabit);

// Get all habits for the authenticated user
habitRouter.get('/', getHabits);

// Get all habit templates
habitRouter.get('/templates', getTemplateHabits);

// Get archived habits
habitRouter.get('/archived', getArchivedHabits);

// Get a specific habit by ID
habitRouter.get('/:id', getHabitById);

// Update a habit
habitRouter.put('/:id', updateHabit);

// Delete a habit
habitRouter.delete('/:id', deleteHabit);

// Archive a habit
habitRouter.put('/:id/archive', archiveHabit);


export default habitRouter;