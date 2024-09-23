import { XpTransaction, User, Habit, LevelThreshold, FeedItem } from '../models/index.js';
import { checkAchievements, createFeedItemForAchievement } from '../services/achievementService.js';
import mongoose from 'mongoose';

export const createXpTransaction = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log('Starting XP transaction', req.body);
        const { habitId, source } = req.body;
        const userId = req.user._id;

        console.log('User ID:', userId, 'Habit ID:', habitId, 'Source:', source);

        let xpGained;
        if (source === 'Habit_completion') {
            const habit = await Habit.findById(habitId);
            console.log('Habit found:', habit);
            if (!habit) {
                throw new Error(`Habit not found for ID: ${habitId}`);
            }
            xpGained = habit.xpReward.base;
            console.log('XP gained from habit:', xpGained);
        } else {
            xpGained = req.body.xpGained;
            console.log('XP gained from other source:', xpGained);
        }

        // Create XP transaction
        const xpTransaction = new XpTransaction({
            userId,
            amount: xpGained,
            source,
            sourceId: habitId
        });
        await xpTransaction.save({ session });

        // Update user's XP and level
        const user = await User.findById(userId).session(session);
        user.totalXp += xpGained;
        user.xp += xpGained;

        // Check for level up
        const nextLevelThreshold = await LevelThreshold.findOne({ totalXpRequired: { $gt: user.totalXp } }).sort('totalXpRequired').session(session);

        let levelUp = false;

        if (nextLevelThreshold && user.level < nextLevelThreshold.level - 1) {
            user.level = nextLevelThreshold.level - 1;
            levelUp = true;
            user.xp = user.totalXp - (await LevelThreshold.findOne({ level: user.level }).session(session)).totalXpRequired;
        }

        await user.save({ session });

        // Check for achievements
        const earnedAchievements = await checkAchievements(userId, habitId);

        console.log('Earned achievements:', earnedAchievements);
        console.log('New user level:', user.level);
        console.log('New user XP:', user.xp);

        // Award XP for achievements
        let achievementXP = 0;
        for (const achievement of earnedAchievements) {
            achievementXP += achievement.reward.xp;

            const achievementXpTransaction = new XpTransaction({
                userId,
                amount: achievement.reward.xp,
                source: 'Achievement',
                sourceId: achievement._id
            });
            await achievementXpTransaction.save({ session });

            // Create feed item for the achievement
            await createFeedItemForAchievement(userId, achievement);
        }

        // Update user's XP again if achievements were earned
        if (achievementXP > 0) {
            user.totalXp += achievementXP;
            user.xp += achievementXP;
            await user.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            xpGained: xpGained + achievementXP,
            totalXp: user.totalXp,
            currentXp: user.xp,
            newLevel: levelUp ? user.level : undefined,
            earnedAchievements: earnedAchievements.map(a => ({
                name: a.name,
                description: a.description,
                xpReward: a.reward.xp
            }))
        });
    } catch (error) {
        console.error('Error in createXpTransaction:', error);
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: error.message, stack: error.stack });
    }
};

export const getXpTransactions = async (req, res) => {
    try {
        const xpTransactions = await XpTransaction.find({ userId: req.user._id });
        res.json(xpTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getXpTransactionById = async (req, res) => {
    try {
        const xpTransaction = await XpTransaction.findOne({ _id: req.params.id, userId: req.user._id });
        if (!xpTransaction) {
            return res.status(404).json({ error: 'XP transaction not found' });
        }
        res.json(xpTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserTotalXP = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ totalXP: user.totalXp || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};