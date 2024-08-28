import express from 'express';
import { generateAvatar, uploadAvatar, getAvatar, deleteAvatar } from '../controllers/useravatar.js';
import { authMiddleware } from '../middleware/auth.js';
import multerUpload from '../middleware/multer.js';
import multer from 'multer';

const userAvatarRouter = express.Router();

userAvatarRouter.post('/generate', authMiddleware, generateAvatar);
userAvatarRouter.post('/upload', authMiddleware, (req, res, next) => {
    multerUpload.single('avatar')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, uploadAvatar);
userAvatarRouter.get('/:userId', authMiddleware, getAvatar);
userAvatarRouter.delete('/:userId', authMiddleware, deleteAvatar);

export default userAvatarRouter;