import express from 'express';
import {
    getAllTips,
    getTipById,
    createTip,
    updateTip,
    deleteTip,
    getRandomTip,
    getTipsByCategory,
    getTipsByrelatedAreas
} from '../controllers/tip.js';
import { authMiddleware } from '../middleware/auth.js';

const tipRouter = express.Router();

// Get a random tip
tipRouter.get('/random', getRandomTip);

// Get tips by category
tipRouter.get('/category/:category', getTipsByCategory);

// Get tips by related area
tipRouter.get('/relatedAreas/:relatedAreas', getTipsByrelatedAreas);

// Protected routes
tipRouter.use(authMiddleware);

// Get all tips
tipRouter.get('/', getAllTips);

// Get a specific tip by ID
tipRouter.get('/:id', getTipById);

// Create a new tip
tipRouter.post('/', createTip);

// Update a tip
tipRouter.put('/:id', updateTip);

// Delete a tip
tipRouter.delete('/:id', deleteTip);

export default tipRouter;