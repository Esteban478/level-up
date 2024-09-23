import http from 'http';
import https from 'https';
import { URL } from 'url';
import mongoose from 'mongoose';
import { User, Habit, Achievement, Tip, LevelThreshold, BadgeTier, XpTransaction, HabitLog, AuditLog, UserAchievement } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();
import { createAvatar } from '@dicebear/core';
import * as initials from '@dicebear/initials';
import UserAvatar from '../models/UserAvatar.js';

// Connect to database
export const connectDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        console.log('Database already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

// Make HTTP requests
export const makeRequest = (url, method, data = null, token = null) => {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            method: method,
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
        };

        const req = (parsedUrl.protocol === 'https:' ? https : http).request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk.toString());
            res.on('end', () => {
                try {
                    resolve({
                        statusCode: res.statusCode,
                        body: body ? JSON.parse(body) : {}
                    });
                } catch (error) {
                    reject(new Error(`Failed to parse response body: ${body}`));
                }
            });
        });

        req.on('error', (error) => reject(error));

        if (data) {
            req.write(typeof data === 'string' ? data : JSON.stringify(data));
        }
        req.end();
    });
};

// Clean up the database
export const cleanupDatabase = async () => {
    if (mongoose.connection.readyState !== 1) {
        console.log('Database not connected. Skipping cleanup.');
        return;
    }
    try {
        const deletionResults = await Promise.all([
            User.deleteMany({}),
            Habit.deleteMany({}),
            HabitLog.deleteMany({}),
            Achievement.deleteMany({}),
            Tip.deleteMany({}),
            LevelThreshold.deleteMany({}),
            BadgeTier.deleteMany({}),
            XpTransaction.deleteMany({}),
            UserAchievement.deleteMany({})
        ]);

        const collectionNames = ['User', 'Habit', 'HabitLog', 'Achievement', 'Tip', 'LevelThreshold', 'BadgeTier', 'XPTransaction', 'UserAchievement'];
        deletionResults.forEach((result, index) => {
            console.log(`${collectionNames[index]} documents deleted: ${result.deletedCount}`);
        });

        console.log('Database cleaned');
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
};

export const generateAvatarForSeed = async (userId, username) => {
    const avatar = createAvatar(initials, {
        seed: username,
        // Add more options as needed
    });

    const dataUri = avatar.toDataUri();

    const userAvatar = new UserAvatar({
        userId,
        imageUrl: dataUri,
        avatarType: 'placeholder'
    });

    await userAvatar.save();

    return userAvatar._id;
};