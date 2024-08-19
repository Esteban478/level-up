import express from 'express';
import { register, login, registerLimiter, loginLimiter, conditionalRateLimiter } from '../controllers/auth.js';

const authRouter = express.Router();

// UNCOMMENT FOR PRODUCTION AND DO NOT FORGET TO REMOVE TESTMODE FROM .ENV
// Apply rate limiting to registration and login routes
// authRouter.post('/register', registerLimiter, register);
// authRouter.post('/login', loginLimiter, login);

// Bypass rate limiting in testing mode
authRouter.post('/register', conditionalRateLimiter(registerLimiter), register);
authRouter.post('/login', conditionalRateLimiter(loginLimiter), login);

export default authRouter;