import Achievement from '../models/Achievement.js';

const generateLevelThresholds = async (maxLevel) => {
    const levelThresholds = [];
    let totalXp = 0;

    for (let i = 2; i <= maxLevel; i++) {
        const xpRequired = Math.floor(100 * (1.1 ** (i - 1)));
        totalXp += xpRequired;

        const levelData = {
            level: i,
            xpRequired,
            totalXpRequired: totalXp,
            rewards: {}
        };

        // Add milestones
        if ([5, 10, 25, 50, 75, 100].includes(i)) {
            const achievement = await createLevelAchievement(i);
            levelData.rewards.achievementId = achievement._id;
            levelData.rewards.xpBoost = getLevelXpBoost(i);
            levelData.featureUnlock = getFeatureUnlock(i);
        }

        levelThresholds.push(levelData);
    }

    return levelThresholds;
};

const createLevelAchievement = async (level) => {
    const achievement = new Achievement({
        name: `Reach Level ${level}`,
        description: `Achieve level ${level} in your personal growth journey.`,
        type: 'Level',
        category: 'General',
        condition: { level },
        reward: { xp: level * 10 },
        tier: getTierForLevel(level),
        isRepeatable: false
    });

    await achievement.save();
    return achievement;
};

const getLevelXpBoost = (level) => {
    const boosts = { 5: 1.05, 10: 1.1, 25: 1.15, 50: 1.2, 75: 1.25, 100: 1.3 };
    return boosts[level] || 1;
};

const getFeatureUnlock = (level) => {
    const features = {
        5: 'Custom User Avatars',
        10: 'Enable Users to Upload Avatars',
        15: 'Weekly Progress Summary',
        25: 'Habit Streaks Tracking',
        50: 'Advanced Habit Analytics',
        75: 'Custom Habit Creation',
        100: 'Mentor Status'
    };
    return features[level] || '';
};

const getTierForLevel = (level) => {
    if (level <= 10) return 'bronze';
    if (level <= 25) return 'silver';
    if (level <= 50) return 'gold';
    if (level <= 75) return 'platinum';
    return 'diamond';
};

export default generateLevelThresholds;