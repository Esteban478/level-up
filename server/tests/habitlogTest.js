import { makeRequest } from '../utils/testUtils.js';
import { User, Habit } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let habitId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'habitloguser',
        email: 'habitloguser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'habitloguser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    const habit = new Habit({
        userId,
        name: 'Test Habit',
        type: 'boolean',
        frequency: { type: 'daily' },
        goal: { type: 'atleast', value: 1 }
    });
    await habit.save();
    habitId = habit._id;
};

const testCreateHabitLog = async () => {
    const habitLogData = {
        habitId,
        date: new Date().toISOString(),
        value: true
    };

    const response = await makeRequest(`${BASE_URL}/habitlogs`, 'POST', habitLogData, token);
    console.log('Create HabitLog:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testGetHabitLogs = async () => {
    const response = await makeRequest(`${BASE_URL}/habitlogs`, 'GET', null, token);
    console.log('Get HabitLogs:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetHabitLogById = async (habitLogId) => {
    const response = await makeRequest(`${BASE_URL}/habitlogs/${habitLogId}`, 'GET', null, token);
    console.log('Get HabitLog by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testUpdateHabitLog = async (habitLogId) => {
    const updateData = { value: false };
    const response = await makeRequest(`${BASE_URL}/habitlogs/${habitLogId}`, 'PUT', updateData, token);
    console.log('Update HabitLog:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testDeleteHabitLog = async (habitLogId) => {
    const response = await makeRequest(`${BASE_URL}/habitlogs/${habitLogId}`, 'DELETE', null, token);
    console.log('Delete HabitLog:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
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