import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    deleteHabit
} from '../controllers/index.js';

const habitRouter = express.Router();

// Create a new habit
habitRouter.post('/', authMiddleware, createHabit);

// Get all habits for the authenticated user
habitRouter.get('/', authMiddleware, getHabits);

// Get a specific habit by ID
habitRouter.get('/:id', authMiddleware, getHabitById);

// Update a habit
habitRouter.put('/:id', authMiddleware, updateHabit);

// Delete a habit
habitRouter.delete('/:id', authMiddleware, deleteHabit);

export default habitRouter;