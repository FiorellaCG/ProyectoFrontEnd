import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const raw = localStorage.getItem('authUser');
  const user = raw ? JSON.parse(raw) : null;

  const isLoggedIn = !!user;
  const isAdmin = user?.rol === 'admin';

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;