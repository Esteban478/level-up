import { createAvatar } from '@dicebear/core';
import * as initials from '@dicebear/initials';
import * as adventurer from '@dicebear/adventurer';
import cloudinary from '../config/cloudinary.js';
import UserAvatar from '../models/UserAvatar.js';
import User from '../models/User.js';
import LevelThreshold from '../models/LevelThreshold.js';
import path from 'path';
import sharp from 'sharp';

// Helper function to check if user has unlocked avatar customization
const hasUnlockedAvatarCustomization = async (userId) => {
    const user = await User.findById(userId);
    const levelThreshold = await LevelThreshold.findOne({ level: user.level });
    // return levelThreshold && levelThreshold.featureUnlock.includes('avatar');
    return true
};

export const generateAvatar = async (req, res) => {
    try {
        const { userId, type, isInitialCreation } = req.body;

        let user;
        if (!isInitialCreation) {
            if (!await hasUnlockedAvatarCustomization(userId)) {
                return res.status(403).json({ message: "Avatar customization not unlocked yet" });
            }

            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        } else {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        const collection = type === 'initials' ? initials : adventurer;
        const avatar = createAvatar(collection, {
            seed: user.username,
            // Add more options as needed
        });

        const dataUri = avatar.toDataUri();

        // Save or update UserAvatar
        let userAvatar = await UserAvatar.findOne({ userId });
        if (userAvatar) {
            userAvatar.imageUrl = dataUri;
            userAvatar.avatarType = type === 'initials' ? 'placeholder' : 'generated';
        } else {
            userAvatar = new UserAvatar({
                userId,
                imageUrl: dataUri,
                avatarType: type === 'initials' ? 'placeholder' : 'generated'
            });
        }
        await userAvatar.save();

        // Update User model
        user.avatar = userAvatar._id;
        await user.save();

        if (res) {
            res.status(200).json({ avatar: userAvatar });
        } else {
            return userAvatar;
        }
    } catch (error) {
        console.error('Error generating avatar:', error);
        if (res) {
            res.status(500).json({ message: "Error generating avatar" });
        } else {
            throw error;
        }
    }
};

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: "User ID not found in request" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `user_avatars/${userId}`,
            public_id: `avatar_${Date.now()}`,
        });

        let userAvatar = await UserAvatar.findOne({ userId });
        if (userAvatar) {
            // Delete old image from Cloudinary if it exists
            if (userAvatar.imageUrl && !userAvatar.imageUrl.startsWith('data:')) {
                const publicId = userAvatar.imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            userAvatar.imageUrl = result.secure_url;
            userAvatar.avatarType = 'custom';
        } else {
            userAvatar = new UserAvatar({
                userId,
                imageUrl: result.secure_url,
                avatarType: 'custom'
            });
        }
        await userAvatar.save();

        // Update User model
        await User.findByIdAndUpdate(userId, { avatar: userAvatar._id });

        res.status(200).json({ message: "Avatar uploaded successfully", avatar: userAvatar });
    } catch (error) {
        console.error('Error in uploadAvatar:', error);
        res.status(500).json({ message: "Error uploading avatar", error: error.message });
    }
};

export const getAvatar = async (req, res) => {
    try {
        const { userId } = req.params;
        const userAvatar = await UserAvatar.findOne({ userId });
        if (!userAvatar) {
            return res.status(404).json({ message: "Avatar not found" });
        }
        res.status(200).json({ avatar: userAvatar });
    } catch (error) {
        console.error('Error getting avatar:', error);
        res.status(500).json({ message: "Error retrieving avatar" });
    }
};

export const deleteAvatar = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!await hasUnlockedAvatarCustomization(userId)) {
            return res.status(403).json({ message: "Avatar customization not unlocked yet" });
        }

        const userAvatar = await UserAvatar.findOne({ userId });
        if (!userAvatar) {
            return res.status(404).json({ message: "Avatar not found" });
        }

        // Delete from Cloudinary if it's a custom avatar
        if (userAvatar.avatarType === 'custom' && !userAvatar.imageUrl.startsWith('data:')) {
            const publicId = userAvatar.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        // Delete UserAvatar document
        await UserAvatar.deleteOne({ _id: userAvatar._id });

        // Update User model
        const user = await User.findById(userId);
        user.avatar = null;
        await user.save();

        res.status(200).json({ message: "Avatar deleted successfully" });
    } catch (error) {
        console.error('Error deleting avatar:', error);
        res.status(500).json({ message: "Error deleting avatar" });
    }
};

// Helper functions for file validation (implement these)
const isValidFileType = (file) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    return allowedExtensions.includes(ext);
};

const isValidFileSize = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    return file.size <= maxSize;
};

// You may want to keep this function for custom uploads
const isValidDimensions = async (file) => {
    try {
        const dimensions = await sharp(file.buffer).metadata();
        const maxDimension = 1000;
        return dimensions.width <= maxDimension && dimensions.height <= maxDimension;
    } catch (error) {
        console.error('Error checking image dimensions:', error);
        return false;
    }
};