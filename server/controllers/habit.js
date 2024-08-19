import { Habit } from '../models/index.js';

export const createHabit = async (req, res) => {
    try {
        const habit = new Habit({
            ...req.body,
            userId: req.user.userId
        });
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.userId });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHabitById = async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};