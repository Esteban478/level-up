import mongoose from 'mongoose';
import 'dotenv/config';
import { User, Habit, HabitLog, Achievement, Tip, LevelThreshold, BadgeTier, XPTransaction, UserAchievement } from '../models/index.js';
import {
    achievements, badgeTiers, habits, tips, userProfiles, generateHabitLogs, generateXPTransactions,
    generateUserAchievements, generateLevelThresholds
} from '../seeddata/index.js';
import { cleanupDatabase, generateAvatarForSeed } from '../utils/testUtils.js';

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await cleanupDatabase();

        // Seed users with avatars
        const createdUsers = await Promise.all(userProfiles.map(async (profile) => {
            const user = new User(profile);
            await user.save();
            const avatarId = await generateAvatarForSeed(user._id, user.username);
            user.avatar = avatarId;
            await user.save();
            return user;
        }));
        console.log('Users seeded successfully with avatars');

        // // Seed users
        // const createdUsers = await User.create(userProfiles);
        // console.log('Users seeded successfully');

        // Generate and seed habits
        const createdHabits = await Habit.create(habits);
        console.log('Habits seeded successfully');

        // Generate and seed habit logs
        // const habitLogs = generateHabitLogs(createdUsers, createdHabits);
        // const createdHabitLogs = await HabitLog.create(habitLogs);
        // console.log('Habit logs seeded successfully');

        // Generate and seed XP transactions
        // const xpTransactions = generateXPTransactions(createdHabitLogs, createdHabits);
        // const createdXPTransactions = await XPTransaction.create(xpTransactions);
        // console.log('XP transactions seeded successfully');

        // Seed achievements
        const createdAchievements = await Achievement.create(achievements);
        console.log('Achievements seeded successfully');

        // Generate and seed user achievements
        // const userAchievements = generateUserAchievements(createdUsers, createdHabitLogs, createdAchievements, createdXPTransactions);
        // await UserAchievement.create(userAchievements);
        // console.log('User achievements seeded successfully');

        // Generate and seed level progression
        const levelThresholds = await generateLevelThresholds(100);
        await LevelThreshold.create(levelThresholds);
        console.log('Level thresholds seeded successfully');

        // Seed tips
        await Tip.create(tips);
        console.log('Tips seeded successfully');

        // Seed badge tiers
        await BadgeTier.create(badgeTiers);
        console.log('Badge tiers seeded successfully');

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedDatabase();