import { useState } from 'react';
import { Habit } from '../../@types/habit';
import { useAuth } from '../auth/useAuth';

export const useUpdateHabit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const updateHabit = async (habit: Habit) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habits/${habit._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customizations: habit.customizations,
          name: habit.name,
          description: habit.description,
          area: habit.area,
          type: habit.type,
          xpReward: habit.xpReward
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update habit');
      }

      const updatedHabit = await response.json();
      setLoading(false);
      return updatedHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      return null;
    }
  };

  return { updateHabit, loading, error };
};