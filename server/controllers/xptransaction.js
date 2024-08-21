import { XPTransaction, User } from '../models/index.js';

export const createXPTransaction = async (req, res) => {
    try {
        const { amount, source } = req.body;
        const xpTransaction = new XPTransaction({
            userId: req.user.userId,
            amount,
            source
        });
        await xpTransaction.save();

        // Update user's total XP
        await User.findByIdAndUpdate(req.user.userId, { $inc: { xp: amount, totalXp: amount } });

        res.status(201).json(xpTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getXPTransactions = async (req, res) => {
    try {
        const xpTransactions = await XPTransaction.find({ userId: req.user.userId });
        res.json(xpTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getXPTransactionById = async (req, res) => {
    try {
        const xpTransaction = await XPTransaction.findOne({ _id: req.params.id, userId: req.user.userId });
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
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ totalXP: user.totalXp || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};