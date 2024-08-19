import { AuditLog } from '../models/index.js';

export const createAuditLog = async (req, res) => {
    try {
        const { action, details, affectedResource } = req.body;
        const auditLog = new AuditLog({
            performedBy: req.user.userId,
            action,
            details,
            affectedResource
        });
        await auditLog.save();
        res.status(201).json(auditLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find().sort('-createdAt');
        res.json(auditLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAuditLogById = async (req, res) => {
    try {
        const auditLog = await AuditLog.findById(req.params.id);
        if (!auditLog) {
            return res.status(404).json({ error: 'Audit log not found' });
        }
        res.json(auditLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find({ performedBy: req.user.userId }).sort('-createdAt');
        res.json(auditLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};