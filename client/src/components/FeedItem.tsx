import { FeedItemProps, AchievementContent, TipContent } from "../@types/feedItem";
import { formatDistanceToNow } from "../utils/formatDate";

const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  const { type, content, timestamp } = item;

  const renderContent = () => {
    switch (type) {
      case 'achievement':
        { const achievementContent = content as AchievementContent;
        return (
          <div className="achievement-feed-item">
            <h3>{achievementContent.name}</h3>
            <p>{achievementContent.description}</p>
            <p>XP Earned: {achievementContent.xpReward}</p>
          </div>
        ); }
      case 'tip':
        { const tipContent = content as TipContent;
        return (
          <div className="tip-feed-item">
            <h3>Daily Tip</h3>
            <p>{tipContent.content}</p>
          </div>
        ); }
      default:
        return <p>Unknown feed item type</p>;
    }
  };

  return (
    <div className={`feed-item ${type}-item`}>
      {renderContent()}
      <p className="timestamp">{formatDistanceToNow(new Date(timestamp))}</p>
    </div>
  );
};

export default FeedItem;