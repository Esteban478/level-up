import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Today: React.FC = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

  return (
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <p>You've successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Today