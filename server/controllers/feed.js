import FeedItem from '../models/FeedItem.js';

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const feedItems = await FeedItem.find({ userId: req.user._id })
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await FeedItem.countDocuments({ userId: req.user._id });
        const hasMore = totalItems > page * limit;

        res.json({
            feedItems,
            hasMore,
            totalItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};