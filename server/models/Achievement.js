import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['login_streak', 'habit_streak', 'habit_milestone', 'social', 'level', 'custom'],
        required: true
    },
    category: {
        type: String,
        enum: ['general', 'health', 'productivity', 'social', 'learning'],
        required: true
    },
    icon: String,
    condition: {
        habitId: mongoose.Schema.Types.ObjectId,
        streakDays: Number,
        totalCount: Number,
        level: Number,
        friendCount: Number,
        customCondition: mongoose.Schema.Types.Mixed
    },
    reward: {
        xp: Number,
        badge: String
    },
    tier: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
        required: true
    },
    isRepeatable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;

// Example achievements
const exampleAchievements = [
    {
        name: "10-Day Warrior",
        description: "Logged in for 10 days in a row",
        type: "login_streak",
        category: "general",
        icon: "streak_icon",
        condition: { streakDays: 10 },
        reward: { xp: 100, badge: "10day_badge" },
        tier: "bronze",
        isRepeatable: false
    },
    {
        name: "Hydration Master",
        description: "Drank enough water for 30 days in a row",
        type: "habit_streak",
        category: "health",
        icon: "water_icon",
        condition: { habitId: "water_habit_id", streakDays: 30 },
        reward: { xp: 300, badge: "hydration_master_badge" },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Marathon Runner",
        description: "Ran a total of 1000 miles",
        type: "habit_milestone",
        category: "health",
        icon: "running_icon",
        condition: { habitId: "running_habit_id", totalCount: 1000 },
        reward: { xp: 1000, badge: "marathon_badge" },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Social Butterfly",
        description: "Made 10 friends on the app",
        type: "social",
        category: "social",
        icon: "friend_icon",
        condition: { friendCount: 10 },
        reward: { xp: 200, badge: "social_badge" },
        tier: "silver",
        isRepeatable: false
    },
    {
        name: "Level 10 Achiever",
        description: "Reached level 10",
        type: "level",
        category: "general",
        icon: "level_icon",
        condition: { level: 10 },
        reward: { xp: 500, badge: "level_10_badge" },
        tier: "gold",
        isRepeatable: false
    },
    {
        name: "Weekly Workout Wonder",
        description: "Completed workouts twice a week for 4 weeks",
        type: "custom",
        category: "health",
        icon: "workout_icon",
        condition: {
            customCondition: {
                habitId: "workout_habit_id",
                weeksCompleted: 4,
                weeklyTarget: 2
            }
        },
        reward: { xp: 400, badge: "workout_wonder_badge" },
        tier: "silver",
        isRepeatable: true
    }
];