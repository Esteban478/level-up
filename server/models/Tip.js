import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['General', 'Habit Loop - Cue', 'Habit Loop - Craving', 'Habit Loop - Response', 'Habit Loop - Reward', 'Habit-Specific'],
        default: 'General',
        required: true,
    },
    relatedAreas: [{
        type: String,
        enum: ['Health', 'Fitness', 'Mental Health', 'Productivity', 'Personal Development',
            'Skill Development', 'Education', 'Creativity', 'Home Management',
            'Finance', 'Social', 'Environmental Consciousness',
            'Professional Development', 'Digital Wellbeing', 'Lifestyle',
            'Stress Management', 'Career Development', 'Other', 'All'],
    }],
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    }
}, { timestamps: true });

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;