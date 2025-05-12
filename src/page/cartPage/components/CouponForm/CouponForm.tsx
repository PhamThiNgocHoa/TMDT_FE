import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CouponForm.module.css';

const CouponForm: React.FC = () => {
  const { applyCoupon, appliedCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Vui lòng nhập mã giảm giá');
      setSuccess(null);
      return;
    }
    
    const result = await applyCoupon(couponCode);
    
    if (result) {
      setSuccess('Mã giảm giá đã được áp dụng thành công!');
      setError(null);
      setCouponCode('');
    } else {
      setError('Mã giảm giá không hợp lệ hoặc đã hết hạn');
      setSuccess(null);
    }
  };

  return (
    <div className={styles.couponContainer}>
      <input
        type="text"
        className={styles.couponInput}
        placeholder="Mã giảm giá"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        disabled={!!appliedCoupon}
      />
      
      <button 
        className={styles.applyButton}
        onClick={handleApplyCoupon}
        disabled={!!appliedCoupon}
      >
        <span className={styles.applyButtonText}>
          {appliedCoupon ? 'Đã áp dụng' : 'Áp dụng giảm giá'}
        </span>
      </button>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}
    </div>
  );
};

export default CouponForm;
