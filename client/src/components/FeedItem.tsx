import React from 'react';
import { FeedItemProps, AchievementContent, TipContent } from "../@types/feedItem";
import { formatDistanceToNow } from "../utils/formatDate";

const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  const { type, content, timestamp, user } = item;

  const renderContent = () => {
    switch (type) {
      case 'achievement':
        {
          const achievementContent = content as AchievementContent;
          return (
            <div className="achievement-feed-item">
              <p>You achieved:</p>
              <h3>{achievementContent.name}</h3>
              <p>{achievementContent.description}</p>
              <p>XP Earned: {achievementContent.xpReward}</p>
            </div>
          );
        }
      case 'friendAchievement':
        {
          const achievementContent = content as AchievementContent;
          return (
            <div className="friend-achievement-feed-item">
              <p><strong>{achievementContent.friendUsername}</strong> achieved:</p>
              <h3>{achievementContent.name}</h3>
              <p>{achievementContent.description}</p>
              <p>XP Earned: {achievementContent.xpReward}</p>
            </div>
          );
        }
      case 'tip':
        {
          const tipContent = content as TipContent;
          return (
            <div className="tip-feed-item">
              <h3>Daily Tip</h3>
              <p>{tipContent.content}</p>
            </div>
          );
        }
      default:
        return <p>Unknown feed item type</p>;
    }
  };

  const getAvatarUrl = () => {
    if (type === 'friendAchievement') {
      return (content as AchievementContent).friendAvatar;
    }
    return user.avatar?.imageUrl;
  };

  const getUsername = () => {
    if (type === 'friendAchievement') {
      return (content as AchievementContent).friendUsername;
    }
    return user.username;
  };

  return (
    <div className={`feed-item ${type}-item`}>
      {getAvatarUrl() && (
        <img src={getAvatarUrl()} alt={`${getUsername()}'s avatar`} className="user-avatar" />
      )}
      {renderContent()}
      <p className="timestamp">{formatDistanceToNow(new Date(timestamp))}</p>
    </div>
  );
};

export default FeedItem;