import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { Achievement } from '../../@types/achievement';

export const useAchievements = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchUserAchievements = async (): Promise<Achievement[]> => {
    setIsLoading(true);
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
      return data;
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUserAchievements, isLoading };
};