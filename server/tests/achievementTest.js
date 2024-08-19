import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'achievementuser',
        email: 'achievementuser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'achievementuser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;
};

const testCreateAchievement = async () => {
    const achievementData = {
        name: "Test Achievement",
        description: "This is a test achievement",
        type: "custom",
        category: "general",
        icon: "test_icon",
        condition: { customCondition: { testCondition: true } },
        reward: { xp: 100, badge: "test_badge" },
        tier: "bronze",
        isRepeatable: false
    };

    const response = await makeRequest(`${BASE_URL}/achievements`, 'POST', achievementData, token);
    console.log('Create Achievement:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testGetAchievements = async () => {
    const response = await makeRequest(`${BASE_URL}/achievements`, 'GET', null, token);
    console.log('Get Achievements:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetAchievementById = async (achievementId) => {
    const response = await makeRequest(`${BASE_URL}/achievements/${achievementId}`, 'GET', null, token);
    console.log('Get Achievement by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testUpdateAchievement = async (achievementId) => {
    const updateData = { description: "Updated test achievement" };
    const response = await makeRequest(`${BASE_URL}/achievements/${achievementId}`, 'PUT', updateData, token);
    console.log('Update Achievement:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testDeleteAchievement = async (achievementId) => {
    const response = await makeRequest(`${BASE_URL}/achievements/${achievementId}`, 'DELETE', null, token);
    console.log('Delete Achievement:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetUserAchievements = async () => {
    const response = await makeRequest(`${BASE_URL}/achievements/user/achievements`, 'GET', null, token);
    console.log('Get User Achievements:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdAchievement = await testCreateAchievement();
        await testGetAchievements();
        await testGetAchievementById(createdAchievement._id);
        await testUpdateAchievement(createdAchievement._id);
        await testGetUserAchievements();
        await testDeleteAchievement(createdAchievement._id);
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };