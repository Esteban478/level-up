export const generateUserAchievements = (users, habitLogs, achievements) => {
    const userAchievements = [];

    users.forEach(user => {
        const userLogs = habitLogs.filter(log => log.userId.toString() === user._id.toString());

        achievements.forEach(achievement => {
            if (achievement.type === 'habit_streak') {
                const streak = calculateLongestStreak(userLogs, achievement.condition.habitId);
                if (streak >= achievement.condition.streakDays) {
                    userAchievements.push({
                        userId: user._id,
                        achievementId: achievement._id,
                        dateEarned: new Date()
                    });
                }
            } else if (achievement.type === 'habit_milestone') {
                const count = userLogs.filter(log => log.habitId.toString() === achievement.condition.habitId.toString()).length;
                if (count >= achievement.condition.totalCount) {
                    userAchievements.push({
                        userId: user._id,
                        achievementId: achievement._id,
                        dateEarned: new Date()
                    });
                }
            }
            // Add more achievement types as needed
        });
    });

    return userAchievements;
};

const calculateLongestStreak = (logs, habitId) => {
    // Implement streak calculation logic here
    // This is a simplified version
    return logs.filter(log => log.habitId.toString() === habitId.toString() && log.completed).length;
};

export default generateUserAchievements;