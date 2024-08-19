import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'xpuser',
        email: 'xpuser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'xpuser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;
};

const testCreateXPTransaction = async () => {
    const xpTransactionData = {
        amount: 100,
        reason: 'habit_completion'
    };

    const response = await makeRequest(`${BASE_URL}/xp`, 'POST', xpTransactionData, token);
    console.log('Create XP Transaction:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testGetXPTransactions = async () => {
    const response = await makeRequest(`${BASE_URL}/xp`, 'GET', null, token);
    console.log('Get XP Transactions:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetXPTransactionById = async (xpTransactionId) => {
    const response = await makeRequest(`${BASE_URL}/xp/${xpTransactionId}`, 'GET', null, token);
    console.log('Get XP Transaction by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetUserTotalXP = async () => {
    const response = await makeRequest(`${BASE_URL}/xp/total`, 'GET', null, token);
    console.log('Get User Total XP:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdXPTransaction = await testCreateXPTransaction();
        await testGetXPTransactions();
        await testGetXPTransactionById(createdXPTransaction._id);
        await testGetUserTotalXP();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };