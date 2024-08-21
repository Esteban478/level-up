export const generateXPTransactions = (habitLogs, habits) => {
    return habitLogs.map(log => {
        const habit = habits.find(h => h._id.toString() === log.habitId.toString());
        const xpEarned = habit.xpReward.base; // For simplicity, we're using the base XP reward

        return {
            userId: log.userId,
            amount: xpEarned,
            source: 'habit_completion',
            sourceId: log.habitId,
            timestamp: log.date
        };
    });
};

export default generateXPTransactions;