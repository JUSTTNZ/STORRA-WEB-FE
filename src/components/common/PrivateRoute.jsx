import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
  const {user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <Loading fullScreen />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/student/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
