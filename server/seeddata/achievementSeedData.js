export const achievements = [
    // General Achievements
    {
        name: "Novice Achiever",
        description: "Reach level 5",
        type: "Level",
        category: "General",
        icon: "level_icon",
        condition: { level: 5 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Intermediate Achiever",
        description: "Reach level 25",
        type: "Level",
        category: "General",
        icon: "level_icon",
        condition: { level: 25 },
        reward: { xp: 500 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Expert Achiever",
        description: "Reach level 50",
        type: "Level",
        category: "General",
        icon: "level_icon",
        condition: { level: 50 },
        reward: { xp: 1000 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Master Achiever",
        description: "Reach level 75",
        type: "Level",
        category: "General",
        icon: "level_icon",
        condition: { level: 75 },
        reward: { xp: 1500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Legendary Achiever",
        description: "Reach level 100",
        type: "Level",
        category: "General",
        icon: "level_icon",
        condition: { level: 100 },
        reward: { xp: 2000 },
        tier: "diamond",
        isRepeatable: false
    },
    {
        name: "Consistent",
        description: "Maintain a 7-day streak for any habit",
        type: "Habit_streak",
        category: "General",
        icon: "streak_icon",
        condition: { streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: true
    },
    {
        name: "Dedicated",
        description: "Maintain a 30-day streak for any habit",
        type: "Habit_streak",
        category: "General",
        icon: "streak_icon",
        condition: { streakDays: 30 },
        reward: { xp: 200 },
        tier: "silver",
        isRepeatable: true
    },
    {
        name: "Committed",
        description: "Maintain a 60-day streak for any habit",
        type: "Habit_streak",
        category: "General",
        icon: "streak_icon",
        condition: { streakDays: 60 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: true
    },
    {
        name: "Unstoppable",
        description: "Maintain a 100-day streak for any habit",
        type: "Habit_streak",
        category: "General",
        icon: "streak_icon",
        condition: { streakDays: 100 },
        reward: { xp: 1000 },
        tier: "platinum",
        isRepeatable: true
    },
    {
        name: "Legendary Streak",
        description: "Maintain a 365-day streak for any habit",
        type: "Habit_streak",
        category: "General",
        icon: "streak_icon",
        condition: { streakDays: 365 },
        reward: { xp: 5000 },
        tier: "diamond",
        isRepeatable: true
    },
    {
        name: "Getting Started",
        description: "Complete any habit 10 times",
        type: "Habit_milestone",
        category: "General",
        icon: "complete_icon",
        condition: { totalCount: 10 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: true
    },
    {
        name: "On a Roll",
        description: "Complete any habit 50 times",
        type: "Habit_milestone",
        category: "General",
        icon: "complete_icon",
        condition: { totalCount: 50 },
        reward: { xp: 100 },
        tier: "silver",
        isRepeatable: true
    },
    {
        name: "Century Club",
        description: "Complete any habit 100 times",
        type: "Habit_milestone",
        category: "General",
        icon: "complete_icon",
        condition: { totalCount: 100 },
        reward: { xp: 200 },
        tier: "gold",
        isRepeatable: true
    },
    {
        name: "Habit Expert",
        description: "Complete any habit 500 times",
        type: "Habit_milestone",
        category: "General",
        icon: "complete_icon",
        condition: { totalCount: 500 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: true
    },
    {
        name: "Habit Master",
        description: "Complete any habit 1000 times",
        type: "Habit_milestone",
        category: "General",
        icon: "complete_icon",
        condition: { totalCount: 1000 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: true
    },
    {
        name: "Jack of All Trades",
        description: "Complete habits in 5 different areas",
        type: "Custom",
        category: "General",
        icon: "diverse_icon",
        condition: { uniqueAreas: 5 },
        reward: { xp: 100 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Renaissance Person",
        description: "Complete habits in 10 different areas",
        type: "Custom",
        category: "General",
        icon: "diverse_icon",
        condition: { uniqueAreas: 10 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Habit Hunter",
        description: "Use the app for 7 consecutive days",
        type: "Login_streak",
        category: "General",
        icon: "login_icon",
        condition: { loginDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Habit Enthusiast",
        description: "Use the app for 30 consecutive days",
        type: "Login_streak",
        category: "General",
        icon: "login_icon",
        condition: { loginDays: 30 },
        reward: { xp: 200 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Habit Aficionado",
        description: "Use the app for 90 consecutive days",
        type: "Login_streak",
        category: "General",
        icon: "login_icon",
        condition: { loginDays: 90 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Habit Devotee",
        description: "Use the app for 180 consecutive days",
        type: "Login_streak",
        category: "General",
        icon: "login_icon",
        condition: { loginDays: 180 },
        reward: { xp: 1000 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Habit Guru",
        description: "Use the app for 365 consecutive days",
        type: "Login_streak",
        category: "General",
        icon: "login_icon",
        condition: { loginDays: 365 },
        reward: { xp: 2000 },
        tier: "diamond",
        isRepeatable: false
    },
    {
        name: "XP Novice",
        description: "Earn a total of 1,000 XP",
        type: "Custom",
        category: "General",
        icon: "xp_icon",
        condition: { totalXp: 1000 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "XP Collector",
        description: "Earn a total of 5,000 XP",
        type: "Custom",
        category: "General",
        icon: "xp_icon",
        condition: { totalXp: 5000 },
        reward: { xp: 200 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "XP Hoarder",
        description: "Earn a total of 10,000 XP",
        type: "Custom",
        category: "General",
        icon: "xp_icon",
        condition: { totalXp: 10000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "XP Magnate",
        description: "Earn a total of 25,000 XP",
        type: "Custom",
        category: "General",
        icon: "xp_icon",
        condition: { totalXp: 25000 },
        reward: { xp: 1000 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "XP Tycoon",
        description: "Earn a total of 50,000 XP",
        type: "Custom",
        category: "General",
        icon: "xp_icon",
        condition: { totalXp: 50000 },
        reward: { xp: 2000 },
        tier: "diamond",
        isRepeatable: false
    },
    {
        name: "Social Newbie",
        description: "Add 5 friends",
        type: "Social",
        category: "Social",
        icon: "friend_icon",
        condition: { friendCount: 5 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Social Fanatic",
        description: "Add 10 friends",
        type: "Social",
        category: "Social",
        icon: "friend_icon",
        condition: { friendCount: 10 },
        reward: { xp: 200 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Social Star",
        description: "Add 25 friends",
        type: "Social",
        category: "Social",
        icon: "friend_icon",
        condition: { friendCount: 25 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Social Influencer",
        description: "Add 50 friends",
        type: "Social",
        category: "Social",
        icon: "friend_icon",
        condition: { friendCount: 50 },
        reward: { xp: 1000 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Social Legend",
        description: "Add 100 friends",
        type: "Social",
        category: "Social",
        icon: "friend_icon",
        condition: { friendCount: 100 },
        reward: { xp: 2000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit-specific achievements start here
    // Habit 1: Daily Exercise
    {
        name: "Exercise Beginner",
        description: "Complete daily exercise for 7 days",
        type: "Habit_streak",
        category: "Health",
        icon: "exercise_icon",
        condition: { habitId: 1, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Exercise Enthusiast",
        description: "Complete daily exercise for 30 days",
        type: "Habit_streak",
        category: "Health",
        icon: "exercise_icon",
        condition: { habitId: 1, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Exercise Addict",
        description: "Complete daily exercise for 90 days",
        type: "Habit_streak",
        category: "Health",
        icon: "exercise_icon",
        condition: { habitId: 1, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Exercise Master",
        description: "Complete daily exercise for 180 days",
        type: "Habit_streak",
        category: "Health",
        icon: "exercise_icon",
        condition: { habitId: 1, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Exercise Legend",
        description: "Complete daily exercise for 365 days",
        type: "Habit_streak",
        category: "Health",
        icon: "exercise_icon",
        condition: { habitId: 1, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 2: Meditation
    {
        name: "Meditation Novice",
        description: "Meditate for 7 days in a row",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "meditation_icon",
        condition: { habitId: 2, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Meditation Practitioner",
        description: "Meditate for 30 days in a row",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "meditation_icon",
        condition: { habitId: 2, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Meditation Adept",
        description: "Meditate for 90 days in a row",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "meditation_icon",
        condition: { habitId: 2, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Meditation Master",
        description: "Meditate for 180 days in a row",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "meditation_icon",
        condition: { habitId: 2, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Zen Master",
        description: "Meditate for 365 days in a row",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "meditation_icon",
        condition: { habitId: 2, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 3: Reading
    {
        name: "Bookworm Initiate",
        description: "Read for a total of 10 hours",
        type: "Habit_milestone",
        category: "Personal Development",
        icon: "book_icon",
        condition: { habitId: 3, totalDuration: 600 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Bookworm",
        description: "Read for a total of 50 hours",
        type: "Habit_milestone",
        category: "Personal Development",
        icon: "book_icon",
        condition: { habitId: 3, totalDuration: 3000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Avid Reader",
        description: "Read for a total of 100 hours",
        type: "Habit_milestone",
        category: "Personal Development",
        icon: "book_icon",
        condition: { habitId: 3, totalDuration: 6000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Bibliophile",
        description: "Read for a total of 200 hours",
        type: "Habit_milestone",
        category: "Personal Development",
        icon: "book_icon",
        condition: { habitId: 3, totalDuration: 12000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Literary Master",
        description: "Read for a total of 500 hours",
        type: "Habit_milestone",
        category: "Personal Development",
        icon: "book_icon",
        condition: { habitId: 3, totalDuration: 30000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 4: Sleep Schedule
    {
        name: "Sleep Scheduler",
        description: "Maintain sleep schedule for 7 days",
        type: "Habit_streak",
        category: "Health",
        icon: "sleep_icon",
        condition: { habitId: 4, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Sleep Regulator",
        description: "Maintain sleep schedule for 30 days",
        type: "Habit_streak",
        category: "Health",
        icon: "sleep_icon",
        condition: { habitId: 4, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Sleep Master",
        description: "Maintain sleep schedule for 90 days",
        type: "Habit_streak",
        category: "Health",
        icon: "sleep_icon",
        condition: { habitId: 4, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Sleep Guru",
        description: "Maintain sleep schedule for 180 days",
        type: "Habit_streak",
        category: "Health",
        icon: "sleep_icon",
        condition: { habitId: 4, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Sleep Legend",
        description: "Maintain sleep schedule for 365 days",
        type: "Habit_streak",
        category: "Health",
        icon: "sleep_icon",
        condition: { habitId: 4, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 5: Healthy Eating
    {
        name: "Healthy Eater Initiate",
        description: "Eat 30 nutritious meals",
        type: "Habit_milestone",
        category: "Health",
        icon: "meal_icon",
        condition: { habitId: 5, totalCount: 30 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Healthy Eater",
        description: "Eat 100 nutritious meals",
        type: "Habit_milestone",
        category: "Health",
        icon: "meal_icon",
        condition: { habitId: 5, totalCount: 100 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Nutrition Enthusiast",
        description: "Eat 250 nutritious meals",
        type: "Habit_milestone",
        category: "Health",
        icon: "meal_icon",
        condition: { habitId: 5, totalCount: 250 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Nutrition Master",
        description: "Eat 500 nutritious meals",
        type: "Habit_milestone",
        category: "Health",
        icon: "meal_icon",
        condition: { habitId: 5, totalCount: 500 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Nutrition Guru",
        description: "Eat 1000 nutritious meals",
        type: "Habit_milestone",
        category: "Health",
        icon: "meal_icon",
        condition: { habitId: 5, totalCount: 1000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 6: Floss
    {
        name: "Flossing Beginner",
        description: "Floss for 7 days in a row",
        type: "Habit_streak",
        category: "Health",
        icon: "floss_icon",
        condition: { habitId: 6, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Flossing Enthusiast",
        description: "Floss for 30 days in a row",
        type: "Habit_streak",
        category: "Health",
        icon: "floss_icon",
        condition: { habitId: 6, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Flossing Addict",
        description: "Floss for 90 days in a row",
        type: "Habit_streak",
        category: "Health",
        icon: "floss_icon",
        condition: { habitId: 6, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Flossing Master",
        description: "Floss for 180 days in a row",
        type: "Habit_streak",
        category: "Health",
        icon: "floss_icon",
        condition: { habitId: 6, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Flossing Legend",
        description: "Floss for 365 days in a row",
        type: "Habit_streak",
        category: "Health",
        icon: "floss_icon",
        condition: { habitId: 6, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 7: Make Bed
    {
        name: "Bed Maker Initiate",
        description: "Make bed for 7 days in a row",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "bed_icon",
        condition: { habitId: 7, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Bed Maker",
        description: "Make bed for 30 days in a row",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "bed_icon",
        condition: { habitId: 7, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Bed Making Enthusiast",
        description: "Make bed for 90 days in a row",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "bed_icon",
        condition: { habitId: 7, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Bed Making Master",
        description: "Make bed for 180 days in a row",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "bed_icon",
        condition: { habitId: 7, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Bed Making Legend",
        description: "Make bed for 365 days in a row",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "bed_icon",
        condition: { habitId: 7, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 8: Water Intake
    {
        name: "Hydration Beginner",
        description: "Drink 100 glasses of water",
        type: "Habit_milestone",
        category: "Health",
        icon: "water_icon",
        condition: { habitId: 8, totalCount: 100 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Hydration Enthusiast",
        description: "Drink 500 glasses of water",
        type: "Habit_milestone",
        category: "Health",
        icon: "water_icon",
        condition: { habitId: 8, totalCount: 500 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Hydration Addict",
        description: "Drink 1000 glasses of water",
        type: "Habit_milestone",
        category: "Health",
        icon: "water_icon",
        condition: { habitId: 8, totalCount: 1000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Hydration Master",
        description: "Drink 2500 glasses of water",
        type: "Habit_milestone",
        category: "Health",
        icon: "water_icon",
        condition: { habitId: 8, totalCount: 2500 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Hydration Guru",
        description: "Drink 5000 glasses of water",
        type: "Habit_milestone",
        category: "Health",
        icon: "water_icon",
        condition: { habitId: 8, totalCount: 5000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 9: Steps
    {
        name: "Step Taker",
        description: "Take 100,000 steps",
        type: "Habit_milestone",
        category: "Health",
        icon: "steps_icon",
        condition: { habitId: 9, totalCount: 100000 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Walker",
        description: "Take 500,000 steps",
        type: "Habit_milestone",
        category: "Health",
        icon: "steps_icon",
        condition: { habitId: 9, totalCount: 500000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Hiker",
        description: "Take 1,000,000 steps",
        type: "Habit_milestone",
        category: "Health",
        icon: "steps_icon",
        condition: { habitId: 9, totalCount: 1000000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Trekker",
        description: "Take 2,500,000 steps",
        type: "Habit_milestone",
        category: "Health",
        icon: "steps_icon",
        condition: { habitId: 9, totalCount: 2500000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Marathon Walker",
        description: "Take 5,000,000 steps",
        type: "Habit_milestone",
        category: "Health",
        icon: "steps_icon",
        condition: { habitId: 9, totalCount: 5000000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },
    {
        name: "Gratitude Novice",
        description: "Write 30 gratitude entries",
        type: "Habit_milestone",
        category: "Mental Health",
        icon: "gratitude_icon",
        condition: { habitId: 10, totalCount: 30 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Gratitude Practitioner",
        description: "Write 100 gratitude entries",
        type: "Habit_milestone",
        category: "Mental Health",
        icon: "gratitude_icon",
        condition: { habitId: 10, totalCount: 100 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Gratitude Enthusiast",
        description: "Write 250 gratitude entries",
        type: "Habit_milestone",
        category: "Mental Health",
        icon: "gratitude_icon",
        condition: { habitId: 10, totalCount: 250 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Gratitude Master",
        description: "Write 500 gratitude entries",
        type: "Habit_milestone",
        category: "Mental Health",
        icon: "gratitude_icon",
        condition: { habitId: 10, totalCount: 500 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Gratitude Guru",
        description: "Write 1000 gratitude entries",
        type: "Habit_milestone",
        category: "Mental Health",
        icon: "gratitude_icon",
        condition: { habitId: 10, totalCount: 1000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 11: Deep Work
    {
        name: "Focus Initiate",
        description: "Complete 10 hours of deep work",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "focus_icon",
        condition: { habitId: 11, totalDuration: 600 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Focus Practitioner",
        description: "Complete 50 hours of deep work",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "focus_icon",
        condition: { habitId: 11, totalDuration: 3000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Focus Expert",
        description: "Complete 100 hours of deep work",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "focus_icon",
        condition: { habitId: 11, totalDuration: 6000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Focus Master",
        description: "Complete 250 hours of deep work",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "focus_icon",
        condition: { habitId: 11, totalDuration: 15000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Focus Guru",
        description: "Complete 500 hours of deep work",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "focus_icon",
        condition: { habitId: 11, totalDuration: 30000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 12: Practice Musical Instrument
    {
        name: "Music Novice",
        description: "Practice instrument for 10 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_icon",
        condition: { habitId: 12, totalDuration: 600 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Music Enthusiast",
        description: "Practice instrument for 50 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_icon",
        condition: { habitId: 12, totalDuration: 3000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Music Adept",
        description: "Practice instrument for 100 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_icon",
        condition: { habitId: 12, totalDuration: 6000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Music Virtuoso",
        description: "Practice instrument for 250 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_icon",
        condition: { habitId: 12, totalDuration: 15000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Music Maestro",
        description: "Practice instrument for 500 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_icon",
        condition: { habitId: 12, totalDuration: 30000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 13: Language Learning
    {
        name: "Language Learner",
        description: "Study a language for 10 hours",
        type: "Habit_milestone",
        category: "Education",
        icon: "language_icon",
        condition: { habitId: 13, totalDuration: 600 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Language Enthusiast",
        description: "Study a language for 50 hours",
        type: "Habit_milestone",
        category: "Education",
        icon: "language_icon",
        condition: { habitId: 13, totalDuration: 3000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Language Adept",
        description: "Study a language for 100 hours",
        type: "Habit_milestone",
        category: "Education",
        icon: "language_icon",
        condition: { habitId: 13, totalDuration: 6000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Language Expert",
        description: "Study a language for 250 hours",
        type: "Habit_milestone",
        category: "Education",
        icon: "language_icon",
        condition: { habitId: 13, totalDuration: 15000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Polyglot",
        description: "Study a language for 500 hours",
        type: "Habit_milestone",
        category: "Education",
        icon: "language_icon",
        condition: { habitId: 13, totalDuration: 30000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 14: Morning Routine
    {
        name: "Morning Person Initiate",
        description: "Complete morning routine for 7 days",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "morning_icon",
        condition: { habitId: 14, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Morning Person",
        description: "Complete morning routine for 30 days",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "morning_icon",
        condition: { habitId: 14, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Early Bird",
        description: "Complete morning routine for 90 days",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "morning_icon",
        condition: { habitId: 14, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Dawn Treader",
        description: "Complete morning routine for 180 days",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "morning_icon",
        condition: { habitId: 14, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Sunrise Legend",
        description: "Complete morning routine for 365 days",
        type: "Habit_streak",
        category: "Personal Development",
        icon: "morning_icon",
        condition: { habitId: 14, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 15: Skincare Routine
    {
        name: "Skincare Novice",
        description: "Complete skincare routine for 7 days",
        type: "Habit_streak",
        category: "Health",
        icon: "skincare_icon",
        condition: { habitId: 15, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Skincare Enthusiast",
        description: "Complete skincare routine for 30 days",
        type: "Habit_streak",
        category: "Health",
        icon: "skincare_icon",
        condition: { habitId: 15, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Skincare Adept",
        description: "Complete skincare routine for 90 days",
        type: "Habit_streak",
        category: "Health",
        icon: "skincare_icon",
        condition: { habitId: 15, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Skincare Expert",
        description: "Complete skincare routine for 180 days",
        type: "Habit_streak",
        category: "Health",
        icon: "skincare_icon",
        condition: { habitId: 15, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Skincare Guru",
        description: "Complete skincare routine for 365 days",
        type: "Habit_streak",
        category: "Health",
        icon: "skincare_icon",
        condition: { habitId: 15, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 16: Weekly Home Cleaning
    {
        name: "Tidy Beginner",
        description: "Complete weekly cleaning 4 times",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "cleaning_icon",
        condition: { habitId: 16, totalCount: 4 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Tidy Enthusiast",
        description: "Complete weekly cleaning 13 times",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "cleaning_icon",
        condition: { habitId: 16, totalCount: 13 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Tidy Expert",
        description: "Complete weekly cleaning 26 times",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "cleaning_icon",
        condition: { habitId: 16, totalCount: 26 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Tidy Master",
        description: "Complete weekly cleaning 52 times",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "cleaning_icon",
        condition: { habitId: 16, totalCount: 52 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Cleaning Guru",
        description: "Complete weekly cleaning 104 times",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "cleaning_icon",
        condition: { habitId: 16, totalCount: 104 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 17: Budget Review
    {
        name: "Budget Tracker",
        description: "Review budget for 4 weeks",
        type: "Habit_streak",
        category: "Finance",
        icon: "budget_icon",
        condition: { habitId: 17, streakDays: 28 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Budget Manager",
        description: "Review budget for 13 weeks",
        type: "Habit_streak",
        category: "Finance",
        icon: "budget_icon",
        condition: { habitId: 17, streakDays: 91 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Budget Expert",
        description: "Review budget for 26 weeks",
        type: "Habit_streak",
        category: "Finance",
        icon: "budget_icon",
        condition: { habitId: 17, streakDays: 182 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Financial Wizard",
        description: "Review budget for 52 weeks",
        type: "Habit_streak",
        category: "Finance",
        icon: "budget_icon",
        condition: { habitId: 17, streakDays: 364 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Financial Guru",
        description: "Review budget for 104 weeks",
        type: "Habit_streak",
        category: "Finance",
        icon: "budget_icon",
        condition: { habitId: 17, streakDays: 728 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 18: Reach Out to a Friend
    {
        name: "Social Starter",
        description: "Reach out to 5 friends",
        type: "Habit_milestone",
        category: "Social",
        icon: "friend_icon",
        condition: { habitId: 18, totalCount: 5 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Social Butterfly",
        description: "Reach out to 25 friends",
        type: "Habit_milestone",
        category: "Social",
        icon: "friend_icon",
        condition: { habitId: 18, totalCount: 25 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Social Networker",
        description: "Reach out to 50 friends",
        type: "Habit_milestone",
        category: "Social",
        icon: "friend_icon",
        condition: { habitId: 18, totalCount: 50 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Social Guru",
        description: "Reach out to 100 friends",
        type: "Habit_milestone",
        category: "Social",
        icon: "friend_icon",
        condition: { habitId: 18, totalCount: 100 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Socialist",
        description: "Reach out to 200 friends",
        type: "Habit_milestone",
        category: "Social",
        icon: "friend_icon",
        condition: { habitId: 18, totalCount: 200 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 19: Daily Sketching
    {
        name: "Sketch Novice",
        description: "Complete daily sketches for 7 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "sketch_icon",
        condition: { habitId: 19, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Sketch Enthusiast",
        description: "Complete daily sketches for 30 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "sketch_icon",
        condition: { habitId: 19, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Sketch Artist",
        description: "Complete daily sketches for 90 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "sketch_icon",
        condition: { habitId: 19, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Sketch Master",
        description: "Complete daily sketches for 180 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "sketch_icon",
        condition: { habitId: 19, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Sketch Virtuoso",
        description: "Complete daily sketches for 365 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "sketch_icon",
        condition: { habitId: 19, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 20: Reduce Plastic Use
    {
        name: "Eco Beginner",
        description: "Reduce plastic use for 7 days",
        type: "Habit_streak",
        category: "Environmental Consciousness",
        icon: "eco_icon",
        condition: { habitId: 20, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Eco Enthusiast",
        description: "Reduce plastic use for 30 days",
        type: "Habit_streak",
        category: "Environmental Consciousness",
        icon: "eco_icon",
        condition: { habitId: 20, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Eco Warrior",
        description: "Reduce plastic use for 90 days",
        type: "Habit_streak",
        category: "Environmental Consciousness",
        icon: "eco_icon",
        condition: { habitId: 20, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Eco Champion",
        description: "Reduce plastic use for 180 days",
        type: "Habit_streak",
        category: "Environmental Consciousness",
        icon: "eco_icon",
        condition: { habitId: 20, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Eco Legend",
        description: "Reduce plastic use for 365 days",
        type: "Habit_streak",
        category: "Environmental Consciousness",
        icon: "eco_icon",
        condition: { habitId: 20, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 21: Learn New Skill
    {
        name: "Skill Seeker",
        description: "Learn new skills for 5 hours",
        type: "Habit_milestone",
        category: "Professional Development",
        icon: "skill_icon",
        condition: { habitId: 21, totalDuration: 300 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Skill Enthusiast",
        description: "Learn new skills for 25 hours",
        type: "Habit_milestone",
        category: "Professional Development",
        icon: "skill_icon",
        condition: { habitId: 21, totalDuration: 1500 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Skill Adept",
        description: "Learn new skills for 50 hours",
        type: "Habit_milestone",
        category: "Professional Development",
        icon: "skill_icon",
        condition: { habitId: 21, totalDuration: 3000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Skill Master",
        description: "Learn new skills for 100 hours",
        type: "Habit_milestone",
        category: "Professional Development",
        icon: "skill_icon",
        condition: { habitId: 21, totalDuration: 6000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Skill Guru",
        description: "Learn new skills for 200 hours",
        type: "Habit_milestone",
        category: "Professional Development",
        icon: "skill_icon",
        condition: { habitId: 21, totalDuration: 12000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 22: Journaling
    {
        name: "Journal Starter",
        description: "Write in journal for 7 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "journal_icon",
        condition: { habitId: 22, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Journal Enthusiast",
        description: "Write in journal for 30 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "journal_icon",
        condition: { habitId: 22, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Journal Adept",
        description: "Write in journal for 90 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "journal_icon",
        condition: { habitId: 22, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Journal Master",
        description: "Write in journal for 180 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "journal_icon",
        condition: { habitId: 22, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Journaling Guru",
        description: "Write in journal for 365 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "journal_icon",
        condition: { habitId: 22, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 23: Daily Writing
    {
        name: "Writing Novice",
        description: "Write daily for 7 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "writing_icon",
        condition: { habitId: 23, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Writing Enthusiast",
        description: "Write daily for 30 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "writing_icon",
        condition: { habitId: 23, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Writing Adept",
        description: "Write daily for 90 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "writing_icon",
        condition: { habitId: 23, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Writing Master",
        description: "Write daily for 180 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "writing_icon",
        condition: { habitId: 23, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Writing Virtuoso",
        description: "Write daily for 365 days",
        type: "Habit_streak",
        category: "Creativity",
        icon: "writing_icon",
        condition: { habitId: 23, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 24: Music Production
    {
        name: "Music Producer Novice",
        description: "Produce music for 10 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_prod_icon",
        condition: { habitId: 24, totalDuration: 600 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Music Producer Enthusiast",
        description: "Produce music for 50 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_prod_icon",
        condition: { habitId: 24, totalDuration: 3000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Music Producer Adept",
        description: "Produce music for 100 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_prod_icon",
        condition: { habitId: 24, totalDuration: 6000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Music Producer Master",
        description: "Produce music for 250 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_prod_icon",
        condition: { habitId: 24, totalDuration: 15000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Music Production Guru",
        description: "Produce music for 500 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "music_prod_icon",
        condition: { habitId: 24, totalDuration: 30000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },
    {
        name: "Video Creator Novice",
        description: "Create videos for 10 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "video_icon",
        condition: { habitId: 25, totalDuration: 600 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Video Creator Enthusiast",
        description: "Create videos for 50 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "video_icon",
        condition: { habitId: 25, totalDuration: 3000 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Video Creator Adept",
        description: "Create videos for 100 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "video_icon",
        condition: { habitId: 25, totalDuration: 6000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Video Creator Master",
        description: "Create videos for 250 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "video_icon",
        condition: { habitId: 25, totalDuration: 15000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Video Production Guru",
        description: "Create videos for 500 hours",
        type: "Habit_milestone",
        category: "Creativity",
        icon: "video_icon",
        condition: { habitId: 25, totalDuration: 30000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 26: Reduce Screen Time
    {
        name: "Digital Detox Beginner",
        description: "Reduce screen time for 7 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "screen_icon",
        condition: { habitId: 26, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Digital Detox Enthusiast",
        description: "Reduce screen time for 30 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "screen_icon",
        condition: { habitId: 26, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Digital Detox Adept",
        description: "Reduce screen time for 90 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "screen_icon",
        condition: { habitId: 26, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Digital Detox Master",
        description: "Reduce screen time for 180 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "screen_icon",
        condition: { habitId: 26, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Digital Wellbeing Guru",
        description: "Reduce screen time for 365 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "screen_icon",
        condition: { habitId: 26, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 27: Limit Social Media
    {
        name: "Social Media Reducer",
        description: "Limit social media for 7 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "social_media_icon",
        condition: { habitId: 27, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Social Media Manager",
        description: "Limit social media for 30 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "social_media_icon",
        condition: { habitId: 27, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Social Media Master",
        description: "Limit social media for 90 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "social_media_icon",
        condition: { habitId: 27, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Social Media Guru",
        description: "Limit social media for 180 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "social_media_icon",
        condition: { habitId: 27, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Social Media Zen Master",
        description: "Limit social media for 365 days",
        type: "Habit_streak",
        category: "Digital Wellbeing",
        icon: "social_media_icon",
        condition: { habitId: 27, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 28: Reduce TV Watching
    {
        name: "TV Reducer",
        description: "Reduce TV watching for 7 days",
        type: "Habit_streak",
        category: "Lifestyle",
        icon: "tv_icon",
        condition: { habitId: 28, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "TV Manager",
        description: "Reduce TV watching for 30 days",
        type: "Habit_streak",
        category: "Lifestyle",
        icon: "tv_icon",
        condition: { habitId: 28, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "TV Master",
        description: "Reduce TV watching for 90 days",
        type: "Habit_streak",
        category: "Lifestyle",
        icon: "tv_icon",
        condition: { habitId: 28, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "TV Guru",
        description: "Reduce TV watching for 180 days",
        type: "Habit_streak",
        category: "Lifestyle",
        icon: "tv_icon",
        condition: { habitId: 28, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "TV-Free Legend",
        description: "Reduce TV watching for 365 days",
        type: "Habit_streak",
        category: "Lifestyle",
        icon: "tv_icon",
        condition: { habitId: 28, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 29: Tobacco Reduction
    {
        name: "Tobacco Reducer",
        description: "Reduce tobacco use for 7 days",
        type: "Habit_streak",
        category: "Health",
        icon: "tobacco_icon",
        condition: { habitId: 29, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Tobacco Manager",
        description: "Reduce tobacco use for 30 days",
        type: "Habit_streak",
        category: "Health",
        icon: "tobacco_icon",
        condition: { habitId: 29, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Tobacco Master",
        description: "Reduce tobacco use for 90 days",
        type: "Habit_streak",
        category: "Health",
        icon: "tobacco_icon",
        condition: { habitId: 29, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Tobacco Guru",
        description: "Reduce tobacco use for 180 days",
        type: "Habit_streak",
        category: "Health",
        icon: "tobacco_icon",
        condition: { habitId: 29, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Tobacco-Free Legend",
        description: "Reduce tobacco use for 365 days",
        type: "Habit_streak",
        category: "Health",
        icon: "tobacco_icon",
        condition: { habitId: 29, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 30: Alcohol Moderation
    {
        name: "Alcohol Moderator",
        description: "Moderate alcohol intake for 7 days",
        type: "Habit_streak",
        category: "Health",
        icon: "alcohol_icon",
        condition: { habitId: 30, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Alcohol Manager",
        description: "Moderate alcohol intake for 30 days",
        type: "Habit_streak",
        category: "Health",
        icon: "alcohol_icon",
        condition: { habitId: 30, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Alcohol Master",
        description: "Moderate alcohol intake for 90 days",
        type: "Habit_streak",
        category: "Health",
        icon: "alcohol_icon",
        condition: { habitId: 30, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Alcohol Guru",
        description: "Moderate alcohol intake for 180 days",
        type: "Habit_streak",
        category: "Health",
        icon: "alcohol_icon",
        condition: { habitId: 30, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Sobriety Champion",
        description: "Moderate alcohol intake for 365 days",
        type: "Habit_streak",
        category: "Health",
        icon: "alcohol_icon",
        condition: { habitId: 30, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 31: Mindful Breathing
    {
        name: "Breathing Novice",
        description: "Practice mindful breathing for 7 days",
        type: "Habit_streak",
        category: "Stress Management",
        icon: "breathing_icon",
        condition: { habitId: 31, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Breathing Enthusiast",
        description: "Practice mindful breathing for 30 days",
        type: "Habit_streak",
        category: "Stress Management",
        icon: "breathing_icon",
        condition: { habitId: 31, streakDays: 30 },
        reward: { xp: 150 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Breathing Adept",
        description: "Practice mindful breathing for 90 days",
        type: "Habit_streak",
        category: "Stress Management",
        icon: "breathing_icon",
        condition: { habitId: 31, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Breathing Master",
        description: "Practice mindful breathing for 180 days",
        type: "Habit_streak",
        category: "Stress Management",
        icon: "breathing_icon",
        condition: { habitId: 31, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Zen Breather",
        description: "Practice mindful breathing for 365 days",
        type: "Habit_streak",
        category: "Stress Management",
        icon: "breathing_icon",
        condition: { habitId: 31, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 32: Daily Affirmations
    {
        name: "Affirmation Beginner",
        description: "Practice daily affirmations for 7 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "affirmation_icon",
        condition: { habitId: 32, streakDays: 7 },
        reward: { xp: 50 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Affirmation Adept",
        description: "Practice daily affirmations for 90 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "affirmation_icon",
        condition: { habitId: 32, streakDays: 90 },
        reward: { xp: 300 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Affirmation Master",
        description: "Practice daily affirmations for 180 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "affirmation_icon",
        condition: { habitId: 32, streakDays: 180 },
        reward: { xp: 500 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Positivity Guru",
        description: "Practice daily affirmations for 365 days",
        type: "Habit_streak",
        category: "Mental Health",
        icon: "affirmation_icon",
        condition: { habitId: 32, streakDays: 365 },
        reward: { xp: 1000 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 33: Declutter
    {
        name: "Declutter Novice",
        description: "Declutter for 5 hours",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "declutter_icon",
        condition: { habitId: 33, totalDuration: 300 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Declutter Enthusiast",
        description: "Declutter for 25 hours",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "declutter_icon",
        condition: { habitId: 33, totalDuration: 1500 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Declutter Adept",
        description: "Declutter for 50 hours",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "declutter_icon",
        condition: { habitId: 33, totalDuration: 3000 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Declutter Master",
        description: "Declutter for 100 hours",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "declutter_icon",
        condition: { habitId: 33, totalDuration: 6000 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Minimalism Guru",
        description: "Declutter for 200 hours",
        type: "Habit_milestone",
        category: "Productivity",
        icon: "declutter_icon",
        condition: { habitId: 33, totalDuration: 12000 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 34: Networking
    {
        name: "Network Starter",
        description: "Make 5 professional connections",
        type: "Habit_milestone",
        category: "Career Development",
        icon: "network_icon",
        condition: { habitId: 34, totalCount: 5 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Network Builder",
        description: "Make 25 professional connections",
        type: "Habit_milestone",
        category: "Career Development",
        icon: "network_icon",
        condition: { habitId: 34, totalCount: 25 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Network Expander",
        description: "Make 50 professional connections",
        type: "Habit_milestone",
        category: "Career Development",
        icon: "network_icon",
        condition: { habitId: 34, totalCount: 50 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Network Master",
        description: "Make 100 professional connections",
        type: "Habit_milestone",
        category: "Career Development",
        icon: "network_icon",
        condition: { habitId: 34, totalCount: 100 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Networking Guru",
        description: "Make 200 professional connections",
        type: "Habit_milestone",
        category: "Career Development",
        icon: "network_icon",
        condition: { habitId: 34, totalCount: 200 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    },

    // Habit 35: Meal Planning
    {
        name: "Meal Planner Beginner",
        description: "Plan meals for 4 weeks",
        type: "Habit_streak",
        category: "Health",
        icon: "meal_plan_icon",
        condition: { habitId: 35, streakDays: 28 },
        reward: { xp: 100 },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Meal Planner Enthusiast",
        description: "Plan meals for 13 weeks",
        type: "Habit_streak",
        category: "Health",
        icon: "meal_plan_icon",
        condition: { habitId: 35, streakDays: 91 },
        reward: { xp: 250 },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Meal Planner Adept",
        description: "Plan meals for 26 weeks",
        type: "Habit_streak",
        category: "Health",
        icon: "meal_plan_icon",
        condition: { habitId: 35, streakDays: 182 },
        reward: { xp: 500 },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Meal Planner Master",
        description: "Plan meals for 52 weeks",
        type: "Habit_streak",
        category: "Health",
        icon: "meal_plan_icon",
        condition: { habitId: 35, streakDays: 364 },
        reward: { xp: 750 },
        tier: "platinum",
        isRepeatable: false
    },
    {
        name: "Nutrition Planning Guru",
        description: "Plan meals for 104 weeks",
        type: "Habit_streak",
        category: "Health",
        icon: "meal_plan_icon",
        condition: { habitId: 35, streakDays: 728 },
        reward: { xp: 1500 },
        tier: "diamond",
        isRepeatable: false
    }
];

export default achievements;