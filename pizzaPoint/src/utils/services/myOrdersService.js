// src/services/myOrderService.js
import { apiCore } from './apiCore';

export const myOrderService = {
  getMyOrders: (email) => apiCore.get(`/api/orders/history/all-orders/${email}`),
};