import { makeRequest } from '../utils/testUtils.js';
import { User, Habit } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let templateHabitId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'habituser',
        email: 'habituser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        usernameOrEmail: 'habituser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create a template habit
    const templateHabit = new Habit({
        habitId: Math.floor(Math.random() * 1000000), // Generate a random habitId
        name: 'Template Habit',
        description: 'This is a template habit',
        area: 'Health',
        type: 'Boolean',
        frequency: { type: 'Daily' },
        goal: { type: 'atLeast', value: 1, direction: 'increase' },
        xpReward: { base: 10 },
        isTemplate: true,
        isPublic: true
    });
    await templateHabit.save();
    templateHabitId = templateHabit._id;
};

const testCreateCustomHabit = async () => {
    const habitData = {
        habitId: Math.floor(Math.random() * 1000000), // Generate a random habitId
        name: 'Custom Habit',
        description: 'This is a custom habit',
        area: 'Fitness',
        type: 'Numeric',
        frequency: { type: 'Weekly', daysOfWeek: [1, 3, 5] },
        goal: { type: 'atLeast', value: 30, unit: 'minutes', direction: 'increase' },
        xpReward: { base: 20 },
        isPublic: false
    };

    const response = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    console.log('Create Custom Habit:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
    return response.body;
};

const testCreateHabitFromTemplate = async () => {
    const habitData = {
        habitId: Math.floor(Math.random() * 1000000), // Generate a random habitId
        templateId: templateHabitId,
        customizations: {
            frequency: { type: 'Weekly', daysOfWeek: [2, 4, 6] },
            goal: { type: 'atLeast', value: 2, direction: 'increase' },
            isPublic: false
        }
    };

    const response = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    console.log('Create Habit from Template:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
    return response.body;
};

const testGetHabits = async () => {
    const response = await makeRequest(`${BASE_URL}/habits`, 'GET', null, token);
    console.log('Get Habits:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode === 200) {
        console.log('User Habits:', response.body.userHabits.length);
        console.log('Template Habits:', response.body.templateHabits.length);
    } else {
        // console.log('Response:', response.body);
    }
};

const testUpdateCustomHabit = async (habitId) => {
    const updateData = {
        name: 'Updated Custom Habit',
        customizations: {
            frequency: { type: 'Daily' },
            goal: { type: 'atLeast', value: 1, direction: 'increase' },
            isPublic: true
        }
    };
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'PUT', updateData, token);
    console.log('Update Custom Habit:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testGetHabitById = async (habitId) => {
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'GET', null, token);
    console.log('Get Habit by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
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
        const createdCustomHabit = await testCreateCustomHabit();
        const createdHabitFromTemplate = await testCreateHabitFromTemplate();
        await testGetHabits();
        if (createdCustomHabit && createdCustomHabit._id) {
            await testGetHabitById(createdCustomHabit._id);
            await testUpdateCustomHabit(createdCustomHabit._id);
            await testDeleteHabit(createdCustomHabit._id);
        } else {
            console.log('Failed to create custom habit, skipping related tests');
        }
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };