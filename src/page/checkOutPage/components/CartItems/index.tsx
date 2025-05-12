import React from 'react';
import { CartItem } from '../../types';
import styles from './styles.module.css';

interface CartItemsProps {
  items: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ items }) => {
  return (
    <section className={styles.cartItemsSection}>
      {items.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <div className={styles.productImage}>
            <div 
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
          </div>
          <div className={styles.productDetails}>
            <span className={styles.productName}>{item.name}</span>
            <span className={styles.productPrice}>
              {new Intl.NumberFormat('vi-VN').format(item.price)} VND
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CartItems;
