import mongoose from 'mongoose';

const badgeTierSchema = new mongoose.Schema({
    achievementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement',
        required: true
    },
    tier: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    icon: String,
    condition: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

const BadgeTier = mongoose.model('BadgeTier', badgeTierSchema);

export default BadgeTier;