const achievementLocks = new Map();

export const acquireLock = async (userId, achievementId) => {
    const lockKey = `${userId}-${achievementId}`;
    if (achievementLocks.has(lockKey)) {
        return false;
    }
    achievementLocks.set(lockKey, true);
    return true;
};

export const releaseLock = (userId, achievementId) => {
    const lockKey = `${userId}-${achievementId}`;
    achievementLocks.delete(lockKey);
};