import { FeedItem, UserAchievement } from '../models/index.js';
import { generateFeed } from '../services/feedService.js';

export const createFeedItem = async (req, res) => {
    try {
        const { type, content } = req.body;
        const feedItem = new FeedItem({
            user: req.user._id,
            type,
            content,
            congratulations: []
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
        const limit = parseInt(req.query.limit) || 10;

        const feedData = await generateFeed(req.user._id, page, limit);

        res.json(feedData);
    } catch (error) {
        console.error('Error fetching feed items:', error);
        res.status(500).json({ error: error.message });
    }
};

export const congratulateAchievement = async (req, res) => {
    try {
        const { achievementId, friendId } = req.body;
        const userId = req.user._id;

        const userAchievement = await UserAchievement.findOne({
            userId: friendId,
            achievementId: achievementId
        });

        if (!userAchievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }

        if (userAchievement.congratulations.includes(userId)) {
            return res.status(400).json({ error: 'You have already congratulated this achievement' });
        }

        userAchievement.congratulations.push(userId);
        await userAchievement.save();

        // Update feed items for both the congratulating user and the achievement owner
        await FeedItem.updateMany(
            {
                $or: [
                    { user: userId, type: 'friendAchievement', 'content.achievementId': achievementId },
                    { user: friendId, type: 'achievement', 'content.achievementId': achievementId }
                ]
            },
            { $set: { congratulations: userAchievement.congratulations } }
        );

        res.json({ success: true, congratulationsCount: userAchievement.congratulations.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const refreshCongratulations = async (req, res) => {
    try {
        const userId = req.user._id;
        const feedItems = await FeedItem.find({ user: userId });

        const updatedFeedItems = await Promise.all(feedItems.map(async (item) => {
            if (item.type === 'achievement' || item.type === 'friendAchievement') {
                const userAchievement = await UserAchievement.findOne({
                    userId: item.type === 'achievement' ? userId : item.content.friendId,
                    achievementId: item.content.achievementId
                });

                if (userAchievement) {
                    // Set the congratulations to the actual array, not just the length
                    item.congratulations = userAchievement.congratulations;
                    await item.save();
                }
            }
            return item;
        }));

        res.json(updatedFeedItems);
    } catch (error) {
        console.error('Error in refreshCongratulations:', error);
        res.status(500).json({ error: error.message });
    }
};