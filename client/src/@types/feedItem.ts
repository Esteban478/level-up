import { User } from "./user";
import { Tip } from "./tip";

export interface FeedItem {
  _id: string;
  type: 'achievement' | 'friendAchievement' | 'tip' | 'newFriend';
  content: {
    achievementId?: string;
    name?: string;
    description?: string;
    xpReward?: number;
    friend: User;
    tip?: Tip;
    isFollowingBack?: boolean;
  };
  timestamp: string;
  user: User;
  congratulations: string[];
}

export interface FeedItemProps {
  item: FeedItem;
  onCongratulate: (achievementId: string, friendId: string) => Promise<number>;
}

export interface FeedResponse {
  feedItems: FeedItem[];
  hasMore: boolean;
  totalItems: number;
}