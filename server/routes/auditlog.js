import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    createAuditLog,
    getAuditLogs,
    getAuditLogById,
    getUserAuditLogs
} from '../controllers/index.js';

const auditLogRouter = express.Router();

// Create a new audit log entry (this might be internal only)
auditLogRouter.post('/', authMiddleware, createAuditLog);

// Get all audit logs (admin only)
auditLogRouter.get('/', authMiddleware, getAuditLogs);

// Get audit logs for the authenticated user
auditLogRouter.get('/user', authMiddleware, getUserAuditLogs);

// Get a specific audit log by ID (admin only)
auditLogRouter.get('/:id', authMiddleware, getAuditLogById);

export default auditLogRouter;