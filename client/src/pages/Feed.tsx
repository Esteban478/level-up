import { useFeed } from '../hooks/feed/useFeed';
import FeedItem from '../components/FeedItem';
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feed">
      {(isLoading && feedItems.length === 0) && <p>loading...</p>}
      {feedItems.map(item => (
        
        <FeedItem 
          key={item._id || `${item.content.friend?._id}-${item.content.achievementId}`} 
          item={item} 
          onCongratulate={handleCongratulate} 
        />
      ))}
      {hasMore && !isLoading && (
        <button onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Feed;