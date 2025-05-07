// src/services/myOrderService.js
import { apiCore } from './apiCore';

export const myOrdersService = {
  getMyOrders: (email) => apiCore.get(`/api/orders/history/all-orders/${email}`),
  getOrderById: (id) => apiCore.get(`/api/menuItem/get/${id}`),
};