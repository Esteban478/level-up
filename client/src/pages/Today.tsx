import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Today: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
          <p>You've successfully logged in.</p>
          <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Today