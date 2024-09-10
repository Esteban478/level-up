
import { XPTransaction, User, Habit, LevelThreshold } from '../models/index.js';
import mongoose from 'mongoose';

export const createXPTransaction = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { habitId, source } = req.body;
        const userId = req.user._id;

        let xpGained;
        if (source === 'Habit_completion') {
            const habit = await Habit.findById(habitId);
            if (!habit) {
                throw new Error('Habit not found');
            }
            xpGained = habit.xpReward.base;
        } else {
            // For other sources, xpGained should be provided in the request
            xpGained = req.body.xpGained;
        }

        // Create XP transaction
        const xpTransaction = new XPTransaction({
            userId,
            amount: xpGained,
            source,
            sourceId: habitId
        });
        await xpTransaction.save({ session });

        // Update user's XP and level
        const user = await User.findById(userId);
        user.totalXp += xpGained;

        // Check for level up
        const currentLevelThreshold = await LevelThreshold.findOne({ level: user.level });
        const nextLevelThreshold = await LevelThreshold.findOne({ level: user.level + 1 });

        let levelUp = false;
        let xpForNextLevel = 0;

        if (nextLevelThreshold && user.totalXp >= nextLevelThreshold.totalXpRequired) {
            user.level += 1;
            levelUp = true;
            xpForNextLevel = user.totalXp - nextLevelThreshold.totalXpRequired;
        } else if (currentLevelThreshold) {
            xpForNextLevel = user.totalXp - currentLevelThreshold.totalXpRequired;
        }

        user.xp = xpForNextLevel;
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            xpGained,
            totalXp: user.totalXp,
            currentXp: user.xp,
            newLevel: levelUp ? user.level : undefined
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: error.message });
    }
};

export const getXPTransactions = async (req, res) => {
    try {
        const xpTransactions = await XPTransaction.find({ userId: req.user._id });
        res.json(xpTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getXPTransactionById = async (req, res) => {
    try {
        const xpTransaction = await XPTransaction.findOne({ _id: req.params.id, userId: req.user._id });
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