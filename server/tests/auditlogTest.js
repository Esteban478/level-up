import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
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
        usernameOrEmail: 'habitloguser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;

    // Create a test habit
    const habitData = {
        name: 'Test Habit',
        description: 'This is a test habit',
        area: 'Health',
        type: 'Boolean',
        frequency: { type: 'Daily' },
        goal: { type: 'At least', value: 1, direction: 'increase' },
        xpReward: { base: 10 }
    };

    const habitResponse = await makeRequest(`${BASE_URL}/habits`, 'POST', habitData, token);
    habitId = habitResponse.body._id;
};

const testCreateAuditLog = async () => {
    const auditLogData = {
        action: 'TEST_ACTION',
        details: { test: 'details' },
        affectedResource: 'TEST_RESOURCE'
    };

    const response = await makeRequest(`${BASE_URL}/auditlogs`, 'POST', auditLogData, token);
    console.log('Create Audit Log:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 201) {
        console.error('Create Audit Log failed:', response.body);
    }
    return response.body;
};

const testGetAuditLogs = async () => {
    const response = await makeRequest(`${BASE_URL}/auditlogs`, 'GET', null, token);
    console.log('Get Audit Logs:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Audit Logs failed:', response.body);
    }
};

const testGetAuditLogById = async (auditLogId) => {
    const response = await makeRequest(`${BASE_URL}/auditlogs/${auditLogId}`, 'GET', null, token);
    console.log('Get Audit Log by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get Audit Log by ID failed:', response.body);
    }
};

const testGetUserAuditLogs = async () => {
    const response = await makeRequest(`${BASE_URL}/auditlogs/user`, 'GET', null, token);
    console.log('Get User Audit Logs:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get User Audit Logs failed:', response.body);
    }
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdAuditLog = await testCreateAuditLog();
        await testGetAuditLogs();
        if (createdAuditLog && createdAuditLog._id) {
            await testGetAuditLogById(createdAuditLog._id);
        }
        await testGetUserAuditLogs();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };