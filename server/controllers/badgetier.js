import { BadgeTier } from '../models/index.js';

export const createBadgeTier = async (req, res) => {
    try {
        const { achievementId, tier, name, icon, condition } = req.body;
        const badgeTier = new BadgeTier({
            achievementId,
            tier,
            name,
            icon,
            condition
        });
        await badgeTier.save();
        res.status(201).json(badgeTier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBadgeTier = async (req, res) => {
    try {
        const { achievementId, tier, name, icon, condition } = req.body;
        const badgeTier = await BadgeTier.findByIdAndUpdate(
            req.params.id,
            { achievementId, tier, name, icon, condition },
            { new: true, runValidators: true }
        );
        if (!badgeTier) {
            return res.status(404).json({ error: 'Badge tier not found' });
        }
        res.json(badgeTier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBadgeTiers = async (req, res) => {
    try {
        const badgeTiers = await BadgeTier.find().populate('achievementId');
        res.json(badgeTiers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBadgeTierById = async (req, res) => {
    try {
        const badgeTier = await BadgeTier.findById(req.params.id).populate('achievementId');
        if (!badgeTier) {
            return res.status(404).json({ error: 'Badge tier not found' });
        }
        res.json(badgeTier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBadgeTier = async (req, res) => {
    try {
        const badgeTier = await BadgeTier.findByIdAndDelete(req.params.id);
        if (!badgeTier) {
            return res.status(404).json({ error: 'Badge tier not found' });
        }
        res.json({ message: 'Badge tier deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};