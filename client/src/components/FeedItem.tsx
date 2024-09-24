import React, { useEffect, useState } from 'react';
import { FeedItemProps } from "../@types/feedItem";
import { formatDistanceToNow } from "../utils/formatDate";
import { useAuth } from '../hooks/auth/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const FeedItem: React.FC<FeedItemProps> = ({ item, onCongratulate }) => {
  const { user: currentUser } = useAuth();
  const { type, content, timestamp, user, congratulations } = item;
  const [isCongratulated, setIsCongratulated] = useState(false);
  const [congratsCount, setCongratsCount] = useState(congratulations.length);

  useEffect(() => {
    setIsCongratulated(currentUser ? congratulations.includes(currentUser.id) : false);
    setCongratsCount(congratulations.length);
  }, [currentUser, congratulations]);

  const renderContent = () => {
    switch (type) {
      case 'achievement':
        return (
          <div className="achievement-feed-item">
            <p>You achieved:</p>
            <h3>{content.name}</h3>
            <p>{content.description}</p>
            <p>XP Earned: {content.xpReward}</p>
            <p>Congratulations: {congratsCount}</p>
          </div>
        );
      case 'friendAchievement':
        return (
          <div className="friend-achievement-feed-item">
            <p><strong>{content.friend?.username}</strong> achieved:</p>
            <h3>{content.name}</h3>
            <p>{content.description}</p>
            <p>XP Earned: {content.xpReward}</p>

            <button 
              onClick={handleCongratulate} 
              disabled={isCongratulated || !currentUser}
              className={`congratulate-button ${isCongratulated ? 'congratulated' : ''}`}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              {isCongratulated ? 'Congratulated' : 'Congratulate'}
            </button>
            <p>Congratulations: {congratsCount}</p>
          </div>
        );
      case 'tip':
        return (
        <div className="tip-feed-item">
          <h3>Daily Tip</h3>
          <p>{content.tip?.content || 'No tip content available'}</p>
          <p>Category: {content.tip?.category || 'Uncategorized'}</p>
        </div>
        );
      default:
        return <p>Unknown feed item type</p>;
    }
  };

  const getAvatarUrl = () => {
    if (type === 'friendAchievement' && content.friend) {
      return content.friend.avatar?.imageUrl || "/default-avatar.jpg";
    }
    return user.avatar?.imageUrl || "/default-avatar.jpg";
  };

  const getUsername = () => {
    if (type === 'friendAchievement' && content.friend) {
      return content.friend.username;
    }
    return user.username;
  };

  const handleCongratulate = async () => {
    if (type === 'friendAchievement' && content.achievementId && content.friend._id) {
      try {
        const newCongratsCount = await onCongratulate(content.achievementId, content.friend._id);
        setIsCongratulated(true);
        setCongratsCount(newCongratsCount);
      } catch (error) {
        console.error('Failed to congratulate:', error);
      }
    }
  };

  return (
    <div className={`feed-item ${type}-item`}>
      <img 
        src={getAvatarUrl()} 
        alt={`${getUsername() || 'User'}'s avatar`} 
        className="user-avatar" 
      />
      <div className="feed-item-content">
        <p className="username">{getUsername() || 'Unknown User'}</p>
        {renderContent()}
        <p className="timestamp">{formatDistanceToNow(new Date(timestamp))}</p>
      </div>
    </div>
  );
};

export default FeedItem;