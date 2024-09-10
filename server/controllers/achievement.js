import { Achievement, User } from '../models/index.js';
import { checkLevelAchievement } from '../services/achievementService.js';

export const createAchievement = async (req, res) => {
    try {
        const achievement = new Achievement(req.body);
        await achievement.save();
        res.status(201).json(achievement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json(achievement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json(achievement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAchievementsForUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('achievements');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const checkLevelAchievements = async (req, res) => {
    try {
        const { level } = req.body;
        const userId = req.user._id;

        const newAchievements = await checkLevelAchievement(userId, level);

        res.json(newAchievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};