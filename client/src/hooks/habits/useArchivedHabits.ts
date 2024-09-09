import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import { Habit } from '../../@types/habit';

export const useArchivedHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getToken } = useAuth();

  const fetchArchivedHabits = useCallback(async () => {
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
        throw new Error('Failed to fetch archived habits');
      }

      const data = await response.json();
      const archivedHabits = data.filter((habit: Habit) => habit.isArchived);
      setHabits(archivedHabits);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchArchivedHabits();
  }, [fetchArchivedHabits]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchArchivedHabits();
  }, [fetchArchivedHabits]);

  return { habits, loading, error, refetch };
};