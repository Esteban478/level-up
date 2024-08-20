import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Habit, LevelThreshold, Achievement, Tip, BadgeTier } from '../models/index.js';
import { habits, achievements, tips } from './seedData.js';
import { createLevelProgression } from '../services/levelProgressionService.js';

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
        await BadgeTier.deleteMany({});

        // Seed Habits
        await Habit.insertMany(habits);
        console.log('Habits seeded successfully');

        // Seed Level Thresholds and related Achievements
        await createLevelProgression();
        console.log('Level Thresholds and related Achievements seeded successfully');

        // Seed additional Achievements
        await Achievement.insertMany(achievements);
        console.log('Additional Achievements seeded successfully');

        // Seed Tips
        await Tip.insertMany(tips);
        console.log('Tips seeded successfully');

        // Seed BadgeTiers
        // This would need to be implemented based on your specific badge tier requirements
        // await seedBadgeTiers();
        // console.log('Badge Tiers seeded successfully');

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedDatabase();