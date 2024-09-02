import { useNavigate } from 'react-router-dom';
import '../../styles/BottomNav.css';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <p className='text-button' onClick={goBack}>save</p>
    )
};

export default BackButton