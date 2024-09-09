import { useState } from 'react';
import { HabitLog } from '../../@types/habitLog';
import { useAuth } from '../auth/useAuth';
import { Habit } from '../../@types/habit';

export const useTrackHabit = () => {
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useAuth();


  const trackHabit = async (habitId: string, value: boolean | number, notes: string): Promise<{ habitLog: HabitLog, updatedHabit: Habit } | null> => {
    setIsLoading(true);
    setError(null);
    const token = getToken();


    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habitlogs`, {
        method: 'POST',
          headers: {
        'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          habitId,
          value,
          date: new Date().toISOString(),
          notes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track habit');
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
      return null;
    }
  };

  return { trackHabit, isLoading, error };
};