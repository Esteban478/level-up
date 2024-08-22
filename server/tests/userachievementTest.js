import { makeRequest } from '../utils/testUtils.js';
import { User, Achievement, UserAchievement } from '../models/index.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let achievementId;
let userAchievementId;

const setupTestData = async () => {
    // Clear existing data
    await User.deleteMany({});
    await Achievement.deleteMany({});
    await UserAchievement.deleteMany({});

    // Create a test user
    const testUser = new User({
        username: 'achievementuser',
        email: 'achievementuser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    // Create a token manually
    token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create a test achievement
    const testAchievement = new Achievement({
        name: "Test Achievement",
        description: "This is a test achievement",
        type: "Custom",
        category: "General",
        tier: "bronze"
    });
    await testAchievement.save();
    achievementId = testAchievement._id;
};

const testCreateUserAchievement = async () => {
    const response = await makeRequest(`${BASE_URL}/user-achievements`, 'POST', { achievementId }, token);
    console.log('Create User Achievement:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    userAchievementId = response.body._id;
};

const testGetUserAchievements = async () => {
    const response = await makeRequest(`${BASE_URL}/user-achievements`, 'GET', null, token);
    console.log('Get User Achievements:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testDeleteUserAchievement = async () => {
    if (!userAchievementId) {
        console.log('Delete User Achievement: SKIPPED (No achievement to delete)');
        return;
    }
    const response = await makeRequest(`${BASE_URL}/user-achievements/${userAchievementId}`, 'DELETE', null, token);
    console.log('Delete User Achievement:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        await testCreateUserAchievement();
        await testGetUserAchievements();
        await testDeleteUserAchievement();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };