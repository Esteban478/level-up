import { useState } from 'react';
import { useAuth } from '../auth/useAuth';

interface XPTransactionResponse {
  xpGained: number;
  totalXp: number;
  currentXp: number;
  newLevel?: number;
}

export const useXPTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const recordXPTransaction = async (source: string, habitId?: string, xpGained?: number): Promise<XPTransactionResponse | null> => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: any = { source };
      if (source === 'Habit_completion') {
        body.habitId = habitId;
      } else {
        body.xpGained = xpGained;
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/xp/record`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to record XP transaction');
      }

      const data: XPTransactionResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error recording XP transaction:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { recordXPTransaction, isLoading };
};