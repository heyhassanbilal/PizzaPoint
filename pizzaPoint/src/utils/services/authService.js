// src/services/authService.js
import { apiCore } from './apiCore';

export const authService = {
  login: (credentials) => apiCore.post('/auth/login', credentials),
  logout: () => apiCore.post('/auth/logout'),
  refreshToken: () => apiCore.post('/auth/refresh-token'),
  signup: (userData) => apiCore.post('/auth/signup', userData),
  getCurrentUser: () => apiCore.get('/auth/me'),
  emailExists: (email) => apiCore.get(`/auth/check-email?email=${email}`),
  adminLogin: (credentials) => apiCore.post('/auth/admin-login', credentials),
  adminOTPcheck: (credentials) => apiCore.post('/auth/verify-otp', credentials),
  resetPassword: (credentials) => apiCore.post('/auth/resetPassword', credentials),
  validateToken: (email) => apiCore.get(`/auth/validate-token/${email}`),
};