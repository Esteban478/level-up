import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createLevelThreshold,
    getLevelThresholds,
    getLevelThresholdById,
    updateLevelThreshold,
    deleteLevelThreshold,
    getCurrentLevel
} from '../controllers/index.js';

const levelThresholdRouter = express.Router();

// Create a new level threshold (admin only)
levelThresholdRouter.post('/', authMiddleware, createLevelThreshold);

// Get all level thresholds
levelThresholdRouter.get('/', getLevelThresholds);

// Get a specific level threshold by ID
levelThresholdRouter.get('/:id', getLevelThresholdById);

// Update a level threshold (admin only)
levelThresholdRouter.put('/:id', authMiddleware, updateLevelThreshold);

// Delete a level threshold (admin only)
levelThresholdRouter.delete('/:id', authMiddleware, deleteLevelThreshold);

// Get current level based on XP
levelThresholdRouter.get('/user/current', authMiddleware, getCurrentLevel);

export default levelThresholdRouter;