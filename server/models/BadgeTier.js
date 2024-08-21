import mongoose from 'mongoose';

const badgeTierSchema = new mongoose.Schema({
    tier: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BadgeTier = mongoose.model('BadgeTier', badgeTierSchema);

export default BadgeTier;