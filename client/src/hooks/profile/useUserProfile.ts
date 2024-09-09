import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { UserProfile } from '../../@types/userProfile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const { getToken } = useAuth();

 useEffect(() => {
  const fetchProfile = async () => {
    if (!loading) return;
    const token = getToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(responseText);
      setProfile(data);
    } catch (err) {
      console.error('Error in fetchProfile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  return { profile, loading, error };
};