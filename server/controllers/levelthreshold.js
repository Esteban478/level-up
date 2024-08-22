import { LevelThreshold, User } from '../models/index.js';

export const createLevelThreshold = async (req, res) => {
    try {
        const { level, xpRequired, totalXpRequired, rewards, featureUnlock } = req.body;
        const levelThreshold = new LevelThreshold({
            level,
            xpRequired,
            totalXpRequired,
            rewards,
            featureUnlock
        });
        await levelThreshold.save();
        res.status(201).json(levelThreshold);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateLevelThreshold = async (req, res) => {
    try {
        const { xpRequired, totalXpRequired, rewards, featureUnlock } = req.body;
        const levelThreshold = await LevelThreshold.findByIdAndUpdate(
            req.params.id,
            { xpRequired, totalXpRequired, rewards, featureUnlock },
            { new: true, runValidators: true }
        );
        if (!levelThreshold) {
            return res.status(404).json({ error: 'Level threshold not found' });
        }
        res.json(levelThreshold);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCurrentLevel = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const currentLevel = await LevelThreshold.findOne({ totalXpRequired: { $lte: user.totalXp } })
            .sort('-totalXpRequired')
            .limit(1)
            .populate('rewards.achievementId');
        res.json({
            currentLevel: currentLevel ? currentLevel.level : 1,
            currentLevelDetails: currentLevel
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLevelThresholds = async (req, res) => {
    try {
        const levelThresholds = await LevelThreshold.find().sort('Level').populate('rewards.achievementId');
        res.json(levelThresholds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLevelThresholdById = async (req, res) => {
    try {
        const levelThreshold = await LevelThreshold.findById(req.params.id).populate('rewards.achievementId');
        if (!levelThreshold) {
            return res.status(404).json({ error: 'Level threshold not found' });
        }
        res.json(levelThreshold);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLevelThreshold = async (req, res) => {
    try {
        const levelThreshold = await LevelThreshold.findByIdAndDelete(req.params.id);
        if (!levelThreshold) {
            return res.status(404).json({ error: 'Level threshold not found' });
        }
        res.json({ message: 'Level threshold deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};