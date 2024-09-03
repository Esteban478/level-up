import { Habit } from '../models/index.js';

export const createHabit = async (req, res) => {
    try {
        const { templateId, customizations } = req.body;
        let habitData;

        if (templateId) {
            // Creating a user-specific habit based on a template
            const templateHabit = await Habit.findOne({ _id: templateId, isTemplate: true });
            if (!templateHabit) {
                return res.status(404).json({ error: 'Template habit not found' });
            }

            habitData = {
                ...templateHabit.toObject(),
                _id: undefined,  // Clear _id to create a new document
                userId: req.user._id,
                isTemplate: false,
                templateId: templateHabit._id,
                customizations: {
                    ...templateHabit.toObject().goal,
                    ...templateHabit.toObject().frequency,
                    ...templateHabit.toObject().isPublic,
                    ...customizations
                }
            };
        } else {
            // Creating a new custom habit
            habitData = {
                ...req.body,
                userId: req.user._id,
                isTemplate: false
            };
        }

        const habit = new Habit(habitData);
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getHabits = async (req, res) => {
    try {
        const userHabits = await Habit.find({ userId: req.user._id, isTemplate: false });
        const templateHabits = await Habit.find({ isTemplate: true });
        res.json({ userHabits, templateHabits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTemplateHabits = async (req, res) => {
    try {
        const templateHabits = await Habit.find({ isTemplate: true });
        res.json(templateHabits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHabitById = async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.user._id });
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
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.user._id, isTemplate: false });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found or cannot be edited' });
        }

        // Update customizations
        if (req.body.customizations) {
            habit.customizations = {
                ...habit.customizations,
                ...req.body.customizations
            };

            // Ensure goal is properly set
            if (req.body.customizations.goal) {
                habit.goal = {
                    ...habit.goal,
                    ...req.body.customizations.goal
                };
            }

            // Ensure frequency is properly set
            if (req.body.customizations.frequency) {
                habit.frequency = {
                    ...habit.frequency,
                    ...req.body.customizations.frequency
                };
            }

            // Update isPublic if provided
            if (req.body.customizations.isPublic !== undefined) {
                habit.isPublic = req.body.customizations.isPublic;
            }
        }

        // Update other fields
        const fieldsToUpdate = ['name', 'description', 'area', 'type', 'xpReward'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                habit[field] = req.body[field];
            }
        });

        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};