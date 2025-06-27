// src/services/adminService.js
import { apiCore } from './apiCore';

export const adminService = {
  updateOrderStatus: (id, status) => apiCore.patch(`/api/orders/${id}/status?status=${status}`),
  getMenuItemById: (id) => apiCore.get(`/api/menuItem/get/${id}`),
  getAllOrders: () => apiCore.get(`/api/orders/all/orders`),
  getAllOrdersByStatus: (status) => apiCore.get(`/api/orders/status/${status}`),
  getRestaurantStatus: () => apiCore.get(`/api/restaurant/restaurant-status`),
  updateRestaurantStatus: (open) => apiCore.put(`/api/restaurant/1/status?isOpen=${open}`),
  adminLogin: (credentials) => apiCore.post('/auth/admin-login', credentials),
  adminOTPcheck: (credentials) => apiCore.post('/auth/verify-otp', credentials),
  logout: () => apiCore.post('/auth/logout'),
  validateToken: (email) => apiCore.get(`/auth/validate-token/${email}`),
};