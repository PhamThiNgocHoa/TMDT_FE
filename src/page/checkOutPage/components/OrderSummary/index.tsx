import React from 'react';
import { CartItem } from '../../types';
import styles from './styles.module.css';

interface OrderSummaryProps {
  items: CartItem[];
  couponDiscount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, couponDiscount }) => {
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Shipping is free
  const shipping = 0;
  
  // Calculate total
  const total = subtotal - couponDiscount;

  return (
    <section className={styles.orderSummarySection}>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Tổng tiền</span>
        <span className={styles.summaryValue}>
          {new Intl.NumberFormat('vi-VN').format(subtotal)} VND
        </span>
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Phí ship:</span>
        <span className={styles.summaryValue}>
          {shipping > 0 
            ? `${new Intl.NumberFormat('vi-VN').format(shipping)} VND` 
            : 'Free'}
        </span>
      </div>
      
      {couponDiscount > 0 && (
        <>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Giảm giá:</span>
            <span className={styles.discountValue}>
              -{new Intl.NumberFormat('vi-VN').format(couponDiscount)} VND
            </span>
          </div>
        </>
      )}
      
      <div className={styles.divider} />
      
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Tổng:</span>
        <span className={styles.totalValue}>
          {new Intl.NumberFormat('vi-VN').format(total)} VND
        </span>
      </div>
    </section>
  );
};

export default OrderSummary;
