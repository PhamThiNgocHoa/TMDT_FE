import { CartItem, CustomerInfo, PaymentMethod } from '../types';

// Mock cart items
export const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'LCD Monitor',
    price: 6500000,
    imageUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-11/ANoiMXcUhk.png',
    quantity: 1
  },
  {
    id: 2,
    name: 'H1 Gamepad',
    price: 6500000,
    imageUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-11/AyPHp2o8PB.png',
    quantity: 1
  }
];

// Mock customer info
export const mockCustomerInfo: CustomerInfo = {
  fullName: '',
  companyName: '',
  address: '',
  apartment: '',
  city: '',
  phone: '',
  email: '',
  saveInfo: false
};

// Mock payment methods
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: 'Ngân hàng',
    selected: true
  },
  {
    id: 2,
    name: 'Tiền mặt',
    selected: false
  }
];

// Mock API functions
export const fetchCartItems = (): Promise<CartItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCartItems);
    }, 500);
  });
};

export const fetchPaymentMethods = (): Promise<PaymentMethod[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPaymentMethods);
    }, 300);
  });
};

export const applyCoupon = (code: string): Promise<{ success: boolean; discount: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (code === 'DISCOUNT10') {
        resolve({ success: true, discount: 1000000 });
      } else {
        resolve({ success: false, discount: 0 });
      }
    }, 500);
  });
};

export const submitOrder = (
  customerInfo: CustomerInfo, 
  items: CartItem[], 
  paymentMethod: string,
  couponCode?: string
): Promise<{ success: boolean; orderId: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: 'ORD-' + Math.floor(Math.random() * 1000000)
      });
    }, 1000);
  });
};
