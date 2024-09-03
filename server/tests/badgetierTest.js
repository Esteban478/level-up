import { makeRequest } from '../utils/testUtils.js';
import { User, BadgeTier } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    // Clear existing badge tiers
    await BadgeTier.deleteMany({});

    const testUser = new User({
        username: 'badgetieruser',
        email: 'badgetieruser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        usernameOrEmail: 'badgetieruser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create a sample badge tier
    const badgeTier = new BadgeTier({
        tier: 'bronze',
        name: 'Bronze Badge',
        icon: 'bronze_icon.png'
    });
    await badgeTier.save();
};

const testCreateBadgeTier = async () => {
    const badgeTierData = {
        tier: 'silver',
        name: 'Silver Badge',
        icon: 'silver_icon.png'
    };

    const response = await makeRequest(`${BASE_URL}/badgetiers`, 'POST', badgeTierData, token);
    console.log('Create Badge Tier:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 201) {
        console.error('Create Badge Tier failed:', response.body);
    }
    return response.body;
};

const testUpdateBadgeTier = async (badgeTierId) => {
    const updateData = {
        tier: 'gold',
        name: 'Gold Badge',
        icon: 'gold_icon.png'
    };
    const response = await makeRequest(`${BASE_URL}/badgetiers/${badgeTierId}`, 'PUT', updateData, token);
    console.log('Update Badge Tier:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Update Badge Tier failed:', response.body);
    }
};

const testGetBadgeTiers = async () => {
    const response = await makeRequest(`${BASE_URL}/badgetiers`, 'GET', null, token);
    console.log('Get Badge Tiers:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Badge Tiers failed:', response.body);
    }
};

const testGetBadgeTierById = async (badgeTierId) => {
    const response = await makeRequest(`${BASE_URL}/badgetiers/${badgeTierId}`, 'GET', null, token);
    console.log('Get Badge Tier by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Badge Tier by ID failed:', response.body);
    }
};

const testDeleteBadgeTier = async (badgeTierId) => {
    const response = await makeRequest(`${BASE_URL}/badgetiers/${badgeTierId}`, 'DELETE', null, token);
    console.log('Delete Badge Tier:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Delete Badge Tier failed:', response.body);
    }
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdBadgeTier = await testCreateBadgeTier();
        if (createdBadgeTier && createdBadgeTier._id) {
            await testGetBadgeTiers();
            await testGetBadgeTierById(createdBadgeTier._id);
            await testUpdateBadgeTier(createdBadgeTier._id);
            await testDeleteBadgeTier(createdBadgeTier._id);
        } else {
            console.error('Failed to create badge tier, skipping related tests');
        }
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };