import { CartItem, Coupon } from '../types';
import { cartItems, availableCoupons } from '../data/mockData';

// Simulate API calls with mock data
const api = {
  getCartItems: async (): Promise<CartItem[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cartItems);
      }, 500);
    });
  },

  updateCartItem: async (id: number, quantity: number): Promise<CartItem[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedItems = cartItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        resolve(updatedItems);
      }, 300);
    });
  },

  removeCartItem: async (id: number): Promise<CartItem[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredItems = cartItems.filter(item => item.id !== id);
        resolve(filteredItems);
      }, 300);
    });
  },

  applyCoupon: async (code: string): Promise<Coupon | null> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const coupon = availableCoupons.find(c => c.code === code);
        resolve(coupon || null);
      }, 300);
    });
  }
};

export default api;
