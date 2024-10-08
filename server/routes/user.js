import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getUserProfile,
    updateUserProfile,
    getUserHabits,
    getUserAchievements,
    getUserXPAndLevel,
    searchUsers,
    addFriend,
    getUserFriends,
    getFriendProfile,
    getPublicActiveHabits
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

// Get user's public active habits
userRouter.get("/public-habits/:userId?", authMiddleware, getPublicActiveHabits);

// Search for users
userRouter.get("/search", authMiddleware, searchUsers);

// Add friend
userRouter.post("/friends", authMiddleware, addFriend);

// Get user's friends
userRouter.get("/friends", authMiddleware, getUserFriends);

// Get a friends profile
userRouter.get("/friends/:friendId/profile", authMiddleware, getFriendProfile);

export default userRouter;