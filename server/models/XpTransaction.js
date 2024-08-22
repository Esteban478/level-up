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
    source: {
        type: String,
        required: true,
        enum: ['Habit_completion', 'Streak', 'Achievement', 'Friend_added', 'Daily_login', 'Other']
    },
    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const XPTransaction = mongoose.model('XPTransaction', xpTransactionSchema);

export default XPTransaction;