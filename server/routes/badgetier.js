import express from 'express';
import { createBadgeTier, updateBadgeTier, getBadgeTiers, getBadgeTierById, deleteBadgeTier } from '../controllers/index.js';
import { authMiddleware } from '../middleware/auth.js';

const badgeTierRouter = express.Router();

// Create a new badge tier
badgeTierRouter.post('/', authMiddleware, createBadgeTier);

// Update an existing badge tier
badgeTierRouter.put('/:id', authMiddleware, updateBadgeTier);

// Get all badge tiers
badgeTierRouter.get('/', authMiddleware, getBadgeTiers);

// Get a specific badge tier by ID
badgeTierRouter.get('/:id', authMiddleware, getBadgeTierById);

// Delete a badge tier
badgeTierRouter.delete('/:id', authMiddleware, deleteBadgeTier);

export default badgeTierRouter;