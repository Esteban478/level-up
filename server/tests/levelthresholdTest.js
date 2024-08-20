import { makeRequest } from '../utils/testUtils.js';
import { User, LevelThreshold, Achievement } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    // Clear existing level thresholds and achievements
    await LevelThreshold.deleteMany({});
    await Achievement.deleteMany({});

    const testUser = new User({
        username: 'leveluser',
        email: 'leveluser@example.com',
        password: 'password123',
        totalXp: 1500
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'leveluser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create sample achievements
    const achievement1 = await Achievement.create({
        name: 'Novice',
        description: 'Reached level 1',
        type: 'level',
        category: 'general',
        condition: { level: 1 },
        reward: { xp: 10 },
        tier: 'bronze'
    });

    const achievement2 = await Achievement.create({
        name: 'Apprentice',
        description: 'Reached level 2',
        type: 'level',
        category: 'general',
        condition: { level: 2 },
        reward: { xp: 20 },
        tier: 'silver'
    });

    // Create some level thresholds
    await LevelThreshold.create({
        level: 1,
        xpRequired: 0,
        totalXpRequired: 0,
        rewards: { xpBoost: 0, achievementId: achievement1._id },
        featureUnlock: 'Basic Habits'
    });
    await LevelThreshold.create({
        level: 2,
        xpRequired: 1000,
        totalXpRequired: 1000,
        rewards: { xpBoost: 1.05, achievementId: achievement2._id },
        featureUnlock: 'Habit Streaks'
    });
};

const testCreateLevelThreshold = async () => {
    const achievement = await Achievement.create({
        name: 'Expert',
        description: 'Reached level 4',
        type: 'level',
        category: 'general',
        condition: { level: 4 },
        reward: { xp: 40 },
        tier: 'gold'
    });

    const levelThresholdData = {
        level: 4,
        xpRequired: 3000,
        totalXpRequired: 6000,
        rewards: { xpBoost: 1.15, achievementId: achievement._id },
        featureUnlock: 'Social Challenges'
    };

    const response = await makeRequest(`${BASE_URL}/levels`, 'POST', levelThresholdData, token);
    console.log('Create Level Threshold:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testUpdateLevelThreshold = async (levelThresholdId) => {
    const achievement = await Achievement.create({
        name: 'Master',
        description: 'Reached level 4 (updated)',
        type: 'level',
        category: 'general',
        condition: { level: 4 },
        reward: { xp: 50 },
        tier: 'platinum'
    });

    const updateData = {
        xpRequired: 3500,
        totalXpRequired: 6500,
        rewards: { xpBoost: 1.2, achievementId: achievement._id },
        featureUnlock: 'Advanced Analytics'
    };
    const response = await makeRequest(`${BASE_URL}/levels/${levelThresholdId}`, 'PUT', updateData, token);
    console.log('Update Level Threshold:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetLevelThresholds = async () => {
    const response = await makeRequest(`${BASE_URL}/levels`, 'GET', null, token);
    console.log('Get Level Thresholds:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetLevelThresholdById = async (levelThresholdId) => {
    const response = await makeRequest(`${BASE_URL}/levels/${levelThresholdId}`, 'GET', null, token);
    console.log('Get Level Threshold by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testDeleteLevelThreshold = async (levelThresholdId) => {
    const response = await makeRequest(`${BASE_URL}/levels/${levelThresholdId}`, 'DELETE', null, token);
    console.log('Delete Level Threshold:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetCurrentLevel = async () => {
    const response = await makeRequest(`${BASE_URL}/levels/user/current`, 'GET', null, token);
    console.log('Get Current Level:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdLevelThreshold = await testCreateLevelThreshold();
        await testGetLevelThresholds();
        await testGetLevelThresholdById(createdLevelThreshold._id);
        await testUpdateLevelThreshold(createdLevelThreshold._id);
        await testGetCurrentLevel();
        await testDeleteLevelThreshold(createdLevelThreshold._id);
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };