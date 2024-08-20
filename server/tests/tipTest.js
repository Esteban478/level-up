import { makeRequest } from '../utils/testUtils.js';
import { User, Tip } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let testTipId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'tipuser',
        email: 'tipuser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'tipuser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    const testTip = new Tip({
        content: 'Test tip',
        category: 'general',
        relatedHabitTypes: ['boolean'],
        difficulty: 'beginner'
    });
    await testTip.save();
    testTipId = testTip._id;
};

const testCreateTip = async () => {
    const tipData = {
        content: "New test tip",
        category: "starting",
        relatedHabitTypes: ["numeric"],
        difficulty: "intermediate"
    };

    const response = await makeRequest(`${BASE_URL}/tips`, 'POST', tipData, token);
    console.log('Create Tip:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testGetAllTips = async () => {
    const response = await makeRequest(`${BASE_URL}/tips`, 'GET', null, token);
    console.log('Get All Tips:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetTipById = async (tipId) => {
    const response = await makeRequest(`${BASE_URL}/tips/${tipId}`, 'GET', null, token);
    console.log('Get Tip by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testUpdateTip = async (tipId) => {
    const updateData = { content: "Updated test tip" };
    const response = await makeRequest(`${BASE_URL}/tips/${tipId}`, 'PUT', updateData, token);
    console.log('Update Tip:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testDeleteTip = async (tipId) => {
    const response = await makeRequest(`${BASE_URL}/tips/${tipId}`, 'DELETE', null, token);
    console.log('Delete Tip:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetRandomTip = async () => {
    const response = await makeRequest(`${BASE_URL}/tips/random`, 'GET');
    console.log('Get Random Tip:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetTipsByCategory = async () => {
    const response = await makeRequest(`${BASE_URL}/tips/category/general`, 'GET');
    console.log('Get Tips by Category:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetTipsByHabitType = async () => {
    const response = await makeRequest(`${BASE_URL}/tips/habitType/boolean`, 'GET');
    console.log('Get Tips by Habit Type:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdTip = await testCreateTip();
        await testGetAllTips();
        await testGetTipById(createdTip._id);
        await testUpdateTip(createdTip._id);
        await testGetRandomTip();
        await testGetTipsByCategory();
        await testGetTipsByHabitType();
        await testDeleteTip(createdTip._id);
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };