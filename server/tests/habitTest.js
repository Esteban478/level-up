import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'habituser',
        email: 'habituser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'habituser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;
};

const testCreateHabit = async () => {
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

    const response = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    console.log('Create Habit:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
    return response.body;
};

const testGetHabits = async () => {
    const response = await makeRequest(`${BASE_URL}/habits`, 'GET', null, token);
    console.log('Get Habits:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testGetHabitById = async (habitId) => {
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'GET', null, token);
    console.log('Get Habit by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testUpdateHabit = async (habitId) => {
    const updateData = { name: 'Updated Test Habit' };
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'PUT', updateData, token);
    console.log('Update Habit:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testDeleteHabit = async (habitId) => {
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'DELETE', null, token);
    console.log('Delete Habit:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdHabit = await testCreateHabit();
        await testGetHabits();
        await testGetHabitById(createdHabit._id);
        await testUpdateHabit(createdHabit._id);
        await testDeleteHabit(createdHabit._id);
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };