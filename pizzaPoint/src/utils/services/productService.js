// src/services/productService.js
import { apiCore } from './apiCore';

export const productService = {
  // getProducts: (params = {}) => apiCore.get('/products', params),
  getProductByNameAndSize: (params = {}) => apiCore.get('/api/menuItem/get/name/size', params),
  getExtras: () => apiCore.get('/api/extras/get/all'),
  getExtraById: (extraId) => apiCore.get(`/api/extras/get/${extraId}`),
  getProductByCategory: (category) => apiCore.get(`/api/menuItem/get/category/${category}`),
  // createProduct: (productData) => apiCore.post('/products', productData),
  // updateProduct: (id, productData) => apiCore.put(`/products/${id}`, productData),
  // deleteProduct: (id) => apiCore.delete(`/products/${id}`),
  // getFeaturedProducts: () => apiCore.get('/products/featured'),
};