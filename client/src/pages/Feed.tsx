import { useEffect } from 'react';
import { useFeed } from '../hooks/feed/useFeed';
import FeedItem from '../components/FeedItem';
import { toast } from 'react-toastify';
import '../styles/Feed.css';

const Feed: React.FC = () => {
  const { feedItems, isLoading, error, hasMore, loadMore } = useFeed();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="feed-container">
      {feedItems.map(item => (
        <FeedItem key={item._id} item={item} />
      ))}
      {isLoading && <p>Loading...</p>}
      {!isLoading && hasMore && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
      {!isLoading && !hasMore && feedItems.length > 0 && (
        <p className="end-of-feed">You've reached the end of your feed!</p>
      )}
      {!isLoading && feedItems.length === 0 && (
        <p className="empty-feed">Your feed is empty. Start tracking habits to see updates!</p>
      )}
    </div>
  );
};

export default Feed;