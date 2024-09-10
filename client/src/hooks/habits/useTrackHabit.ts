import { useState } from 'react';
import { useXPTransaction } from '../xp/useXPTransaction';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/useAuth';

export const useTrackHabit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { recordXPTransaction } = useXPTransaction();
  const { getToken } = useAuth();

  const trackHabit = async (habitId: string, goalValue: number, notes: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habitlogs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          habitId, 
          value: goalValue, 
          notes,
          date: currentDate
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to track habit');
      }

      const xpResult = await recordXPTransaction('Habit_completion', habitId);

      if (xpResult) {
        toast.success(`Habit tracked successfully! You gained ${xpResult.xpGained} XP.`);
        if (xpResult.newLevel) {
          toast.info(`Congratulations! You've reached level ${xpResult.newLevel}!`, { autoClose: 5000 });
        }
      }

      return true;
    } catch (err) {
      console.error('Error tracking habit:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while tracking the habit');
      toast.error('Failed to track habit. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { trackHabit, isLoading, error };
};