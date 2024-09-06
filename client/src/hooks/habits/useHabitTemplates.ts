import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../useAuth';
import { Habit } from '../../@types/habit';

export const useHabitTemplates = () => {
  const [templates, setTemplates] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getToken } = useAuth();

  const fetchTemplates = useCallback(async () => {
    if (!loading) return; // Prevent multiple simultaneous fetches
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habits/templates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch habit templates');
      }

      const templatesData = await response.json();
      setTemplates(templatesData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchTemplates();
  }, [fetchTemplates]);

  return { templates, loading, error, refetch };
};