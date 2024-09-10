import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createAchievement,
    getAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement,
    getAchievementsForUser,
    checkLevelAchievements
} from '../controllers/index.js';

const achievementRouter = express.Router();

// Create a new achievement (admin only)
achievementRouter.post('/', authMiddleware, createAchievement);

// Get all achievements
achievementRouter.get('/', getAchievements);

// Get a specific achievement by ID
achievementRouter.get('/:id', getAchievementById);

// Update an achievement (admin only)
achievementRouter.put('/:id', authMiddleware, updateAchievement);

// Delete an achievement (admin only)
achievementRouter.delete('/:id', authMiddleware, deleteAchievement);

// Get achievements for the authenticated user
achievementRouter.get('/user/achievements', authMiddleware, getAchievementsForUser);

achievementRouter.post('/check-level', authMiddleware, checkLevelAchievements);


export default achievementRouter;