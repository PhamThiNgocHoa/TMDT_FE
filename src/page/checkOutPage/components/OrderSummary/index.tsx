import React from 'react';
import styles from './styles.module.css';
import {CartResponse} from "../../../../models/response/CartResponse";
import formatToVND from "../../../../hooks/formatToVND";

interface OrderSummaryProps {
  items: CartResponse | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const subtotal = items?.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const shipping = 0;


  return (
    <section className={styles.orderSummarySection}>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Tổng tiền</span>
        <span className={styles.summaryValue}>
          {formatToVND(Number(subtotal))}
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

      <div className={styles.divider} />
      
      {/*<div className={styles.totalRow}>*/}
      {/*  <span className={styles.totalLabel}>Tổng:</span>*/}
      {/*  <span className={styles.totalValue}>*/}
      {/*    {new Intl.NumberFormat('vi-VN').format(total)} VND*/}
      {/*  </span>*/}
      {/*</div>*/}
    </section>
  );
};

export default OrderSummary;
