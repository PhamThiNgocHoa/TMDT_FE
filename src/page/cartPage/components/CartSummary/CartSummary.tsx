import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../data/mockData';
import styles from './CartSummary.module.css';

const CartSummary: React.FC = () => {
  const { summary, appliedCoupon } = useCart();
  
  const handleCheckout = () => {
  };

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryTitle}>Tổng giỏ hàng</h2>
      
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Tổng tiền:</span>
        <span className={styles.summaryValue}>{formatCurrency(summary.subtotal)}</span>
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Phí Ship:</span>
        <span className={styles.summaryValue}>
          {summary.shipping > 0 ? formatCurrency(summary.shipping) : 'Miễn phí'}
        </span>
      </div>
      
      {appliedCoupon && (
        <>
          <div className={styles.divider} />
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Giảm giá:</span>
            <span className={styles.summaryValue}>
              -{formatCurrency(summary.discount)}
            </span>
          </div>
        </>
      )}
      
      <div className={styles.divider} />
      
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Tổng:</span>
        <span className={styles.summaryValue}>{formatCurrency(summary.total)}</span>
      </div>
      
      <button 
        className={styles.checkoutButton}
        onClick={() => window.location.href = '/checkout'}
      >
        <span className={styles.checkoutButtonText}>Tiến hành thanh toán</span>
      </button>
    </div>
  );
};

export default CartSummary;
