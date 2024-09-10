import { Achievement, UserAchievement, HabitLog, User } from '../models/index.js';

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
            }
        }
    }

    return earnedAchievements;
};

export const checkLevelAchievement = async (userId, level) => {
    try {
        // Check for level-based achievements
        const newAchievements = await Achievement.find({
            type: 'Level',
            'condition.level': { $lte: level }
        });

        // Filter out already earned achievements
        const userAchievements = await UserAchievement.find({ userId });
        const earnedAchievementIds = userAchievements.map(ua => ua.achievementId.toString());
        const newEarnedAchievements = newAchievements.filter(a => !earnedAchievementIds.includes(a._id.toString()));

        // Award new achievements
        const awardedAchievements = [];
        for (const achievement of newEarnedAchievements) {
            await UserAchievement.create({
                userId,
                achievementId: achievement._id
            });

            // Award XP for the achievement
            await User.findByIdAndUpdate(userId, { $inc: { xp: achievement.reward.xp, totalXp: achievement.reward.xp } });

            awardedAchievements.push({
                name: achievement.name,
                description: achievement.description,
                xpReward: achievement.reward.xp  // Ensure we're including the XP reward
            });
        }

        return awardedAchievements;
    } catch (error) {
        console.error('Error checking level achievements:', error);
        throw error;
    }
};

export const checkAchievements = async (userId, habitId) => {
    const earnedAchievements = await checkHabitMilestoneAchievement(userId, habitId);
    // Add more achievement type checks here as needed

    return earnedAchievements;
};