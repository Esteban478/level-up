import { useNavigate } from 'react-router-dom';

export const useStandardNavigation = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return { handleBack };
};