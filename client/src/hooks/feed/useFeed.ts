import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import { FeedResponse, FeedItem } from '../../@types/feedItem';



export const useFeed = (initialPageSize = 10) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { getToken } = useAuth();

  const fetchFeedItems = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/feed?page=${page}&limit=${initialPageSize}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feed items');
      }

      const data: FeedResponse = await response.json();
      setFeedItems(prevItems => (page === 1 ? data.feedItems : [...prevItems, ...data.feedItems]));
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [getToken, initialPageSize]);

  useEffect(() => {
    fetchFeedItems();
  }, [fetchFeedItems]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchFeedItems(Math.ceil(feedItems.length / initialPageSize) + 1);
    }
  };

  return { feedItems, isLoading, error, hasMore, loadMore };
};