import express from 'express';
import { createBadgeTier, updateBadgeTier, getBadgeTiers, getBadgeTierById, deleteBadgeTier } from '../controllers/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create a new badge tier
router.post('/', authMiddleware, createBadgeTier);

// Update an existing badge tier
router.put('/:id', authMiddleware, updateBadgeTier);

// Get all badge tiers
router.get('/', authMiddleware, getBadgeTiers);

// Get a specific badge tier by ID
router.get('/:id', authMiddleware, getBadgeTierById);

// Delete a badge tier
router.delete('/:id', authMiddleware, deleteBadgeTier);

export default router;