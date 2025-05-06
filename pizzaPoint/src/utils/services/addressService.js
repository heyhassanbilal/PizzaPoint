import { apiCore } from './apiCore';

export const addressService = {
  addAddress: (addressData) => apiCore.post('/api/address/add', addressData),
  selectAddress: (id) => apiCore.post(`/api/address/address-selected/${id}`),
  fetchAllAddresses: () => apiCore.get('/api/address/all'),

};