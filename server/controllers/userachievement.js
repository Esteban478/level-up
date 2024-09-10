import UserAchievement from '../models/UserAchievement.js';

export const getUserAchievements = async (req, res) => {
    try {
        const userAchievements = await UserAchievement.find({ userId: req.user._id })
            .populate('achievementId')
            .sort('-dateEarned');

        const formattedAchievements = userAchievements.map(ua => ({
            id: ua._id,
            name: ua.achievementId.name,
            description: ua.achievementId.description,
            xpReward: ua.achievementId.reward.xp,
            dateEarned: ua.dateEarned,
            icon: ua.achievementId.icon,
            type: ua.achievementId.type  // Add this line
        }));

        res.status(200).json(formattedAchievements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user achievements", error: error.message });
    }
};

export const createUserAchievement = async (req, res) => {
    try {
        const { achievementId } = req.body;
        const newUserAchievement = new UserAchievement({
            userId: req.user._id,
            achievementId,
            dateEarned: new Date()
        });
        const savedUserAchievement = await newUserAchievement.save();
        res.status(201).json(savedUserAchievement);
    } catch (error) {
        res.status(400).json({ message: "Error creating user achievement", error: error.message });
    }
};

export const deleteUserAchievement = async (req, res) => {
    try {
        const deletedUserAchievement = await UserAchievement.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!deletedUserAchievement) {
            return res.status(404).json({ message: "User achievement not found or you don't have permission to delete it" });
        }
        res.status(200).json({ message: "User achievement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user achievement", error: error.message });
    }
};