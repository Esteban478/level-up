import mongoose from "mongoose";

const feedItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['achievement', 'friendAchievement', 'tip', 'newFriend'],
        required: true
    },
    content: {
        achievementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' },
        name: String,
        description: String,
        xpReward: Number,
        friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        tip: { type: mongoose.Schema.Types.ObjectId, ref: 'Tip' },
        isFollowingBack: Boolean
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    congratulations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const FeedItem = mongoose.model('FeedItem', feedItemSchema);

export default FeedItem;