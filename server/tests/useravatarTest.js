import { User } from '../models/index.js';
import dotenv from 'dotenv';
import { makeRequest } from '../utils/testUtils.js';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let token;
let userId;
const BASE_URL = process.env.BASE_URL;

const setupTestData = async () => {
    // Generate a unique email and username for each test run
    const timestamp = Date.now();
    const uniqueEmail = `avataruser_${timestamp}@example.com`;
    const uniqueUsername = `avataruser_${timestamp}`;

    // Delete the user if it already exists
    await User.deleteOne({ $or: [{ email: uniqueEmail }, { username: uniqueUsername }] });

    let testUser = new User({
        username: uniqueUsername,
        email: uniqueEmail,
        password: 'testpassword'
    });
    await testUser.save();

    userId = testUser._id;
    return testUser;
};

const createTestUserAndGetToken = async (usernameOrEmail, password) => {
    try {
        const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', { usernameOrEmail, password });
        if (loginResponse.statusCode !== 200) {
            console.error('Login response:', loginResponse.body);
            throw new Error(`Login failed: ${JSON.stringify(loginResponse.body)}`);
        }
        return loginResponse.body.token;
    } catch (error) {
        console.error('Error in createTestUserAndGetToken:', error);
        throw error;
    }
};

const testGenerateAvatar = async (userId) => {
    const response = await makeRequest(`${BASE_URL}/user-avatars/generate`, 'POST', {
        userId,
        type: 'initials'
    }, token);
    console.log('Generate avatar:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
    return response.body.avatar;
};

const testUploadAvatar = async (userId, filePath, expectedStatus = 200) => {
    const form = new FormData();
    form.append('avatar', fs.createReadStream(filePath));

    return new Promise((resolve, reject) => {
        const req = form.submit({
            protocol: 'http:',
            hostname: 'localhost',
            port: 5001,
            path: '/api/user-avatars/upload',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, (err, res) => {
            if (err) {
                console.error('Error submitting form:', err);
                return reject(err);
            }

            let body = '';
            res.on('data', chunk => body += chunk.toString());
            res.on('end', () => {
                console.log(`Upload avatar (${path.basename(filePath)}):`, res.statusCode === expectedStatus ? 'PASSED' : 'FAILED');
                try {
                    const parsedBody = JSON.parse(body);
                    console.log('Response:', parsedBody);
                    resolve({ statusCode: res.statusCode, body: parsedBody });
                } catch (error) {
                    console.log('Response (raw):', body);
                    resolve({ statusCode: res.statusCode, body });
                }
            });
        });

        req.on('error', (error) => {
            console.error('Request error:', error);
            reject(error);
        });
    });
};

const testGetAvatar = async (userId) => {
    const response = await makeRequest(`${BASE_URL}/user-avatars/${userId}`, 'GET', null, token);
    console.log('Get avatar:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const testDeleteAvatar = async (userId) => {
    const response = await makeRequest(`${BASE_URL}/user-avatars/${userId}`, 'DELETE', null, token);
    console.log('Delete avatar:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    // console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        console.log('Starting tests...');
        const testUser = await setupTestData();
        token = await createTestUserAndGetToken(testUser.email, 'testpassword');

        if (!token) {
            throw new Error('Failed to obtain token');
        }

        await testGenerateAvatar(testUser._id);
        await testGetAvatar(testUser._id);

        const validImagePath = path.join(__dirname, '..', 'test-images', 'valid-avatar.jpg');
        await testUploadAvatar(testUser._id, validImagePath);

        const invalidFilePath = path.join(__dirname, '..', 'test-images', 'invalid-file.txt');
        await testUploadAvatar(testUser._id, invalidFilePath, 400);

        await testGetAvatar(testUser._id);
        await testDeleteAvatar(testUser._id);
        await testGetAvatar(testUser._id);

        console.log('All tests completed.');
    } catch (error) {
        console.error('An error occurred during avatar testing:', error);
    }
};

export { runTests };