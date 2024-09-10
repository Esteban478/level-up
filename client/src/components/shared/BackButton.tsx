import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useStandardNavigation } from '../../hooks/navigation/useStandardNavigation';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const { handleBack: standardHandleBack } = useStandardNavigation();

  const handleClick = onClick || standardHandleBack;

  return (
    <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick} />
  );
};

export default BackButton;