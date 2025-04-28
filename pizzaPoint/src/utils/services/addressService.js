import { apiCore } from './apiCore';

export const addressService = {
  addAddress: (addressData) => apiCore.post('/api/address/add', addressData),
  fetchAllAddresses: () => apiCore.get('/api/address/all'),

};