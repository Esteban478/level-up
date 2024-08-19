import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    affectedResource: { type: String, required: true },
    details: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;