import { useState, useEffect, useCallback } from 'react';
import { Habit } from '../../@types/habit';
import { useAuth } from '../useAuth';

export const useHabit = (habitId: string | undefined) => {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const fetchHabit = useCallback(async () => {
    if (!habitId) {
      setLoading(false);
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habits/${habitId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch habit');
      }

      const data = await response.json();
      setHabit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [habitId]); // Remove getToken from dependencies

  useEffect(() => {
    fetchHabit();
  }, [fetchHabit]);

  return { habit, loading, error, refetch: fetchHabit };
};