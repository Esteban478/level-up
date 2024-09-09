import { useState, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';

export const useArchiveHabit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getToken } = useAuth();

const archiveHabit = useCallback(async (habitId: string, archive: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habits/${habitId}/archive`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ archive }) // Send the archive state in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to archive/unarchive habit');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [getToken]);


  return { archiveHabit, loading, error };
};