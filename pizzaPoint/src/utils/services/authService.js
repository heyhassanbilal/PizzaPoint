// src/services/authService.js
import { apiCore } from './apiCore';

export const authService = {
  login: (credentials) => apiCore.post('/auth/login', credentials),
  logout: () => apiCore.post('/auth/logout'),
  refreshToken: () => apiCore.post('/auth/refresh-token'),
  signup: (userData) => apiCore.post('/auth/signup', userData),
  getCurrentUser: () => apiCore.get('/auth/me'),
  emailExists: (email) => apiCore.get(`/auth/check-email?email=${email}`),
};