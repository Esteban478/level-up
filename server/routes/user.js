import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getUserProfile,
    updateUserProfile,
    getUserHabits,
    getUserAchievements,
    getUserXPAndLevel
} from '../controllers/index.js';

const userRouter = express.Router();

// Get user profile
userRouter.get("/profile", authMiddleware, getUserProfile);

// Update user profile
userRouter.put("/profile", authMiddleware, updateUserProfile);

// Get user's habits
userRouter.get("/habits", authMiddleware, getUserHabits);

// Get user's achievements
userRouter.get("/achievements", authMiddleware, getUserAchievements);

// Get user's XP and level
userRouter.get("/xp", authMiddleware, getUserXPAndLevel);

export default userRouter;