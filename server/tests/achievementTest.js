import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const verifyToken = async (token) => {
    try {
        const response = await makeRequest(`${BASE_URL}/auth/verify-token`, 'GET', null, token);
        return response.statusCode === 200;
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
};

const setupTestData = async () => {
    const testUser = new User({
        username: 'achievementuser',
        email: 'achievementuser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        usernameOrEmail: 'achievementuser@example.com',
        password: 'password123'
    });

    if (loginResponse.statusCode !== 200) {
        console.error('Login failed:', loginResponse.body);
        throw new Error('Login failed');
    }

    token = loginResponse.body.token;

    // Verify that the user ID in the token matches the test user's ID
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload.userId !== userId.toString()) {
        console.error('User ID mismatch:', tokenPayload.userId, userId.toString());
        throw new Error('User ID mismatch');
    }
};

const testCreateAchievement = async () => {
    const achievementData = {
        name: "Test Achievement",
        description: "This is a test achievement",
        type: "Custom",
        category: "General",
        icon: "test_icon",
        condition: { customCondition: { testCondition: true } },
        reward: { xp: 100, badge: "test_badge" },
        tier: "bronze",
        isRepeatable: false
    };

    const response = await makeRequest(`${BASE_URL}/achievements`, 'POST', achievementData, token);
    console.log('Create Achievement:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
    return response.body;
};

const testGetAchievements = async () => {
    const response = await makeRequest(`${BASE_URL}/achievements`, 'GET', null, token);
    console.log('Get Achievements:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testGetAchievementById = async (achievementId) => {
    const response = await makeRequest(`${BASE_URL}/achievements/${achievementId}`, 'GET', null, token);
    console.log('Get Achievement by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testUpdateAchievement = async (achievementId) => {
    const updateData = { description: "Updated test achievement" };
    const response = await makeRequest(`${BASE_URL}/achievements/${achievementId}`, 'PUT', updateData, token);
    console.log('Update Achievement:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testDeleteAchievement = async (achievementId) => {
    const response = await makeRequest(`${BASE_URL}/achievements/${achievementId}`, 'DELETE', null, token);
    console.log('Delete Achievement:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testGetUserAchievements = async () => {
    try {
        const response = await makeRequest(`${BASE_URL}/achievements/user/achievements`, 'GET', null, token);
        console.log('Get User Achievements:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
        if (response.statusCode !== 200) {
            console.error('Get User Achievements failed:', response.body);
        }
        return response.body;
    } catch (error) {
        console.error('Error in Get User Achievements test:', error);
    }
};

const runTests = async () => {
    try {
        await setupTestData();

        if (!await verifyToken(token)) {
            throw new Error('Token verification failed');
        }

        const createdAchievement = await testCreateAchievement();
        await testGetAchievements();
        if (createdAchievement && createdAchievement._id) {
            await testGetAchievementById(createdAchievement._id);
            await testUpdateAchievement(createdAchievement._id);
            await testDeleteAchievement(createdAchievement._id);
        } else {
            console.error('Failed to create achievement, skipping related tests');
        }
        await testGetUserAchievements();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };