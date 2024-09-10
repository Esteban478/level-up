import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import { Achievement } from '../../@types/achievement';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const fetchAchievements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/user-achievements`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user achievements');
      }

      const data = await response.json();
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return { achievements, isLoading, error, refetch: fetchAchievements };
};