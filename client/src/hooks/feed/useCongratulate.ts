import { useState } from 'react';
import { useAuth } from '../auth/useAuth';

export const useCongratulate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const congratulate = async (feedItemId: string) => {
    setIsLoading(true);
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URI}/feed/${feedItemId}/congratulate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to congratulate');
      }

      const data = await response.json();
      setIsLoading(false);
      return data.congratulationsCount;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return { congratulate, isLoading };
};