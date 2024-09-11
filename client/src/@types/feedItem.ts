export interface AchievementContent {
  name: string;
  description: string;
  xpReward: number;
}

export interface TipContent {
  content: string;
  category: string;
}

export interface FeedItem {
  _id: string;
  type: 'achievement' | 'tip';
  content: AchievementContent | TipContent;
  timestamp: string;
}

export interface FeedItemProps {
  item: FeedItem;
}

export interface FeedResponse {
  feedItems: FeedItem[];
  hasMore: boolean;
  totalItems: number;
}