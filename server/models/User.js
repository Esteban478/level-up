import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: String,
    bio: String,
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    },
    totalXp: {
        type: Number,
        default: 0
    },
    streakDays: {
        type: Number,
        default: 0
    },
    lastLoginDate: Date,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    achievements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
    }],
    settings: {
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true }
        },
        privacy: {
            profileVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
            activityVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'friends' }
        }
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

// Virtual for getting active habits
userSchema.virtual('activeHabits', {
    ref: 'Habit',
    localField: '_id',
    foreignField: 'userId'
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to add XP and level up if necessary
userSchema.methods.addXP = async function (amount, source, metadata = {}) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create XP transaction
        const transaction = new XPTransaction({
            userId: this._id,
            amount,
            source,
            metadata
        });
        await transaction.save({ session });

        // Update user's XP
        this.xp += amount;
        this.totalXp += amount;

        // Check for level up
        const nextLevel = await LevelThreshold.findOne({ totalXpRequired: { $gt: this.totalXp } }).sort('Level').limit(1);
        if (nextLevel && this.level < nextLevel.level - 1) {
            this.level = nextLevel.level - 1;
            // Apply level-up rewards here
        }

        await this.save({ session });

        await session.commitTransaction();
        session.endSession();

        return transaction;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Example usage:
// await user.addXP(50, 'Habit_completion', { habitId: habit._id });

// Method to update streak
userSchema.methods.updateStreak = async function () {
    const today = new Date().setHours(0, 0, 0, 0);
    if (this.lastLoginDate && this.lastLoginDate.setHours(0, 0, 0, 0) === today - 86400000) {
        this.streakDays += 1;
    } else if (!this.lastLoginDate || this.lastLoginDate.setHours(0, 0, 0, 0) < today - 86400000) {
        this.streakDays = 1;
    }
    this.lastLoginDate = new Date();
    await this.save();
};

const User = mongoose.model('User', userSchema);

export default User;