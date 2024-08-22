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
        enum: ['Login_streak', 'Habit_streak', 'Habit_milestone', 'Social', 'Level', 'Custom'],
        required: true
    },
    category: {
        type: String,
        enum: ['General', 'Health', 'Education', 'Finance', 'Productivity', 'Creativity', 'Social', 'Learning', 'Personal Development', 'Mental Health', 'Environmental Consciousness', 'Professional Development', 'Digital Wellbeing', 'Lifestyle',
            'Stress Management', 'Career Development', 'Other'],
        required: true
    },
    icon: String,
    condition: {
        habitId: Number,
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