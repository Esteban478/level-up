import { User } from "./user";

export interface TipContent {
  content: string;
  category: string;
}

export interface FeedItem {
  _id: string;
  type: 'achievement' | 'friendAchievement' | 'tip';
  content: AchievementContent | TipContent;
  timestamp: string;
  user: User;
}

export interface AchievementContent {
  name: string;
  description: string;
  xpReward: number;
  isOwnAchievement?: boolean;
  friendId?: string;
  friendUsername?: string;
  friendAvatar?: string;
}

export interface FeedItemProps {
  item: FeedItem;
}

export interface FeedResponse {
  feedItems: FeedItem[];
  hasMore: boolean;
  totalItems: number;
}