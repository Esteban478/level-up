import Tip from '../models/Tip.js';
import User from '../models/User.js';
import FeedItem from '../models/FeedItem.js';

export const selectTipForUser = async (userId, forceGeneration = true, recursionCount = 0) => {
    try {
        // Add a recursion limit to prevent infinite loops
        if (recursionCount > 1) {
            console.log('Recursion limit reached. Unable to find eligible tips.');
            return null;
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error(`User not found for ID: ${userId}`);
            return null;
        }

        const userHabits = user.habits && user.habits.length > 0 ? user.habits.map(h => h.area) : ['General'];
        console.log(`User habits: ${userHabits.join(', ')}`);

        const currentDate = new Date();
        const daysSinceLastTip = user.lastTipDate ? Math.floor((currentDate - user.lastTipDate) / (1000 * 60 * 60 * 24)) : Infinity;

        if (!forceGeneration && daysSinceLastTip < 2) {
            console.log(`Not generating new tip. Days since last tip: ${daysSinceLastTip}`);
            return null;
        }

        const eligibleTips = await Tip.find({
            $or: [
                { category: { $in: userHabits } },
                { category: 'General' }
            ],
            _id: { $nin: user.viewedTips || [] }
        });

        if (eligibleTips.length === 0) {
            user.viewedTips = [];
            await user.save();
            return selectTipForUser(userId, true, recursionCount + 1);
        }

        const selectedTip = eligibleTips[Math.floor(Math.random() * eligibleTips.length)];
        user.viewedTips = user.viewedTips || [];
        user.viewedTips.push(selectedTip._id);
        user.lastTipDate = currentDate;
        await user.save();

        await FeedItem.create({
            user: userId,
            type: 'tip',
            content: {
                tipId: selectedTip._id,
                content: selectedTip.content,
                category: selectedTip.category
            }
        });

        return selectedTip;
    } catch (error) {
        console.error('Error in selectTipForUser:', error);
        return null;
    }
};