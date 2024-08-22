import mongoose from 'mongoose';
import 'dotenv/config';
import { User, Habit, HabitLog, Achievement, Tip, LevelThreshold, BadgeTier, XPTransaction, UserAchievement } from '../models/index.js';
import { achievements, badgeTiers, habits, tips, userProfiles, generateHabitLogs, generateXPTransactions, generateUserAchievements } from '../seeddata/index.js';
import { createLevelProgression } from '../services/levelProgressionService.js';

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

        // Generate and seed habits
        const createdHabits = await Habit.create(habits);
        console.log('Habits seeded successfully');

        // Generate and seed habit logs
        const habitLogs = generateHabitLogs(createdUsers, createdHabits);
        const createdHabitLogs = await HabitLog.create(habitLogs);
        console.log('Habit logs seeded successfully');

        // Generate and seed XP transactions
        const xpTransactions = generateXPTransactions(createdHabitLogs, createdHabits);
        const createdXPTransactions = await XPTransaction.create(xpTransactions);
        console.log('XP transactions seeded successfully');

        // Seed achievements
        const createdAchievements = await Achievement.create(achievements);
        console.log('Achievements seeded successfully');

        // Generate and seed user achievements
        const userAchievements = generateUserAchievements(createdUsers, createdHabitLogs, createdAchievements, createdXPTransactions);
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