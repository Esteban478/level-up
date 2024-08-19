import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, cleanupDatabase } from './utils/testUtils.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runTests = async () => {
    try {
        await connectDB();
        await cleanupDatabase(); // Clean once at the start

        const testDir = path.join(__dirname, 'tests');
        const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('Test.js'));

        for (const file of testFiles) {
            console.log(`\nRunning tests in ${file}...`);
            const testModule = await import(path.join(testDir, file));
            if (typeof testModule.runTests === 'function') {
                await testModule.runTests();
            } else {
                console.log(`No runTests function found in ${file}`);
            }
        }
    } catch (error) {
        console.error('An error occurred during testing:', error);
    } finally {
        await cleanupDatabase();
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

runTests();