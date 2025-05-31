// AdminProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('adminToken'); // or context/state

  if (!isAdminAuthenticated) {
    return <Navigate to="/adminLogin" />;
  }

  return children;
};

export default AdminProtectedRoute;
