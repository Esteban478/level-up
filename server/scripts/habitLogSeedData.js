export const generateHabitLogs = (users, habits) => {
    const habitLogs = [];
    const today = new Date();

    users.forEach(user => {
        // Assign 2-3 random habits to each user
        const userHabits = habits.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2);

        userHabits.forEach(habit => {
            // Generate logs for the past 30 days
            for (let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);

                // 70% chance of completing the habit each day
                if (Math.random() < 0.7) {
                    habitLogs.push({
                        userId: user._id,
                        habitId: habit._id,
                        date: date,
                        completed: true,
                        value: habit.type === 'Boolean' ? true : Math.floor(Math.random() * 100) + 1
                    });
                }
            }
        });
    });

    return habitLogs;
};

export default generateHabitLogs;