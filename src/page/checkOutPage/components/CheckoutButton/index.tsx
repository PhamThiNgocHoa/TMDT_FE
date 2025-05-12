import React from 'react';
import styles from './styles.module.css';

interface CheckoutButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button 
      className={styles.checkoutButton} 
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
    </button>
  );
};

export default CheckoutButton;
