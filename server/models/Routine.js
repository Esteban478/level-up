import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: [Number], // To maintain the order of habits in the routine
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;