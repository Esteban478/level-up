import { useAuth } from '../auth/useAuth';
import { UserProfile } from '../../@types/userProfile';

export const useUpdateProfile = () => {
    const { getToken } = useAuth();

    const updateProfile = async (updatedProfile: UserProfile) => {
        const token = getToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProfile)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  };

  return { updateProfile };
};