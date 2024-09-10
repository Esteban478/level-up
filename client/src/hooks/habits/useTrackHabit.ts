import { useState } from 'react';
import { useXPTransaction } from '../xp/useXPTransaction';

export const useTrackHabit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { recordXPTransaction } = useXPTransaction();

  const trackHabit = async (habitId: string, goalValue: number, notes: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habitlogs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          habitId, 
          value: goalValue, 
          notes,
          date: new Date().toISOString().split('T')[0]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to track habit');
      }

      await recordXPTransaction('Habit_completion', habitId);

      return true;
    } catch (err) {
      console.error('Error tracking habit:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while tracking the habit');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { trackHabit, isLoading, error };
};