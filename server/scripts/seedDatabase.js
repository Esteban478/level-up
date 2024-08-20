import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Habit, LevelThreshold, Achievement, Tip } from '../models/index.js';
import { habits, levelThresholds, achievements, tips } from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Habit.deleteMany({});
        await LevelThreshold.deleteMany({});
        await Achievement.deleteMany({});
        await Tip.deleteMany({});

        // Seed Habits
        for (const habit of habits) {
            await Habit.create(habit);
        }
        console.log('Habits seeded successfully');

        // Seed Level Thresholds
        for (const threshold of levelThresholds) {
            await LevelThreshold.create(threshold);
        }
        console.log('Level Thresholds seeded successfully');

        // Seed Achievements
        for (const achievement of achievements) {
            await Achievement.create(achievement);
        }
        console.log('Achievements seeded successfully');

        // Seed Tips
        for (const tip of tips) {
            await Tip.create(tip);
        }
        console.log('Tips seeded successfully');

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedDatabase();

// scripts/seedData.js

export const habits = [
    {
        name: "Daily Exercise",
        description: "Engage in physical activity to improve overall health and fitness",
        type: "Duration",
        area: "Health",
        goal: { duration: 30, unit: "minutes" },
        xpReward: 50,
        frequency: "Daily"
    },
    // ... add all other habits from the spreadsheet
];

export const levelThresholds = [
    { level: 1, xpRequired: 0, reward: { title: "Beginner" } },
    { level: 2, xpRequired: 100, reward: { title: "Novice" } },
    // ... add more level thresholds
];

export const achievements = [
    {
        name: "Early Bird",
        description: "Complete your morning routine for 7 consecutive days",
        type: "streak",
        condition: { habitId: "morning-routine-id", streakDays: 7 },
        reward: { xp: 100, badge: "early_bird_badge" }
    },
    // ... add more achievements
];

export const tips = [
    {
        content: "Start with small, achievable goals to build momentum",
        category: "starting",
        relatedHabitTypes: ["boolean", "numeric"],
        difficulty: "beginner"
    },
    // ... add more tips
];