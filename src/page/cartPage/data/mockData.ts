import { CartItem, Coupon } from '../types';

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'LCD Monitor',
    price: 6500000,
    quantity: 1,
    image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-11/TZPrWpVxTm.png'
  },
  {
    id: 2,
    name: 'H1 Gamepad',
    price: 6000000,
    quantity: 2,
    image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-11/LCnehWQpDr.png'
  }
];

export const availableCoupons: Coupon[] = [
  {
    code: 'SUMMER10',
    discount: 0.1
  },
  {
    code: 'WELCOME20',
    discount: 0.2
  }
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
};
