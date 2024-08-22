import { connectDB, makeRequest } from '../utils/testUtils.js';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;

// Test user registration
const testUserRegistration = async () => {
    const testCases = [
        {
            name: 'Valid registration',
            data: {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'testpassword',
            },
            expectedStatus: 201,
        },
        {
            name: 'Invalid email format',
            data: {
                username: 'testuser2',
                email: 'notanemail',
                password: 'testpassword123',
            },
            expectedStatus: 400,
        },
        {
            name: 'Empty password',
            data: {
                username: 'testuser3',
                email: 'testuser3@example.com',
                password: '',
            },
            expectedStatus: 400,
        },
        {
            name: 'Short password',
            data: {
                username: 'testuser4',
                email: 'testuser4@example.com',
                password: 'short',
            },
            expectedStatus: 400,
        },
        {
            name: 'Missing username',
            data: {
                email: 'testuser5@example.com',
                password: 'testpassword123',
            },
            expectedStatus: 400,
        },
        {
            name: 'Username already exists',
            data: {
                username: 'testuser',
                email: 'testuser5@example.com',
                password: 'testpassword123',
            },
            expectedStatus: 400,
        }
    ];

    for (const testCase of testCases) {
        try {
            const response = await makeRequest(`${BASE_URL}/auth/register`, 'POST', testCase.data);
            if (response.statusCode === testCase.expectedStatus) {
                console.log(`${testCase.name}: PASSED`);
            } else {
                console.log(`${testCase.name}: FAILED - Expected ${testCase.expectedStatus}, got ${response.statusCode}`);
            }
            // console.log('Response:', response.body);
        } catch (error) {
            console.error(`${testCase.name}: ERROR - ${error.message}`);
        }
    }
};

// Test user login
const testUserLogin = async () => {
    const testCases = [
        {
            name: 'Valid login',
            data: {
                email: 'testuser@example.com',
                password: 'testpassword',
            },
            expectedStatus: 200,
        },
        {
            name: 'Invalid email',
            data: {
                email: 'nonexistent@example.com',
                password: 'testpassword',
            },
            expectedStatus: 401,
        },
        {
            name: 'Wrong password',
            data: {
                email: 'testuser@example.com',
                password: 'wrongpassword',
            },
            expectedStatus: 401,
        },
    ];

    for (const testCase of testCases) {
        try {
            const response = await makeRequest(`${BASE_URL}/auth/login`, 'POST', testCase.data);
            if (response.statusCode === testCase.expectedStatus) {
                console.log(`${testCase.name}: PASSED`);
            } else {
                console.log(`${testCase.name}: FAILED - Expected ${testCase.expectedStatus}, got ${response.statusCode}`);
            }
            // console.log('Response:', response.body);
        } catch (error) {
            console.error(`${testCase.name}: ERROR - ${error.message}`);
        }
    }
};

// Main test function
const runTests = async () => {
    try {
        await connectDB();
        await testUserRegistration();
        await testUserLogin();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };