import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../@types/userProfile';
import { useUpdateProfile } from '../profile/useUpdateProfile';

export const useEditProfileNavigation = () => {
  const navigate = useNavigate();
  const { updateProfile } = useUpdateProfile();

  const handleBack = async () => {
      navigate('/profile');
  };

  const handleSave = async (profile: UserProfile) => {
    const result = await updateProfile(profile);
    if (result) {
      navigate('/profile');
    } else {
      console.error('Failed to update profile');
    }
  };

  return { handleBack, handleSave };
};