import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Coupon, CartSummary } from '../types';
import api from '../services/api';

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  appliedCoupon: Coupon | null;
  summary: CartSummary;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await api.getCartItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateSummary = (): CartSummary => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping
    const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
    const total = subtotal - discount + shipping;

    return {
      subtotal,
      shipping,
      discount,
      total
    };
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      setIsLoading(true);
      const updatedItems = await api.updateCartItem(id, quantity);
      setItems(updatedItems);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (id: number) => {
    try {
      setIsLoading(true);
      const updatedItems = await api.removeCartItem(id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const coupon = await api.applyCoupon(code);
      
      if (coupon) {
        setAppliedCoupon(coupon);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to apply coupon:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        appliedCoupon,
        summary: calculateSummary(),
        updateQuantity,
        removeItem,
        applyCoupon,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
