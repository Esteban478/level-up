import { FeedItem, User, Habit, HabitLog } from '../models/index.js';
import mongoose from 'mongoose';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('avatar')
            .populate({
                path: 'friends',
                select: 'username avatar',
                populate: {
                    path: 'avatar',
                    model: 'UserAvatar'
                }
            });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, email, bio, settings, currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select('+password').session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'User not found' });
        }

        // Handle password change if provided
        if (currentPassword && newPassword) {
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                await session.abortTransaction();
                return res.status(400).json({ error: 'Current password is incorrect' });
            }
            user.password = newPassword
        }

        // Update other fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (settings) {
            user.settings = {
                ...user.settings,
                notifications: {
                    ...user.settings.notifications,
                    ...settings.notifications
                },
                privacy: {
                    ...user.settings.privacy,
                    ...settings.privacy
                }
            };
        }

        await user.save({ session });
        await session.commitTransaction();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json(userResponse);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ error: error.message });
    } finally {
        session.endSession();
    }
};

export const getUserHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });

        // Get today's date (start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch today's logs for the user
        const todayLogs = await HabitLog.find({
            userId: req.user._id,
            date: { $gte: today }
        });

        // Create a Set of habit IDs that have been logged today
        const loggedHabitIds = new Set(todayLogs.map(log => log.habitId.toString()));

        // Add isTrackedToday field to each habit
        const habitsWithTrackingStatus = habits.map(habit => ({
            ...habit.toObject(),
            isTrackedToday: loggedHabitIds.has(habit._id.toString())
        }));

        res.json(habitsWithTrackingStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserXPAndLevel = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('xp level');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ xp: user.xp, level: user.level });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPublicActiveHabits = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id;
        const habits = await Habit.find({
            userId: userId,
            isPublic: true,
            isArchived: false
        }).select('name streak');
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { term } = req.query;
        const currentUserId = req.user._id; // Assuming the auth middleware adds the user to the request

        const users = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: term, $options: 'i' } },
                        { email: { $regex: term, $options: 'i' } }
                    ]
                },
                { _id: { $ne: currentUserId } } // Exclude the current user
            ]
        })
            .select('username avatar')
            .populate('avatar')
            .limit(10);

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addFriend = async (req, res) => {
    try {
        const { friendId, currentUserId } = req.body;

        const [currentUser, friend] = await Promise.all([
            User.findById(currentUserId).select('username avatar friends').populate('avatar'),
            User.findById(friendId).select('username avatar friends').populate('avatar')
        ]);

        if (!currentUser || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }

        let isNewFriendship = false;

        if (!currentUser.friends.includes(friendId)) {
            currentUser.friends.push(friendId);
            await currentUser.save();
            isNewFriendship = true;
        }

        // Check if it's a mutual friendship
        const isFollowingBack = friend.friends.includes(currentUser._id);

        if (isNewFriendship) {
            // Create a new feed item for the friend
            const newFeedItem = new FeedItem({
                type: 'newFriend',
                user: friendId, // This is the friend's ID, as the feed item is for them
                content: {
                    friend: {
                        _id: currentUser._id,
                        username: currentUser.username,
                        avatar: currentUser.avatar
                    },
                    isFollowingBack
                },
                timestamp: new Date()
            });

            await newFeedItem.save();
        }

        res.json({ message: 'Friend added successfully', isFollowingBack });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ error: 'An error occurred while adding friend' });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'friends',
            select: 'username avatar',
            populate: {
                path: 'avatar',
                model: 'UserAvatar'
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFriendProfile = async (req, res) => {
    try {
        const { friendId } = req.params;
        const currentUser = await User.findById(req.user._id);

        if (!currentUser.friends.includes(friendId)) {
            return res.status(403).json({ error: 'You are not friends with this user' });
        }

        const friendProfile = await User.findById(friendId)
            .select('-password -email')
            .populate('avatar')
            .populate({
                path: 'friends',
                select: 'username avatar',
                populate: {
                    path: 'avatar',
                    model: 'UserAvatar'
                }
            });

        if (!friendProfile) {
            return res.status(404).json({ error: 'Friend not found' });
        }

        // Check privacy settings
        if (friendProfile.settings.privacy.profileVisibility === 'private') {
            return res.json({
                _id: friendProfile._id,
                username: friendProfile.username,
                avatar: friendProfile.avatar,
                settings: {
                    privacy: {
                        profileVisibility: 'private'
                    }
                }
            });
        }

        res.json(friendProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};