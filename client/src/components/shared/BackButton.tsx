import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '../../styles/BottomNav.css';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} />
    )
};

export default BackButton