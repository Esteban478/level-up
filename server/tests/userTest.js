import { User, Habit, Achievement } from '../models/index.js';
import dotenv from 'dotenv';
import { makeRequest } from '../utils/testUtils.js';

dotenv.config();

let token;

const BASE_URL = process.env.BASE_URL;

const setupTestData = async () => {
    // Generate a unique email for each test run
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    // Delete the user if it already exists
    await User.deleteOne({ email: uniqueEmail });

    let testUser = new User({
        username: 'testuser0',
        email: uniqueEmail,
        password: 'testpassword0'
    });
    await testUser.save();

    // Check if habit exists, if not create it
    let habit = await Habit.findOne({ userId: testUser._id });
    if (!habit) {
        habit = new Habit({
            userId: testUser._id,
            name: 'Test Habit',
            description: 'This is a test habit',
            area: 'Health',
            type: 'Boolean',
            frequency: {
                type: 'Daily',
            },
            goal: {
                type: 'atLeast',
                value: 1,
                direction: 'increase'
            },
            xpReward: {
                base: 10
            },
            isPublic: false,
        });
        await habit.save();
    }

    // Check if achievement exists, if not create it
    let achievement = await Achievement.findOne({ name: 'Test Achievement' });
    if (!achievement) {
        achievement = new Achievement({
            name: 'Test Achievement',
            description: 'This is a test achievement',
            type: 'Habit_streak',
            category: 'health',
            icon: 'test_icon',
            condition: {
                habitId: habit._id,
                streakDays: 7
            },
            reward: {
                xp: 100,
                badge: 'test_badge'
            },
            tier: 'bronze',
            isRepeatable: false
        });
        try {
            await achievement.save();
        } catch (error) {
            if (error.code === 11000) {
                console.log('Achievement already exists, skipping creation');
            } else {
                throw error;
            }
        }
    }

    return testUser;
};

// Helper function to create a test user and get a token
const createTestUserAndGetToken = async (email, password) => {
    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', { email, password });
    if (loginResponse.statusCode !== 200) {
        throw new Error(`Login failed: ${JSON.stringify(loginResponse.body)}`);
    }
    return loginResponse.body.token;
};

// Test user profile
const testUserProfile = async () => {
    const response = await makeRequest(`${BASE_URL}/users/profile`, 'GET', null, token);
    console.log('Get user profile:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

// Test update user profile
const testUpdateUserProfile = async () => {
    const response = await makeRequest(`${BASE_URL}/users/profile`, 'PUT', {
        username: 'updateduser',
        email: 'updateduser@example.com'
    }, token);
    console.log('Update user profile:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

// Test get user habits
const testGetUserHabits = async () => {
    const response = await makeRequest(`${BASE_URL}/users/habits`, 'GET', null, token);
    console.log('Get user habits:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

// Test get user achievements
const testGetUserAchievements = async () => {
    const response = await makeRequest(`${BASE_URL}/users/achievements`, 'GET', null, token);
    console.log('Get User Achievements:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

// Test get user XP and level
const testGetUserXPAndLevel = async () => {
    const response = await makeRequest(`${BASE_URL}/users/xp`, 'GET', null, token);
    console.log('Get user XP and level:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

// Main test function
const runTests = async () => {
    try {
        const testUser = await setupTestData();
        token = await createTestUserAndGetToken(testUser.email, 'testpassword0');
        console.log('Token set:', token); // Add this line for debugging

        await testUserProfile();
        await testUpdateUserProfile();
        await testGetUserHabits();
        await testGetUserAchievements();
        await testGetUserXPAndLevel();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };