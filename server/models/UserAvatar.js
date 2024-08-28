import mongoose from 'mongoose';

const userAvatarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    avatarType: {
        type: String,
        enum: ['placeholder', 'generated', 'custom'],
        default: 'placeholder'
    }
}, { timestamps: true });

const UserAvatar = mongoose.model('UserAvatar', userAvatarSchema);

export default UserAvatar;