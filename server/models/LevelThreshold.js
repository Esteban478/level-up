import mongoose from 'mongoose';

const levelThresholdSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
        unique: true,
        min: 1
    },
    xpRequired: {
        type: Number,
        required: true,
        min: 0
    },
    totalXpRequired: {
        type: Number,
        required: true,
        min: 0
    },
    reward: {
        xpBoost: Number,
        badge: String,
        featureUnlock: String
    }
});

const LevelThreshold = mongoose.model('LevelThreshold', levelThresholdSchema);

export default LevelThreshold;

// Function to generate level thresholds with a custom formula
function generateLevelThresholds(maxLevel) {
    const thresholds = [];
    let totalXp = 0;

    for (let level = 1; level <= maxLevel; level++) {
        const xpRequired = Math.floor(100 * Math.pow(level, 1.5));
        totalXp += xpRequired;

        const threshold = {
            level,
            xpRequired,
            totalXpRequired: totalXp
        };

        // Add rewards at milestone levels
        if (level % 5 === 0) {
            threshold.reward = {
                xpBoost: 1 + (level / 100),
                badge: `Level ${level} Master`,
                featureUnlock: level === 25 ? "Custom Avatars" : (level === 50 ? "Habit Sharing" : undefined)
            };
        }

        thresholds.push(threshold);
    }

    return thresholds;
}

// Generate 100 levels as an example
const generatedLevels = generateLevelThresholds(100);

// You can now use generatedLevels to populate your database