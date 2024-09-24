import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import { FeedResponse, FeedItem } from '../../@types/feedItem';

export const useFeed = (initialPageSize = 10) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { user: currentUser, getToken } = useAuth();

  const fetchFeedItems = useCallback(async (page = 1, refresh = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/feed?page=${page}&limit=${initialPageSize}${refresh ? '&refresh=true' : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feed items');
      }

      const data: FeedResponse = await response.json();
      // Populate tip content
      const populatedFeedItems = data.feedItems.map(item => {
        if (item.type === 'tip' && item.content.tip) {
          return {
            ...item,
            content: {
              ...item.content,
              tipContent: item.content.tip.content,
              tipCategory: item.content.tip.category
            }
          };
        }
        return item;
      });

      setFeedItems(prevItems => {
        if (page === 1 || refresh) {
          return populatedFeedItems;
        } else {
          return [...prevItems, ...populatedFeedItems];
        }
      });
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [getToken, initialPageSize]);

  const congratulateAchievement = useCallback(async (achievementId: string, friendId: string) => {
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/feed/congratulate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ achievementId, friendId }),
      });

      if (!response.ok) {
        throw new Error('Failed to congratulate achievement');
      }

      const data = await response.json();
      
      setFeedItems(prevItems => prevItems.map(item => {
        if (item.type === 'friendAchievement' && 
            item.content.achievementId === achievementId && 
            item.content.friend?._id === friendId) {
          return { ...item, congratulations: [...item.congratulations, currentUser.id] };
        }
        return item;
      }));

      return data.congratulationsCount;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }, [getToken, currentUser]);

  const refreshCongratulations = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/feed/refresh-congratulations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh congratulations');
      }

      const updatedFeedItems = await response.json();
      setFeedItems(prevItems => 
        prevItems.map(item => {
          const updatedItem = updatedFeedItems.find((updated: { _id: string; }) => updated._id === item._id);
          return updatedItem ? { ...item, congratulations: updatedItem.congratulations } : item;
        })
      );
    } catch (err) {
      console.error('Error refreshing congratulations:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while refreshing congratulations');
    }
  }, [getToken]);


  useEffect(() => {
    fetchFeedItems();
    refreshCongratulations();
  }, [fetchFeedItems, refreshCongratulations]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchFeedItems(Math.ceil(feedItems.length / initialPageSize) + 1);
    }
  };

  return { feedItems, isLoading, error, hasMore, loadMore, congratulateAchievement, refreshCongratulations };
};