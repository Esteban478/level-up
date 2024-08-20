import { makeRequest } from '../utils/testUtils.js';
import { User, BadgeTier, Achievement } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let achievementId;

const setupTestData = async () => {
    // Clear existing badge tiers and achievements
    await BadgeTier.deleteMany({});
    await Achievement.deleteMany({});

    const testUser = new User({
        username: 'badgetieruser',
        email: 'badgetieruser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'badgetieruser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create a sample achievement
    const achievement = await Achievement.create({
        name: 'Test Achievement',
        description: 'This is a test achievement',
        type: 'custom',
        category: 'general',
        condition: { customCondition: 'test' },
        reward: { xp: 100 },
        tier: 'gold'
    });
    achievementId = achievement._id;
};

const testCreateBadgeTier = async () => {
    const badgeTierData = {
        achievementId,
        tier: 'bronze',
        name: 'Bronze Badge',
        icon: 'bronze_icon.png',
        condition: { count: 1 }
    };

    const response = await makeRequest(`${BASE_URL}/badgetiers`, 'POST', badgeTierData, token);
    console.log('Create Badge Tier:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testUpdateBadgeTier = async (badgeTierId) => {
    const updateData = {
        tier: 'silver',
        name: 'Silver Badge',
        icon: 'silver_icon.png',
        condition: { count: 5 }
    };
    const response = await makeRequest(`${BASE_URL}/badgetiers/${badgeTierId}`, 'PUT', updateData, token);
    console.log('Update Badge Tier:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetBadgeTiers = async () => {
    const response = await makeRequest(`${BASE_URL}/badgetiers`, 'GET', null, token);
    console.log('Get Badge Tiers:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetBadgeTierById = async (badgeTierId) => {
    const response = await makeRequest(`${BASE_URL}/badgetiers/${badgeTierId}`, 'GET', null, token);
    console.log('Get Badge Tier by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testDeleteBadgeTier = async (badgeTierId) => {
    const response = await makeRequest(`${BASE_URL}/badgetiers/${badgeTierId}`, 'DELETE', null, token);
    console.log('Delete Badge Tier:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdBadgeTier = await testCreateBadgeTier();
        await testGetBadgeTiers();
        await testGetBadgeTierById(createdBadgeTier._id);
        await testUpdateBadgeTier(createdBadgeTier._id);
        await testDeleteBadgeTier(createdBadgeTier._id);
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };