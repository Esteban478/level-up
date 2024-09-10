import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createXPTransaction,
    getXPTransactions,
    getXPTransactionById,
    getUserTotalXP
} from '../controllers/index.js';

const xpTransactionRouter = express.Router();

// Create a new XP transaction
xpTransactionRouter.post('/', authMiddleware, createXPTransaction);

// Get all XP transactions for the authenticated user
xpTransactionRouter.get('/', authMiddleware, getXPTransactions);

// Get total XP for the authenticated user
xpTransactionRouter.get('/total', authMiddleware, getUserTotalXP);

// Get a specific XP transaction by ID
xpTransactionRouter.get('/:id', authMiddleware, getXPTransactionById);

// Create a new XP transaction
xpTransactionRouter.post('/record', authMiddleware, createXPTransaction);


export default xpTransactionRouter;