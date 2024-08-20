import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    area: {
        type: String,
        enum: ['Health', 'Fitness', 'Mental Health', 'Productivity', 'Personal Development', 'Skill Development', 'Education', 'Creativity', 'Home Management', 'Financial Health', 'Social Connection', 'Environmental Consciousness', 'Professional Development', 'Digital Wellbeing', 'Lifestyle', 'Stress Management', 'Career Development', 'Other'],
        default: 'Other'
    },
    type: {
        type: String,
        enum: ['Boolean', 'Numeric', 'Duration', 'Checklist'],
        required: true
    },
    frequency: {
        type: {
            type: String,
            enum: ['Daily', 'Weekly', 'Monthly'],
            required: true
        },
        daysOfWeek: {
            type: [Number],
            validate: {
                validator: function (v) {
                    return this.frequency.type !== 'Weekly' || (v && v.length > 0);
                },
                message: 'Weekly habits must specify at least one day of the week'
            }
        },
        daysOfMonth: {
            type: [Number],
            validate: {
                validator: function (v) {
                    return this.frequency.type !== 'Monthly' || (v && v.length > 0);
                },
                message: 'Monthly habits must specify at least one day of the month'
            }
        }
    },
    goal: {
        type: {
            type: String,
            enum: ['atLeast', 'atMost', 'exactly'],
            required: true
        },
        value: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        unit: String,
        direction: {
            type: String,
            enum: ['increase', 'decrease', 'maintain'],
            default: 'increase'
        }
    },
    xpReward: {
        base: {
            type: Number,
            required: true
        },
        max: Number
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    streak: {
        current: { type: Number, default: 0 },
        longest: { type: Number, default: 0 }
    },
    totalCompletions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Method to log a habit completion
habitSchema.methods.logCompletion = async function (value, date = new Date()) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const HabitLog = mongoose.model('HabitLog');
        const log = new HabitLog({
            habitId: this._id,
            userId: this.userId,
            date,
            value
        });
        await log.save({ session });

        this.totalCompletions += 1;
        await this.updateStreak(date);
        await this.save({ session });

        // If everything succeeded, commit the transaction
        await session.commitTransaction();
        session.endSession();

        return log;
    } catch (error) {
        // If an error occurred, abort the transaction and roll back any changes
        await session.abortTransaction();
        session.endSession();
        throw error; // Re-throw the error for the calling function to handle
    }
};

// Method to update streak
habitSchema.methods.updateStreak = async function (date = new Date(), session) {
    const HabitLog = mongoose.model('HabitLog');
    const midnight = new Date(date.setHours(0, 0, 0, 0));
    const oneDayAgo = new Date(midnight - 24 * 60 * 60 * 1000);

    const yesterdayLog = await HabitLog.findOne({
        habitId: this._id,
        date: { $gte: oneDayAgo, $lt: midnight }
    }).session(session);

    if (yesterdayLog) {
        this.streak.current += 1;
        if (this.streak.current > this.streak.longest) {
            this.streak.longest = this.streak.current;
        }
    } else {
        this.streak.current = 1;
    }
};

// Static method to get habits due today for a user
habitSchema.statics.getDueToday = async function (userId) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOfMonth = today.getDate();

    return this.find({
        userId,
        $or: [
            { 'frequency.type': 'daily' },
            {
                'frequency.type': 'weekly',
                'frequency.daysOfWeek': dayOfWeek
            },
            {
                'frequency.type': 'monthly',
                'frequency.daysOfMonth': dayOfMonth
            }
        ]
    });
};

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;