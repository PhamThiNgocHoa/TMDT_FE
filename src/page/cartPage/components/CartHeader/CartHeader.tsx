import React from 'react';
import styles from './CartHeader.module.css';

const CartHeader: React.FC = () => {
  return (
    <div className={styles.cartHeader}>
      <div className={styles.headerContent}>
        <span className={styles.headerItem}>Sản phẩm</span>
        <span className={styles.headerItem}>Giá</span>
        <span className={styles.headerItem}>Số lượng</span>
        <span className={styles.headerItem}>Tổng tiền</span>
      </div>
    </div>
  );
};

export default CartHeader;
