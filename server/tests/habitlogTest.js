import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let habitId;

const setupTestData = async () => {
    // Generate unique email and username for each test run
    const timestamp = Date.now();
    const uniqueEmail = `habitloguser_${timestamp}@example.com`;
    const uniqueUsername = `habitloguser_${timestamp}`;

    // Delete the user if it already exists (by email or username)
    await User.deleteOne({ $or: [{ email: uniqueEmail }, { username: uniqueUsername }] });

    const testUser = new User({
        username: uniqueUsername,
        email: uniqueEmail,
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: uniqueEmail,
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create a test habit
    const habitData = {
        habitId: 1,
        name: 'Test Habit',
        description: 'This is a test habit',
        area: 'Health',
        type: 'Boolean',
        frequency: { type: 'Daily' },
        goal: { type: 'atLeast', value: 1, direction: 'increase' },
        xpReward: { base: 10 }
    };

    const habitResponse = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    habitId = habitResponse.body._id;
};

const testCreateHabitLog = async () => {
    const habitLogData = {
        habitId,
        date: new Date().toISOString(),
        value: true
    };

    const response = await makeRequest(`${BASE_URL}/habitlogs`, 'POST', habitLogData, token);
    console.log('Create HabitLog:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
    return response.body;
};

const testGetHabitLogs = async () => {
    const response = await makeRequest(`${BASE_URL}/habitlogs`, 'GET', null, token);
    console.log('Get HabitLogs:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testGetHabitLogById = async (habitLogId) => {
    const response = await makeRequest(`${BASE_URL}/habitlogs/${habitLogId}`, 'GET', null, token);
    console.log('Get HabitLog by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testUpdateHabitLog = async (habitLogId) => {
    const updateData = { value: false };
    const response = await makeRequest(`${BASE_URL}/habitlogs/${habitLogId}`, 'PUT', updateData, token);
    console.log('Update HabitLog:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testDeleteHabitLog = async (habitLogId) => {
    const response = await makeRequest(`${BASE_URL}/habitlogs/${habitLogId}`, 'DELETE', null, token);
    console.log('Delete HabitLog:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdHabitLog = await testCreateHabitLog();
        await testGetHabitLogs();
        await testGetHabitLogById(createdHabitLog._id);
        await testUpdateHabitLog(createdHabitLog._id);
        await testDeleteHabitLog(createdHabitLog._id);
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };