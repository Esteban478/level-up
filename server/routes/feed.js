import express from 'express';
import { createFeedItem, getFeedItems } from '../controllers/feed.js';
import { authMiddleware } from '../middleware/auth.js';

const feedRouter = express.Router();

feedRouter.use(authMiddleware);

feedRouter.post('/', createFeedItem);
feedRouter.get('/', getFeedItems);

export default feedRouter;