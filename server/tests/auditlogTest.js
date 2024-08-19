import { makeRequest } from '../utils/testUtils.js';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

let token;
let userId;

const setupTestData = async () => {
    const testUser = new User({
        username: 'audituser',
        email: 'audituser@example.com',
        password: 'password123'
    });
    await testUser.save();
    userId = testUser._id;

    const loginResponse = await makeRequest(`${BASE_URL}/auth/login`, 'POST', {
        email: 'audituser@example.com',
        password: 'password123'
    });
    token = loginResponse.body.token;
};

const testCreateAuditLog = async () => {
    const auditLogData = {
        action: 'USER_LOGIN',
        details: { ip: '192.168.1.1', browser: 'Chrome' },
        affectedResource: 'USER'
    };

    const response = await makeRequest(`${BASE_URL}/audit`, 'POST', auditLogData, token);
    console.log('Create Audit Log:', response.statusCode === 201 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
    return response.body;
};

const testGetAuditLogs = async () => {
    const response = await makeRequest(`${BASE_URL}/audit`, 'GET', null, token);
    console.log('Get Audit Logs:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetAuditLogById = async (auditLogId) => {
    const response = await makeRequest(`${BASE_URL}/audit/${auditLogId}`, 'GET', null, token);
    console.log('Get Audit Log by ID:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const testGetUserAuditLogs = async () => {
    const response = await makeRequest(`${BASE_URL}/audit/user`, 'GET', null, token);
    console.log('Get User Audit Logs:', response.statusCode === 200 ? 'PASSED' : 'FAILED');
    console.log('Response:', response.body);
};

const runTests = async () => {
    try {
        await setupTestData();
        const createdAuditLog = await testCreateAuditLog();
        await testGetAuditLogs();
        if (createdAuditLog && createdAuditLog._id) {
            await testGetAuditLogById(createdAuditLog._id);
        } else {
            console.log('Skipping Get Audit Log by ID test due to failed creation');
        }
        await testGetUserAuditLogs();
    } catch (error) {
        console.error('An error occurred during testing:', error);
    }
};

export { runTests };