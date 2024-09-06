import { HabitLog, Habit } from '../models/index.js';

export const createHabitLog = async (req, res) => {
    try {
        const { habitId, date, value, notes } = req.body;
        const habit = await Habit.findOne({ _id: habitId, userId: req.user._id });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const habitLog = await HabitLog.logCompletion(habitId, req.user._id, value, parsedDate, notes);
        const updatedHabit = await Habit.findById(habitId);
        res.status(201).json({ habitLog, updatedHabit });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getHabitLogs = async (req, res) => {
    try {
        const habitLogs = await HabitLog.find({ userId: req.user._id }).sort('-date');
        res.json(habitLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHabitLogById = async (req, res) => {
    try {
        const habitLog = await HabitLog.findOne({ _id: req.params.id, userId: req.user._id });
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
        const { value, notes } = req.body;
        const habitLog = await HabitLog.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { value, notes },
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
        const result = await HabitLog.undoLogEntry(req.params.id, req.user._id);
        if (result.success) {
            res.json({ message: 'Habit log deleted successfully' });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error deleting habit log:', error);
        res.status(500).json({ error: error.message });
    }
};