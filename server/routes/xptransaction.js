import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createXpTransaction,
    getXpTransactions,
    getXpTransactionById,
    getUserTotalXP
} from '../controllers/index.js';

const xpTransactionRouter = express.Router();

// Create a new XP transaction
xpTransactionRouter.post('/', authMiddleware, createXpTransaction);

// Get all XP transactions for the authenticated user
xpTransactionRouter.get('/', authMiddleware, getXpTransactions);

// Get total XP for the authenticated user
xpTransactionRouter.get('/total', authMiddleware, getUserTotalXP);

// Get a specific XP transaction by ID
xpTransactionRouter.get('/:id', authMiddleware, getXpTransactionById);

// Create a new XP transaction
xpTransactionRouter.post('/record', authMiddleware, createXpTransaction);


export default xpTransactionRouter;