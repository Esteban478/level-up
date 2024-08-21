import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Habit, HabitLog, Achievement, Tip, LevelThreshold, BadgeTier, XPTransaction, UserAchievement } from '../models/index.js';
import { habits } from './habitSeedData.js';
import { achievements } from './achievementSeedData.js';
import { tips } from './tipSeedData.js';
import { createLevelProgression } from '../services/levelProgressionService.js';
import { badgeTiers } from './updatedBadgeTierSeedData.js';
import { userProfiles } from './userProfileSeedData.js';
import { generateHabitLogs } from './habitLogSeedData.js';
import { generateXPTransactions } from './xpTransactionSeedData.js';
import { generateUserAchievements } from './userAchievementSeedData.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Habit.deleteMany({});
        await HabitLog.deleteMany({});
        await Achievement.deleteMany({});
        await Tip.deleteMany({});
        await LevelThreshold.deleteMany({});
        await BadgeTier.deleteMany({});
        await XPTransaction.deleteMany({});
        await UserAchievement.deleteMany({});

        // Seed users
        const createdUsers = await User.create(userProfiles);
        console.log('Users seeded successfully');

        // Seed habits
        const createdHabits = await Habit.create(habits);
        console.log('Habits seeded successfully');

        // Generate and seed habit logs
        const habitLogs = generateHabitLogs(createdUsers, createdHabits);
        const createdHabitLogs = await HabitLog.create(habitLogs);
        console.log('Habit logs seeded successfully');

        // Generate and seed XP transactions
        const xpTransactions = generateXPTransactions(createdHabitLogs, createdHabits);
        await XPTransaction.create(xpTransactions);
        console.log('XP transactions seeded successfully');

        // Seed achievements
        const createdAchievements = await Achievement.create(achievements);
        console.log('Achievements seeded successfully');

        // Generate and seed user achievements
        const userAchievements = generateUserAchievements(createdUsers, createdHabitLogs, createdAchievements);
        await UserAchievement.create(userAchievements);
        console.log('User achievements seeded successfully');

        // Seed other data
        await Tip.create(tips);
        await createLevelProgression();
        await BadgeTier.create(badgeTiers);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedDatabase();