import mongoose from 'mongoose';

const xpTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: ['habit_completion', 'streak', 'achievement', 'friend_added', 'daily_login', 'other']
    },
    metadata: {
        habitId: mongoose.Schema.Types.ObjectId,
        achievementId: mongoose.Schema.Types.ObjectId,
        streakDays: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const XPTransaction = mongoose.model('XPTransaction', xpTransactionSchema);

export default XPTransaction;