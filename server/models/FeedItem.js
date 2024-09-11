import mongoose from 'mongoose';

const feedItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['achievement', 'tip'],
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const FeedItem = mongoose.model('FeedItem', feedItemSchema);

export default FeedItem;