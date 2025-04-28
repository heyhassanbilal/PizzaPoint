// ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
  
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default ProtectedRoute;