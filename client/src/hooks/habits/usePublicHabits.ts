import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { Habit } from '../../@types/habit';

export const usePublicHabits = (userId?: string) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchPublicHabits = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No authentication token found');
        }

        const url = userId 
          ? `${import.meta.env.VITE_BASE_URI}/users/public-habits/${userId}`
          : `${import.meta.env.VITE_BASE_URI}/users/public-habits`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch public habits');
        }

        const data = await response.json();
        setHabits(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchPublicHabits();
  }, [userId, getToken]);

  return { habits, loading, error };
};