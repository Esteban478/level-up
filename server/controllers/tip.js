import Tip from '../models/Tip.js';

// Get all tips
export const getAllTips = async (req, res) => {
    try {
        const tips = await Tip.find();
        res.status(200).json(tips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tips", error: error.message });
    }
};

// Get a single tip by ID
export const getTipById = async (req, res) => {
    try {
        const tip = await Tip.findById(req.params.id);
        if (!tip) {
            return res.status(404).json({ message: "Tip not found" });
        }
        res.status(200).json(tip);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tip", error: error.message });
    }
};

// Create a new tip
export const createTip = async (req, res) => {
    try {
        const newTip = new Tip(req.body);
        const savedTip = await newTip.save();
        res.status(201).json(savedTip);
    } catch (error) {
        res.status(400).json({ message: "Error creating tip", error: error.message });
    }
};

// Update a tip
export const updateTip = async (req, res) => {
    try {
        const updatedTip = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTip) {
            return res.status(404).json({ message: "Tip not found" });
        }
        res.status(200).json(updatedTip);
    } catch (error) {
        res.status(400).json({ message: "Error updating tip", error: error.message });
    }
};

// Delete a tip
export const deleteTip = async (req, res) => {
    try {
        const deletedTip = await Tip.findByIdAndDelete(req.params.id);
        if (!deletedTip) {
            return res.status(404).json({ message: "Tip not found" });
        }
        res.status(200).json({ message: "Tip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tip", error: error.message });
    }
};

// Get a random tip
export const getRandomTip = async (req, res) => {
    try {
        const count = await Tip.countDocuments();
        const random = Math.floor(Math.random() * count);
        const tip = await Tip.findOne().skip(random);
        res.status(200).json(tip);
    } catch (error) {
        res.status(500).json({ message: "Error fetching random tip", error: error.message });
    }
};

// Get tips by category
export const getTipsByCategory = async (req, res) => {
    try {
        const tips = await Tip.find({ category: req.params.category });
        res.status(200).json(tips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tips by category", error: error.message });
    }
};

// Get tips by related area of the habit
export const getTipsByrelatedAreas = async (req, res) => {
    try {
        const tips = await Tip.find({ relatedAreas: { $in: [req.params.relatedAreas] } });
        res.status(200).json(tips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tips by related areas", error: error.message });
    }
};