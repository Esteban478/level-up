import { makeRequest } from '../utils/testUtils.js';
import { User, Tip } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let testTipId;

const setupTestData = async () => {
    await Tip.deleteMany({}); // Clear existing tips

    const testUser = new User({
        username: 'tipuser',
        email: 'tipuser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        usernameOrEmail: 'tipuser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    const testTip = new Tip({
        content: 'Test tip',
        category: 'General',
        relatedAreas: ['All'],
        difficulty: 'Beginner'
    });
    await testTip.save();
    testTipId = testTip._id;
};

const testCreateTip = async () => {
    const tipData = {
        content: 'New test tip',
        category: 'Habit Loop - Cue',
        relatedAreas: ['All'],
        difficulty: 'Intermediate'
    };

    const response = await makeRequest(`${BASE_URL}/tips`, 'POST', tipData, token);
    console.log('Create Tip:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 201) {
        console.error('Create Tip failed:', response.body);
    }
    return response.body;
};

const testGetAllTips = async () => {
    const response = await makeRequest(`${BASE_URL}/tips`, 'GET', null, token);
    console.log('Get All Tips:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get All Tips failed:', response.body);
    }
};

const testGetTipById = async (tipId) => {
    const response = await makeRequest(`${BASE_URL}/tips/${tipId}`, 'GET', null, token);
    console.log('Get Tip by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Tip by ID failed:', response.body);
    }
};

const testUpdateTip = async (tipId) => {
    const updateData = { content: "Updated test tip", category: 'Habit-Specific' };
    const response = await makeRequest(`${BASE_URL}/tips/${tipId}`, 'PUT', updateData, token);
    console.log('Update Tip:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Update Tip failed:', response.body);
    }
};

const testDeleteTip = async (tipId) => {
    const response = await makeRequest(`${BASE_URL}/tips/${tipId}`, 'DELETE', null, token);
    console.log('Delete Tip:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Delete Tip failed:', response.body);
    }
};

const testGetRandomTip = async () => {
    const response = await makeRequest(`${BASE_URL}/tips/random`, 'GET');
    console.log('Get Random Tip:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Random Tip failed:', response.body);
    }
};

const testGetTipsByCategory = async () => {
    const response = await makeRequest(`${BASE_URL}/tips/category/General`, 'GET');
    console.log('Get Tips by Category:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Tips by Category failed:', response.body);
    }
};

const testGetTipsByRelatedAreas = async () => {
    const response = await makeRequest(`${BASE_URL}/tips/relatedAreas/All`, 'GET');
    console.log('Get Tips by Related Areas:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Tips by Related Areas failed:', response.body);
    }
};

const runTests = async () => {
    try {
        await setupTestData();

        // Test unprotected routes first
        await testGetRandomTip();
        await testGetTipsByCategory();
        await testGetTipsByRelatedAreas();

        // Then test protected routes
        const createdTip = await testCreateTip();
        if (createdTip && createdTip._id) {
            await testGetAllTips();
            await testGetTipById(createdTip._id);
            await testUpdateTip(createdTip._id);
            await testDeleteTip(createdTip._id);
        } else {
            console.error('Failed to create Tip, skipping related tests');
        }
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };