// utils/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import your AuthContext

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // This allows components to access the context
};