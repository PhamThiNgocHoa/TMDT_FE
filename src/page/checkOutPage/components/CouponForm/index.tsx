import React, { useState } from 'react';
import styles from './styles.module.css';

interface CouponFormProps {
  onApplyCoupon: (code: string) => void;
  isLoading: boolean;
}

const CouponForm: React.FC<CouponFormProps> = ({ onApplyCoupon, isLoading }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      onApplyCoupon(couponCode);
    }
  };

  return (
    <form className={styles.couponForm} onSubmit={handleSubmit}>
      <div className={styles.couponInput}>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Mã giảm giá"
          className={styles.input}
        />
      </div>
      <button 
        type="submit" 
        className={styles.applyButton}
        disabled={isLoading}
      >
        {isLoading ? 'Đang áp dụng...' : 'Áp dụng'}
      </button>
    </form>
  );
};

export default CouponForm;
