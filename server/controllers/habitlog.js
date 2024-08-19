import { HabitLog, Habit } from '../models/index.js';

export const createHabitLog = async (req, res) => {
    try {
        const { habitId, date, value } = req.body;
        const habit = await Habit.findOne({ _id: habitId, userId: req.user.userId });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        const habitLog = new HabitLog({
            habitId,
            userId: req.user.userId,
            date,
            value
        });
        await habitLog.save();

        // Update habit streak and total completions
        habit.totalCompletions += 1;
        // You might want to implement streak calculation logic here
        await habit.save();

        res.status(201).json(habitLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getHabitLogs = async (req, res) => {
    try {
        const habitLogs = await HabitLog.find({ userId: req.user.userId });
        res.json(habitLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHabitLogById = async (req, res) => {
    try {
        const habitLog = await HabitLog.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!habitLog) {
            return res.status(404).json({ error: 'Habit log not found' });
        }
        res.json(habitLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHabitLog = async (req, res) => {
    try {
        const habitLog = await HabitLog.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!habitLog) {
            return res.status(404).json({ error: 'Habit log not found' });
        }
        res.json(habitLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteHabitLog = async (req, res) => {
    try {
        const habitLog = await HabitLog.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!habitLog) {
            return res.status(404).json({ error: 'Habit log not found' });
        }
        res.json({ message: 'Habit log deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};