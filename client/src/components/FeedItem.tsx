import React, { useEffect, useState } from 'react';
import { FeedItemProps } from "../@types/feedItem";
import { formatDistanceToNow } from "../utils/formatDate";
import { useAuth } from '../hooks/auth/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faLightbulb, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const FeedItem: React.FC<FeedItemProps> = ({ item, onCongratulate }) => {
  const { user: currentUser } = useAuth();
  const { type, content, timestamp, user, congratulations } = item;
  const [isCongratulated, setIsCongratulated] = useState(false);
  const [congratsCount, setCongratsCount] = useState(congratulations?.length || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsCongratulated(currentUser ? congratulations?.includes(currentUser.id) : false);
    setCongratsCount(congratulations?.length || 0);
  }, [currentUser, congratulations]);

  const renderContent = () => {
    switch (type) {
      case 'achievement':
      case 'friendAchievement':
        return (
          <div className="achievement-content">
            <div className="achievement-info">
              <h3>{content.name}</h3>
              <p>{content.description}</p>
            </div>
            <div className="achievement-image-placeholder"></div>
          </div>
        );
      case 'tip':
        return (
          <div className="tip-content">
            <p>{content.tip?.content || 'No tip content available'}</p>
            <p className="tip-category">Category: {content.tip?.category || 'Uncategorized'}</p>
          </div>
        );
      case 'newFriend':
        return (
          <div className="new-friend-content">
            <p>
              {content.isFollowingBack
                ? `${getUsername()} is following you back!`
                : `${getUsername()} is now following you!`}
            </p>
          </div>
        );
      default:
        return <p>Unknown feed item type</p>;
    }
  };

  const getAvatarUrl = () => {
    if ((type === 'friendAchievement' || type === 'newFriend') && content.friend) {
      return content.friend.avatar?.imageUrl || "/default-avatar.jpg";
    }
    return user.avatar?.imageUrl || "/default-avatar.jpg";
  };

  const getUsername = () => {
    if ((type === 'friendAchievement' || type === 'newFriend') && content.friend) {
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
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      } catch (error) {
        console.error('Failed to congratulate:', error);
      }
    }
  };

  const handleShowProfile = () => {
    if ((type === 'newFriend') && content.friend._id) {
      navigate(`/friend/${content.friend._id}`);
    }
  };

  return (
    <div className={`feed-item ${type}-item`}>
      <div className="feed-item-header">
        {type !== 'tip' ? (
          <img 
            src={getAvatarUrl()} 
            alt={`${getUsername() || 'User'}'s avatar`} 
            className="user-avatar" 
          />
        ) : (
          <div className="tip-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>
        )}
        <div className="user-info">
          <p className="username">{type === 'tip' ? 'Daily Tip' : getUsername() || 'Unknown User'}</p>
          <p className="timestamp">{formatDistanceToNow(new Date(timestamp))}</p>
        </div>
      </div>
      <div className="feed-item-content">
        {renderContent()}
      </div>
      {type === 'achievement' && (
        <div className="feed-item-footer end">
          <div className={`congratulations-count ${isAnimating ? 'animate' : ''}`}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{congratsCount}</span>
          </div>
        </div>
      )}
      {type === 'friendAchievement' && (
        <div className="feed-item-footer">
          <button 
            onClick={handleCongratulate} 
            disabled={isCongratulated || !currentUser}
            className={`congratulate-button ${isCongratulated ? 'congratulated' : ''}`}
          >
            {isCongratulated && <FontAwesomeIcon icon={faThumbsUp} />}
            {isCongratulated ? 'Celebrated' : 'Celebrate'}
          </button>
          <div className={`congratulations-count ${isAnimating ? 'animate' : ''}`}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{congratsCount}</span>
          </div>
        </div>
      )}
      {type === 'newFriend' && content.isFollowingBack && (
        <div className="feed-item-footer">
          <button 
            onClick={handleShowProfile}
            className="show-profile-button"
          >
            <FontAwesomeIcon icon={faUser} />
            Show profile
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedItem;