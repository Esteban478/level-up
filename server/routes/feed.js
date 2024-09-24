import express from 'express';
import { createFeedItem, getFeedItems, congratulateAchievement, refreshCongratulations } from '../controllers/feed.js';
import { authMiddleware } from '../middleware/auth.js';

const feedRouter = express.Router();

feedRouter.use(authMiddleware);

feedRouter.post('/', createFeedItem);
feedRouter.get('/', getFeedItems);
feedRouter.post('/congratulate', congratulateAchievement);
feedRouter.get('/refresh-congratulations', authMiddleware, refreshCongratulations);



export default feedRouter;