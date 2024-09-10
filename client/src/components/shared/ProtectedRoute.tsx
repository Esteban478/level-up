import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;