import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../useAuth';
import { Habit } from '../../@types/habit';

export const useHabitTemplates = () => {
  const [templates, setTemplates] = useState<Habit[]>([]);
  const [activeHabits, setActiveHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getToken } = useAuth();

  const fetchData = useCallback(async () => {
    if (!loading) return; // Prevent multiple simultaneous fetches
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const [templatesResponse, activeHabitsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_URI}/habits/templates`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${import.meta.env.VITE_BASE_URI}/users/habits`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      ]);

      if (!templatesResponse.ok || !activeHabitsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const templatesData = await templatesResponse.json();
      const activeHabitsData = await activeHabitsResponse.json();

      setTemplates(templatesData);
      setActiveHabits(activeHabitsData.filter((habit: Habit) => !habit.isArchived));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const availableTemplates = templates.filter(template => 
    !activeHabits.some(habit => habit.templateId === template._id)
  );

  const refetch = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { templates: availableTemplates, loading, error, refetch };
};