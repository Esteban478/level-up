import { User, FeedItem } from '../models/index.js';

export const createFeedItem = async (req, res) => {
    try {
        const { type, content } = req.body;
        const feedItem = new FeedItem({
            userId: req.user._id,
            type,
            content
        });
        await feedItem.save();
        res.status(201).json(feedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFeedItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const feedItems = await FeedItem.find({
            $or: [
                { user: userId, type: { $in: ['achievement', 'tip'] } },
                { user: userId, type: 'friendAchievement', 'content.friendId': { $ne: userId } }
            ]
        })
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'user',
                select: 'username avatar',
                populate: {
                    path: 'avatar',
                    select: 'imageUrl'
                }
            });

        const totalItems = await FeedItem.countDocuments({
            $or: [
                { user: userId, type: { $in: ['achievement', 'tip'] } },
                { user: userId, type: 'friendAchievement', 'content.friendId': { $ne: userId } }
            ]
        });

        res.json({
            feedItems,
            hasMore: totalItems > page * limit,
            totalItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};