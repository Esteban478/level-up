import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../useAuth';
import { Habit } from '../../@types/habit';

export const useActiveHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getToken } = useAuth();

  const fetchHabits = useCallback(async () => {
    if (!loading) return; // Prevent multiple simultaneous fetches
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/habits`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }

      const data = await response.json();
      const activeHabits = data.filter((habit: Habit) => !habit.isArchived);
      setHabits(activeHabits);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchHabits();
  }, [fetchHabits]);

  return { habits, loading, error, refetch };
};