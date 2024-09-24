import { User, FeedItem, UserAchievement } from '../models/index.js';

export const generateFeed = async (userId, page = 1, limit = 10) => {
    const user = await User.findById(userId).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);

    // Get user's own feed items
    const userFeedItems = await FeedItem.find({ user: userId })
        .sort('-timestamp')
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('content.tip')
        .populate({
            path: 'user',
            select: 'username avatar',
            populate: { path: 'avatar', select: 'imageUrl' }
        })
        .lean();

    // Get friend achievements
    const friendAchievements = await UserAchievement.find({
        userId: { $in: friendIds },
        dateEarned: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    })
        .populate({
            path: 'userId',
            select: 'username avatar',
            populate: { path: 'avatar', select: 'imageUrl' }
        })
        .populate('achievementId')
        .lean();

    // Convert friend achievements to feed items
    const friendFeedItems = friendAchievements.map(ua => ({
        type: 'friendAchievement',
        content: {
            achievementId: ua.achievementId._id,
            name: ua.achievementId.name,
            description: ua.achievementId.description,
            xpReward: ua.achievementId.reward.xp,
            friend: {
                _id: ua.userId._id,
                username: ua.userId.username,
                avatar: ua.userId.avatar
            }
        },
        timestamp: ua.dateEarned,
        user: userId,
        congratulations: ua.congratulations
    }));

    // Combine and sort all feed items
    const allFeedItems = [...userFeedItems, ...friendFeedItems]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);

    const totalItems = await FeedItem.countDocuments({ user: userId }) + friendFeedItems.length;

    return {
        feedItems: allFeedItems,
        hasMore: totalItems > page * limit,
        totalItems
    };
};