// Define types for our checkout data
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  companyName?: string;
  address: string;
  apartment?: string;
  city: string;
  phone: string;
  email: string;
  saveInfo: boolean;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  selected: boolean;
}

export interface CouponCode {
  code: string;
  discount: number;
  applied: boolean;
}
