import { Achievement, UserAchievement, HabitLog, User, FeedItem } from '../models/index.js';
import { acquireLock, releaseLock } from '../utils/achievementLock.js';

export const createFeedItemForAchievement = async (userId, achievement) => {
    console.log(`Creating feed item for achievement: ${achievement.name}, User: ${userId}`);
    const user = await User.findById(userId).populate('avatar');

    // Create feed item for the user
    const userFeedItem = await FeedItem.findOne({
        user: userId,
        type: 'achievement',
        'content.achievementId': achievement._id
    });

    if (!userFeedItem) {
        await FeedItem.create({
            user: userId,
            type: 'achievement',
            content: {
                achievementId: achievement._id,
                name: achievement.name,
                description: achievement.description,
                xpReward: achievement.reward.xp,
                isOwnAchievement: true
            }
        });
    }

    // Create feed items for friends
    const friends = await User.find({ _id: { $in: user.friends } });
    console.log(`Friends found: ${friends.length}`);
    for (const friend of friends) {
        console.log(`Creating feed item for friend: ${friend._id}`);
        if (friend.settings.privacy.activityVisibility === 'friends' || friend.settings.privacy.activityVisibility === 'public') {
            const friendFeedItem = await FeedItem.findOne({
                user: friend._id,
                type: 'friendAchievement',
                'content.achievementId': achievement._id,
                'content.friendId': userId
            });

            if (!friendFeedItem) {
                await FeedItem.create({
                    user: friend._id,
                    type: 'friendAchievement',
                    content: {
                        achievementId: achievement._id,
                        name: achievement.name,
                        description: achievement.description,
                        xpReward: achievement.reward.xp,
                        friendId: userId,
                        friendUsername: user.username,
                        friendAvatar: user.avatar ? user.avatar.imageUrl : null
                    }
                });
            }
        }
    }
};
const checkHabitMilestoneAchievement = async (userId, habitId) => {
    const achievements = await Achievement.find({ type: 'Habit_milestone' });
    const earnedAchievements = [];

    for (const achievement of achievements) {
        const { totalCount } = achievement.condition;
        const habitLogs = await HabitLog.countDocuments({ userId, habitId });

        if (habitLogs >= totalCount) {
            const userAchievement = await UserAchievement.findOne({
                userId,
                achievementId: achievement._id
            });

            if (!userAchievement || (achievement.isRepeatable && userAchievement.count < habitLogs)) {
                earnedAchievements.push(achievement);

                if (userAchievement) {
                    userAchievement.count = habitLogs;
                    await userAchievement.save();
                } else {
                    await UserAchievement.create({
                        userId,
                        achievementId: achievement._id,
                        count: habitLogs
                    });
                }

                await createFeedItemForAchievement(userId, achievement);
            }
        }
    }

    return earnedAchievements;
};

export const checkLevelAchievement = async (userId, level) => {
    try {
        const newAchievements = await Achievement.find({
            type: 'Level',
            'condition.level': { $lte: level }
        });

        const userAchievements = await UserAchievement.find({ userId });
        const earnedAchievementIds = userAchievements.map(ua => ua.achievementId.toString());
        const newEarnedAchievements = newAchievements.filter(a => !earnedAchievementIds.includes(a._id.toString()));

        const awardedAchievements = [];
        for (const achievement of newEarnedAchievements) {
            await UserAchievement.create({
                userId,
                achievementId: achievement._id
            });

            await User.findByIdAndUpdate(userId, { $inc: { xp: achievement.reward.xp, totalXp: achievement.reward.xp } });

            await createFeedItemForAchievement(userId, achievement);

            awardedAchievements.push({
                name: achievement.name,
                description: achievement.description,
                xpReward: achievement.reward.xp
            });
        }

        return awardedAchievements;
    } catch (error) {
        console.error('Error checking level achievements:', error);
        throw error;
    }
};


export const checkAchievements = async (userId, habitId) => {
    const achievements = await Achievement.find({ type: 'Habit_milestone' });
    const earnedAchievements = [];

    for (const achievement of achievements) {
        const lockAcquired = await acquireLock(userId, achievement._id);
        if (!lockAcquired) {
            console.log(`Skipping achievement ${achievement._id} for user ${userId} - already being processed`);
            continue;
        }

        try {
            const { totalCount } = achievement.condition;
            const habitLogs = await HabitLog.countDocuments({ userId, habitId });

            if (habitLogs >= totalCount) {
                const userAchievement = await UserAchievement.findOne({
                    userId,
                    achievementId: achievement._id
                });

                if (!userAchievement || (achievement.isRepeatable && userAchievement.count < habitLogs)) {
                    earnedAchievements.push(achievement);

                    if (userAchievement) {
                        userAchievement.count = habitLogs;
                        await userAchievement.save();
                    } else {
                        await UserAchievement.create({
                            userId,
                            achievementId: achievement._id,
                            count: habitLogs
                        });
                    }

                    await createFeedItemForAchievement(userId, achievement);
                }
            }
        } finally {
            releaseLock(userId, achievement._id);
        }
    }

    return earnedAchievements;
};