import React, { useState, useEffect } from 'react';
import { CustomerInfo, CartItem, PaymentMethod } from '../types';
import { 
  fetchCartItems, 
  fetchPaymentMethods, 
  applyCoupon, 
  submitOrder,
  mockCustomerInfo 
} from '../api/mockData';
import CustomerForm from '../components/CustomerForm';
import CartItems from '../components/CartItems';
import OrderSummary from '../components/OrderSummary';
import PaymentMethods from '../components/PaymentMethods';
import CouponForm from '../components/CouponForm';
import CheckoutButton from '../components/CheckoutButton';
import Notification from '../components/Notification';
import CheckoutSuccess from '../CheckoutSuccess';
import CheckoutFailure from '../CheckoutFailure';
import styles from './index.module.css';

const CheckoutPage: React.FC = () => {
  // State for customer information
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(mockCustomerInfo);
  
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  
  // State for coupon discount
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  
  // State to track payment status: 'idle', 'success', 'failure'
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  
  // Loading states
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(true);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  
  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Fetch cart items and payment methods on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, methodsData] = await Promise.all([
          fetchCartItems(),
          fetchPaymentMethods()
        ]);
        
        setCartItems(itemsData);
        setPaymentMethods(methodsData);
      } catch (error) {
        showNotification('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.', 'error');
      } finally {
        setIsLoadingCart(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle customer info changes
  const handleCustomerInfoChange = (info: CustomerInfo) => {
    setCustomerInfo(info);
  };

  // Handle payment method selection
  const handleSelectPaymentMethod = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      selected: method.id === id
    }));
    
    setPaymentMethods(updatedMethods);
  };

  // Handle coupon application
  const handleApplyCoupon = async (code: string) => {
    setIsApplyingCoupon(true);
    
    try {
      const result = await applyCoupon(code);
      
      if (result.success) {
        setCouponDiscount(result.discount);
        showNotification('Mã giảm giá đã được áp dụng thành công!', 'success');
      } else {
        showNotification('Mã giảm giá không hợp lệ hoặc đã hết hạn.', 'error');
      }
    } catch (error) {
      showNotification('Đã xảy ra lỗi khi áp dụng mã giảm giá.', 'error');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    // Validate form
    if (!validateForm()) {
      showNotification('Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
      return;
    }
    
    setIsSubmittingOrder(true);
    setPaymentStatus('idle'); // Reset status before submitting

    try {
      const selectedPaymentMethod = paymentMethods.find(method => method.selected)?.id || '';
      
      const result = await submitOrder(
        customerInfo,
        cartItems,
        selectedPaymentMethod
      );
      
      if (result.success) {
        // showNotification(`Đặt hàng thành công! Mã đơn hàng: ${result.orderId}`, 'success'); // Hide default notification
        setPaymentStatus('success');
      } else {
        // showNotification('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.', 'error'); // Hide default notification
        setPaymentStatus('failure');
      }
    } catch (error) {
      // showNotification('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.', 'error'); // Hide default notification
      setPaymentStatus('failure');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const { fullName, address, city, phone, email } = customerInfo;
    return !!(fullName && address && city && phone && email);
  };

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  // Hide notification
  const hideNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  return (
    <main className={styles.checkoutContainer}>
      {/* Only show the notification for validation errors, not payment status */}
      {notification.show && paymentStatus === 'idle' && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      {paymentStatus === 'success' && <CheckoutSuccess />}
      {paymentStatus === 'failure' && <CheckoutFailure />}

      {paymentStatus === 'idle' && (
        <div className={styles.checkoutContent}>
          <section className={styles.leftColumn}>
            <CustomerForm
              customerInfo={customerInfo}
              onCustomerInfoChange={handleCustomerInfoChange}
            />
          </section>
          
          <section className={styles.rightColumn}>
            {isLoadingCart ? (
              <p>Đang tải thông tin giỏ hàng...</p>
            ) : (
              <>
                <CartItems items={cartItems} />
                
                <OrderSummary 
                  items={cartItems}
                  couponDiscount={couponDiscount}
                />
                
                <PaymentMethods
                  paymentMethods={paymentMethods}
                  onSelectPaymentMethod={handleSelectPaymentMethod}
                />
                
                <CouponForm
                  onApplyCoupon={handleApplyCoupon}
                  isLoading={isApplyingCoupon}
                />
                
                <CheckoutButton
                  onClick={handleSubmitOrder}
                  isLoading={isSubmittingOrder}
                />
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
