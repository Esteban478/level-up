export const generateUserAchievements = (users, habitLogs, achievements, xpTransactions) => {
    console.log('Generating user achievements...');
    console.log(`Users: ${users ? users.length : 'undefined'}`);
    console.log(`Habit Logs: ${habitLogs ? habitLogs.length : 'undefined'}`);
    console.log(`Achievements: ${achievements ? achievements.length : 'undefined'}`);
    console.log(`XP Transactions: ${xpTransactions ? xpTransactions.length : 'undefined'}`);

    if (!users || !habitLogs || !achievements || !xpTransactions) {
        console.error('One or more required parameters are undefined');
        return [];
    }

    const userAchievements = [];

    users.forEach((user, index) => {
        console.log(`Processing user ${index + 1}/${users.length}`);
        if (!user || !user._id) {
            console.error(`Invalid user at index ${index}`);
            return;
        }

        const userLogs = habitLogs.filter(log => log && log.userId && log.userId.toString() === user._id.toString());
        const userXP = xpTransactions
            .filter(transaction => transaction && transaction.userId && transaction.userId.toString() === user._id.toString())
            .reduce((total, transaction) => total + (transaction.amount || 0), 0);

        achievements.forEach((achievement, achievementIndex) => {
            if (!achievement || !achievement.type) {
                console.error(`Invalid achievement at index ${achievementIndex}`);
                return;
            }

            try {
                switch (achievement.type) {
                    case 'Login_streak':
                        const loginStreak = calculateLoginStreak(user);
                        if (loginStreak >= achievement.condition.streakDays) {
                            userAchievements.push(createUserAchievement(user._id, achievement._id));
                        }
                        break;

                    case 'Habit_streak':
                        if (achievement.condition && achievement.condition.habitId) {
                            const habitStreak = calculateLongestStreak(userLogs, achievement.condition.habitId);
                            if (habitStreak >= achievement.condition.streakDays) {
                                userAchievements.push(createUserAchievement(user._id, achievement._id));
                            }
                        }
                        break;

                    case 'Habit_milestone':
                        if (achievement.condition && achievement.condition.habitId) {
                            const habitCount = userLogs.filter(log =>
                                log && log.habitId && log.habitId.toString() === achievement.condition.habitId.toString() && log.completed
                            ).length;
                            if (habitCount >= achievement.condition.totalCount) {
                                userAchievements.push(createUserAchievement(user._id, achievement._id));
                            }
                        }
                        break;

                    case 'Social':
                        const friendCount = user.friends ? user.friends.length : 0;
                        if (friendCount >= achievement.condition.friendCount) {
                            userAchievements.push(createUserAchievement(user._id, achievement._id));
                        }
                        break;

                    case 'Level':
                        const userLevel = calculateUserLevel(userXP);
                        if (userLevel >= achievement.condition.level) {
                            userAchievements.push(createUserAchievement(user._id, achievement._id));
                        }
                        break;

                    case 'Custom':
                        if (evaluateCustomCondition(user, achievement.condition.customCondition)) {
                            userAchievements.push(createUserAchievement(user._id, achievement._id));
                        }
                        break;

                    default:
                        console.warn(`Unknown achievement type: ${achievement.type}`);
                }
            } catch (error) {
                console.error(`Error processing achievement ${achievementIndex} for user ${index}:`, error);
            }
        });
    });

    console.log(`Generated ${userAchievements.length} user achievements`);
    return userAchievements;
};

const calculateLoginStreak = (user) => {
    // This is a placeholder. In a real application, you'd have login data to calculate this.
    // For now, we'll return a random number between 1 and 30
    return Math.floor(Math.random() * 30) + 1;
};

const calculateLongestStreak = (logs, habitId) => {
    if (!habitId) return 0;

    const sortedLogs = logs
        .filter(log => log.habitId && log.habitId.toString() === habitId.toString() && log.completed)
        .sort((a, b) => a.date - b.date);

    let longestStreak = 0;
    let currentStreak = 0;
    let previousDate = null;

    sortedLogs.forEach(log => {
        const currentDate = new Date(log.date);
        if (previousDate) {
            const dayDifference = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
            if (dayDifference === 1) {
                currentStreak++;
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        } else {
            currentStreak = 1;
        }
        previousDate = currentDate;
    });

    return Math.max(longestStreak, currentStreak);
};

const calculateUserLevel = (totalXP) => {
    // This is a simplified level calculation. Adjust based on your level progression system.
    return Math.floor(totalXP / 1000) + 1;
};

const evaluateCustomCondition = (user, condition) => {
    // This is a placeholder. Implement your custom condition logic here.
    // For now, we'll return true 20% of the time
    return Math.random() < 0.2;
};

const createUserAchievement = (userId, achievementId) => ({
    userId,
    achievementId,
    dateEarned: new Date()
});

export default generateUserAchievements;