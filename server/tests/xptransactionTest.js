import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    // Generate a unique email and username for each test run
    const timestamp = Date.now();
    const uniqueEmail = `xpuser_${timestamp}@example.com`;
    const uniqueUsername = `xpuser_${timestamp}`;

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

    if (loginResponse.statusCode !== 200) {
        console.error('Login failed:', loginResponse.body);
        throw new Error('Login failed');
    }

    token = loginResponse.body.token;
};

const testCreateXPTransaction = async () => {
    const xpTransactionData = {
        amount: 100,
        source: 'Habit_completion'
    };

    const response = await makeRequest(`${BASE_URL}/xp`, 'POST', xpTransactionData, token);
    console.log('Create XP Transaction:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 201) {
        console.error('Create XP Transaction failed:', response.body);
    }
    return response.body;
};

const testGetXPTransactions = async () => {
    const response = await makeRequest(`${BASE_URL}/xp`, 'GET', null, token);
    console.log('Get XP Transactions:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get XP Transactions failed:', response.body);
    }
};

const testGetXPTransactionById = async (xpTransactionId) => {
    const response = await makeRequest(`${BASE_URL}/xp/${xpTransactionId}`, 'GET', null, token);
    console.log('Get XP Transaction by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get XP Transaction by ID failed:', response.body);
    }
};

const testGetUserTotalXP = async () => {
    const response = await makeRequest(`${BASE_URL}/xp/total`, 'GET', null, token);
    console.log('Get User Total XP:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    if (response.statusCode !== 200) {
        console.error('Get User Total XP failed:', response.body);
    }
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdXPTransaction = await testCreateXPTransaction();
        if (createdXPTransaction && createdXPTransaction._id) {
            await testGetXPTransactions();
            await testGetXPTransactionById(createdXPTransaction._id);
            await testGetUserTotalXP();
        } else {
            console.error('Failed to create XP Transaction, skipping related tests');
        }
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };