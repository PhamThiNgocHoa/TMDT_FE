import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartActions.module.css';

const CartActions: React.FC = () => {
  const { items } = useCart();
  
  const handleContinueShopping = () => {
    console.log('Continue shopping');
    // Navigate to shop page
  };
  
  const handleUpdateCart = () => {
    console.log('Update cart');
    // Refresh cart data from server
    window.location.reload();
  };

  return (
    <div className={styles.actionsContainer}>
      <button 
        className={`${styles.actionButton} ${styles.continueShoppingButton}`}
        onClick={handleContinueShopping}
      >
        <span className={styles.actionButtonText}>Quay lại</span>
      </button>
      
      <button 
        className={`${styles.actionButton} ${styles.updateCartButton}`}
        onClick={handleUpdateCart}
        disabled={items.length === 0}
      >
        <span className={styles.actionButtonText}>Cập nhật giỏ hàng</span>
      </button>
    </div>
  );
};

export default CartActions;
