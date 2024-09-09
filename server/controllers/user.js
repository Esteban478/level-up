import User from '../models/User.js';
import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import mongoose from 'mongoose';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').populate('avatar');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, email, bio, settings, currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select('+password').session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'User not found' });
        }

        // Handle password change if provided
        if (currentPassword && newPassword) {
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                await session.abortTransaction();
                return res.status(400).json({ error: 'Current password is incorrect' });
            }
            user.password = newPassword
        }

        // Update other fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (settings) {
            user.settings = {
                ...user.settings,
                notifications: {
                    ...user.settings.notifications,
                    ...settings.notifications
                },
                privacy: {
                    ...user.settings.privacy,
                    ...settings.privacy
                }
            };
        }

        await user.save({ session });
        await session.commitTransaction();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json(userResponse);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ error: error.message });
    } finally {
        session.endSession();
    }
};

export const getUserHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });

        // Get today's date (start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch today's logs for the user
        const todayLogs = await HabitLog.find({
            userId: req.user._id,
            date: { $gte: today }
        });

        // Create a Set of habit IDs that have been logged today
        const loggedHabitIds = new Set(todayLogs.map(log => log.habitId.toString()));

        // Add isTrackedToday field to each habit
        const habitsWithTrackingStatus = habits.map(habit => ({
            ...habit.toObject(),
            isTrackedToday: loggedHabitIds.has(habit._id.toString())
        }));

        res.json(habitsWithTrackingStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// export const getUserAchievements = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).populate('achievements');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(user.achievements);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const getUserXPAndLevel = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('xp level');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ xp: user.xp, level: user.level });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};