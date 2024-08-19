import mongoose from 'mongoose';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const dropUsers = async () => {
    try {
        await User.deleteMany({});
        console.log('Database cleaned: All users removed');
    } catch (error) {
        console.error('Error cleaning database:', error);
    } finally {
        await mongoose.disconnect();
    }
};

dropUsers();