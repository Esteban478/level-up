import mongoose from 'mongoose';
import AuditLog from './AuditLog.js';

const habitLogSchema = new mongoose.Schema({
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

// Index for efficient querying
habitLogSchema.index({ habitId: 1, date: -1 });
habitLogSchema.index({ userId: 1, date: -1 });

// Static method to log a habit completion
habitLogSchema.statics.logCompletion = async function (habitId, userId, value, date = new Date(), notes = '') {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const Habit = mongoose.model('Habit');
        const habit = await Habit.findById(habitId).session(session);

        if (!habit) {
            throw new Error('Habit not found');
        }

        const log = new this({
            habitId,
            userId,
            date: new Date(date), // Ensure date is a Date object
            value,
            notes
        });

        await log.save({ session });

        habit.totalCompletions += 1;
        await habit.updateStreak(new Date(date), session);
        await habit.save({ session });

        await session.commitTransaction();
        session.endSession();

        return log;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Static method for bulk insertion of habit logs
habitLogSchema.statics.bulkLogCompletions = async function (logs) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const Habit = mongoose.model('Habit');
        const bulkLogs = [];
        const habitUpdates = new Map();

        for (const log of logs) {
            bulkLogs.push(new this(log));

            if (!habitUpdates.has(log.habitId)) {
                habitUpdates.set(log.habitId, { count: 0, latestDate: null });
            }
            const update = habitUpdates.get(log.habitId);
            update.count++;
            if (!update.latestDate || log.date > update.latestDate) {
                update.latestDate = log.date;
            }
        }

        await this.insertMany(bulkLogs, { session });

        for (const [habitId, update] of habitUpdates) {
            const habit = await Habit.findById(habitId).session(session);
            if (!habit) {
                throw new Error(`Habit not found: ${habitId}`);
            }
            habit.totalCompletions += update.count;
            await habit.updateStreak(update.latestDate, session);
            await habit.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return bulkLogs;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Static method to undo a habit log entry only within 24 hours
habitLogSchema.statics.undoLogEntry = async function (logId, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const Habit = mongoose.model('Habit');
        const logEntry = await this.findById(logId).session(session);

        if (!logEntry) {
            throw new Error('Log entry not found');
        }

        // Check if the log entry is within the last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        if (logEntry.date < twentyFourHoursAgo) {
            throw new Error('Cannot undo entries older than 24 hours');
        }

        // Check if the user performing the undo is the owner of the log entry
        if (logEntry.userId.toString() !== userId.toString()) {
            throw new Error('Unauthorized: You can only undo your own log entries');
        }

        const habit = await Habit.findById(logEntry.habitId).session(session);

        if (!habit) {
            throw new Error('Associated habit not found');
        }

        // Remove the log entry
        await this.findByIdAndDelete(logId, { session });

        // Update the habit's totalCompletions
        habit.totalCompletions = Math.max(0, habit.totalCompletions - 1);

        // Recalculate the streak
        const latestLog = await this.findOne({
            habitId: habit._id,
            date: { $lt: logEntry.date }
        }).sort({ date: -1 }).session(session);

        if (latestLog) {
            await habit.updateStreak(latestLog.date, session);
        } else {
            habit.streak.current = 0;
        }

        await habit.save({ session });

        // Create audit log
        const auditLog = new AuditLog({
            action: 'UNDO_HABIT_LOG',
            performedBy: userId,
            affectedResource: `HabitLog:${logId}`,
            details: {
                habitId: habit._id,
                date: logEntry.date,
                value: logEntry.value
            }
        });
        await auditLog.save({ session });

        await session.commitTransaction();
        session.endSession();

        return { success: true, message: 'Log entry successfully undone' };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Static method to get logs for a specific habit within a date range
habitLogSchema.statics.getLogsForHabit = async function (habitId, startDate, endDate) {
    return this.find({
        habitId,
        date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });
};

// Static method to get all logs for a user within a date range
habitLogSchema.statics.getLogsForUser = async function (userId, startDate, endDate) {
    return this.find({
        userId,
        date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 }).populate('habitId');
};

// Static method to calculate completion rate for a habit
habitLogSchema.statics.getCompletionRate = async function (habitId, startDate, endDate) {
    const logs = await this.find({
        habitId,
        date: { $gte: startDate, $lte: endDate }
    });

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const completedDays = logs.length;

    return completedDays / totalDays;
};

const HabitLog = mongoose.model('HabitLog', habitLogSchema);

export default HabitLog;