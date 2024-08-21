import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getUserAchievements,
    createUserAchievement,
    deleteUserAchievement
} from '../controllers/userachievement.js';

const userAchievementRouter = express.Router();

// All routes are protected
userAchievementRouter.use(authMiddleware);

// Get all achievements for a user
userAchievementRouter.get('/', getUserAchievements);

// Create a new user achievement
userAchievementRouter.post('/', createUserAchievement);

// Delete a user achievement
userAchievementRouter.delete('/:id', deleteUserAchievement);

export default userAchievementRouter;