import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['starting', 'maintaining', 'overcoming obstacles', 'general'],
        required: true,
    },
    relatedHabitTypes: [{
        type: String,
        enum: ['boolean', 'numeric', 'duration', 'checklist'],
    }],
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    source: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;