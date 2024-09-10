import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import { generateAvatar } from '../controllers/useravatar.js';

// Rate limiter for login attempts
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again after 15 minutes'
});

// Rate limiter for registration
export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 registration attempts per windowMs
    message: 'Too many accounts created, please try again after an hour'
});

// Middleware to conditionally apply rate limiting
export const conditionalRateLimiter = (limiter) => (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    return limiter(req, res, next);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password strength (e.g., minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate avatar
        try {
            await generateAvatar({ body: { userId: user._id, type: 'initials', isInitialCreation: true } });
        } catch (avatarError) {
            console.error('Error generating avatar:', avatarError);
            // We don't want to fail registration if avatar generation fails
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ user: { id: user._id, username, email }, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Log in a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        let user = await User.findOne({ email: usernameOrEmail });

        if (!user) {
            user = await User.findOne({ username: usernameOrEmail });
        }

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Use the test streak function
        await user.updateStreak();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                streakDays: user.streakDays  // Include streak information in the response
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const { _id, username, email } = req.user;
        res.json({ user: { id: _id, username, email } });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};