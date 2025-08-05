import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is authenticated
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cart API functions
export const cartApi = {
  // Get user's cart from server
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Sync cart with server
  syncCart: async (items, clientTimestamp) => {
    try {
      const response = await apiClient.post('/cart', {
        items,
        clientTimestamp
      });
      return response.data;
    } catch (error) {
      console.error('Error syncing cart:', error);
      throw error;
    }
  },

  // Add or update item in cart
  updateCartItem: async (productId, product, quantity) => {
    try {
      const response = await apiClient.put('/cart/item', {
        productId,
        product,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeCartItem: async (productId) => {
    try {
      const response = await apiClient.delete(`/cart/item/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await apiClient.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export default cartApi;
