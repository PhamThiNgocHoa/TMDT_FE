import React from 'react';
import styles from './CheckoutFailure.module.css';

const CheckoutFailure: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.iconFailure}>
                {/* Red cross icon - using a simple SVG or text for now */}
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
                    <circle cx="26" cy="26" r="25" fill="#FF0000"/>
                    <path d="M16 16 36 36 M36 16 16 36" fill="none" stroke="#FFFFFF" stroke-width="5"/>
                </svg>
            </div>
            <h2 className={styles.title}>Thanh toán thất bại</h2>
            <p className={styles.message}>Chúng tôi rất tiếc giao dịch của bạn không thể hoàn tất!</p>
            <button className={styles.retryButton}>Thử lại</button>
        </div>
    );
};

export default CheckoutFailure; 