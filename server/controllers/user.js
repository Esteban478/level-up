import User from '../models/User.js';
import Habit from '../models/Habit.js';
import Achievement from '../models/Achievement.js';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { username, email },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.userId });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find({ userId: req.user.userId });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserXPAndLevel = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('xp level');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ xp: user.xp, level: user.level });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};