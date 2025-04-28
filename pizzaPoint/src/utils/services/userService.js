// src/services/userService.js
import { apiCore } from './apiCore';

export const userService = {
  getAllUsers: (params = {}) => apiCore.get('/users', params),
  getUserById: (id) => apiCore.get(`/users/${id}`),
  createUser: (userData) => apiCore.post('/users', userData),
  updateUser: (id, userData) => apiCore.put(`/users/${id}`, userData),
  deleteUser: (id) => apiCore.delete(`/users/${id}`),
  searchUsers: (query) => apiCore.get('/users/search', { query }),
};