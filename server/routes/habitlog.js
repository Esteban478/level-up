import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createHabitLog,
    getHabitLogs,
    getHabitLogById,
    updateHabitLog,
    deleteHabitLog
} from '../controllers/habitLog.js';

const habitLogRouter = express.Router();

// Create a new habit log
habitLogRouter.post('/', authMiddleware, createHabitLog);

// Get all habit logs for the authenticated user
habitLogRouter.get('/', authMiddleware, getHabitLogs);

// Get a specific habit log by ID
habitLogRouter.get('/:id', authMiddleware, getHabitLogById);

// Update a habit log
habitLogRouter.put('/:id', authMiddleware, updateHabitLog);

// Delete a habit log
habitLogRouter.delete('/:id', authMiddleware, deleteHabitLog);

export default habitLogRouter;