import React from 'react';
import styles from './EmptyCart.module.css';

const EmptyCart: React.FC = () => {
  const handleShopNow = () => {
    console.log('Navigate to shop page');
    // Implement navigation to shop page
  };

  return (
    <div className={styles.emptyCartContainer}>
      <svg 
        className={styles.emptyCartIcon}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001" 
          stroke="#292D32" 
          strokeWidth="1.5" 
          strokeMiterlimit="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z" 
          stroke="#292D32" 
          strokeWidth="1.5" 
          strokeMiterlimit="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z" 
          stroke="#292D32" 
          strokeWidth="1.5" 
          strokeMiterlimit="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M9 8H21" 
          stroke="#292D32" 
          strokeWidth="1.5" 
          strokeMiterlimit="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <line 
          x1="4" 
          y1="4" 
          x2="20" 
          y2="20" 
          stroke="#DB4444" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
      
      <h2 className={styles.emptyCartTitle}>Giỏ hàng của bạn đang trống</h2>
      
      <p className={styles.emptyCartMessage}>
        Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng. Hãy tiếp tục mua sắm để tìm thấy sản phẩm bạn yêu thích.
      </p>
      
      <button 
        className={styles.shopNowButton}
        onClick={handleShopNow}
      >
        <span className={styles.shopNowButtonText}>Tiếp tục mua sắm</span>
      </button>
    </div>
  );
};

export default EmptyCart;
