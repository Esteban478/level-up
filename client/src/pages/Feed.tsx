import { useFeed } from '../hooks/feed/useFeed';
import FeedItem from '../components/FeedItem';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import { useEffect } from 'react';
import '../styles/Feed.css';

const Feed: React.FC = () => {
  const { feedItems, isLoading, error, hasMore, loadMore, congratulateAchievement, refreshCongratulations } = useFeed();

  const handleCongratulate = async (achievementId: string, friendId: string) => {
    try {
      const newCongratsCount = await congratulateAchievement(achievementId, friendId);
      return newCongratsCount;
    } catch (error) {
      console.error('Failed to congratulate:', error);
      throw error;
    }
  };

  useEffect(() => {
    refreshCongratulations();
  }, [refreshCongratulations]);

  if (isLoading && feedItems.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feed">
      {feedItems.map(item => (
        <FeedItem 
          key={item._id || `${item.content.friend?._id}-${item.content.achievementId}`} 
          item={item} 
          onCongratulate={handleCongratulate} 
        />
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Feed;