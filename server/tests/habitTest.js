import { makeRequest } from '../utils/testUtils.js';
import { User, Habit } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;
let templateHabitId;
let customHabitId;
let habitFromTemplateId;

const setupTestData = async () => {
    // Generate a unique email and username for each test run
    const timestamp = Date.now();
    const uniqueEmail = `habituser_${timestamp}@example.com`;
    const uniqueUsername = `habituser_${timestamp}`;

    // Delete the user if it already exists
    await User.deleteOne({ $or: [{ email: uniqueEmail }, { username: uniqueUsername }] });

    const testUser = new User({
        username: uniqueUsername,
        email: uniqueEmail,
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        usernameOrEmail: uniqueEmail,
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create a template habit
    const templateHabit = new Habit({
        habitId: Math.floor(Math.random() * 1000000),
        name: 'Template Habit',
        description: 'This is a template habit',
        area: 'Health',
        type: 'Boolean',
        frequency: { type: 'Daily' },
        goal: { type: 'At least', value: 1, direction: 'increase' },
        xpReward: { base: 10 },
        isTemplate: true,
        isPublic: true
    });
    await templateHabit.save();
    templateHabitId = templateHabit._id;
};

const testCreateCustomHabit = async () => {
    const habitData = {
        habitId: Math.floor(Math.random() * 1000000),
        name: 'Custom Habit',
        description: 'This is a custom habit',
        area: 'Fitness',
        type: 'Numeric',
        frequency: { type: 'Weekly', daysOfWeek: [1, 3, 5] },
        goal: { type: 'At least', value: 30, unit: 'minutes', direction: 'increase' },
        xpReward: { base: 20 },
        isPublic: false
    };

    const response = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    console.log('Create Custom Habit:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 201) {
        console.error('Create Custom Habit failed:', response.body);
    }
    customHabitId = response.body._id;
    return response.body;
};

const testCreateHabitFromTemplate = async () => {
    const habitData = {
        habitId: Math.floor(Math.random() * 1000000),
        templateId: templateHabitId,
        customizations: {
            frequency: { type: 'Weekly', daysOfWeek: [2, 4, 6] },
            goal: { type: 'At least', value: 2, direction: 'increase' },
            isPublic: false
        }
    };

    const response = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    console.log('Create Habit from Template:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 201) {
        console.error('Create Habit from Template failed:', response.body);
    }
    habitFromTemplateId = response.body._id;
    return response.body;
};

const testGetHabits = async () => {
    const response = await makeRequest(`${BASE_URL}/habits`, 'GET', null, token);
    console.log('Get Habits:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode === 200) {
        if (Array.isArray(response.body)) {
            console.log('Number of Habits:', response.body.length);
        } else if (typeof response.body === 'object' && response.body !== null) {
            console.log('Response structure:', Object.keys(response.body));
        } else {
            console.log('Unexpected response structure:', response.body);
        }
    } else {
        console.error('Get Habits failed:', response.body);
    }
};

const testUpdateCustomHabit = async (habitId) => {
    const updateData = {
        name: 'Updated Custom Habit',
        customizations: {
            frequency: { type: 'Daily' },
            goal: { type: 'At least', value: 1, direction: 'increase' },
            isPublic: true
        }
    };
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'PUT', updateData, token);
    console.log('Update Custom Habit:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Update Custom Habit failed:', response.body);
    }
};

const testGetHabitById = async (habitId) => {
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'GET', null, token);
    console.log('Get Habit by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Habit by ID failed:', response.body);
    }
};

const testArchiveHabit = async (habitId) => {
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}/archive`, 'PUT', null, token);
    console.log('Archive Habit:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Archive Habit failed:', response.body);
    }
};

const testGetArchivedHabits = async () => {
    const response = await makeRequest(`${BASE_URL}/habits/archived`, 'GET', null, token);
    console.log('Get Archived Habits:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Archived Habits failed:', response.body);
        return;
    }

    const archivedHabits = response.body;
    if (Array.isArray(archivedHabits)) {
        console.log('Number of Archived Habits:', archivedHabits.length);
        console.log('Archived habit found:', archivedHabits.some(h => h._id === customHabitId) ? 'PASSED' : 'FAILED');
    } else {
        console.error('Unexpected response structure for archived habits:', archivedHabits);
    }
};

const testGetHabitsExcludeArchived = async () => {
    const response = await makeRequest(`${BASE_URL}/habits?includeArchived=false`, 'GET', null, token);
    console.log('Get Habits Exclude Archived:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Habits Exclude Archived failed:', response.body);
    }
    // Check if the archived habit is not in the response
    const habits = response.body;
    console.log('Archived habit not found in active habits:', !habits.some(h => h._id === customHabitId) ? 'PASSED' : 'FAILED');
};

const testDeleteHabit = async (habitId) => {
    const response = await makeRequest(`${BASE_URL}/habits/${habitId}`, 'DELETE', null, token);
    console.log('Delete Habit:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Delete Habit failed:', response.body);
    }
};

const runTests = async () => {
    try {
        await setupTestData();
        await testCreateCustomHabit();
        await testCreateHabitFromTemplate();
        await testGetHabits();
        if (customHabitId) {
            await testGetHabitById(customHabitId);
            await testUpdateCustomHabit(customHabitId);
            await testArchiveHabit(customHabitId);
            await testGetArchivedHabits();
            await testGetHabitsExcludeArchived();
            await testDeleteHabit(customHabitId);
        } else {
            console.error('Failed to create custom habit, skipping related tests');
        }
        if (habitFromTemplateId) {
            await testDeleteHabit(habitFromTemplateId);
        }
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };