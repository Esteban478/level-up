import mongoose from 'mongoose';

const levelThresholdSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
        unique: true
    },
    xpRequired: {
        type: Number,
        required: true
    },
    totalXpRequired: {
        type: Number,
        required: true
    },
    rewards: {
        xpBoost: {
            type: Number,
            default: 0
        },
        achievementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Achievement'
        }
    },
    featureUnlock: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const LevelThreshold = mongoose.model('LevelThreshold', levelThresholdSchema);

export default LevelThreshold;