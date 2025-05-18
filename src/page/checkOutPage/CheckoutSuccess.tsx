import React from 'react';
import styles from './CheckoutSuccess.module.css';

const CheckoutSuccess: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.iconSuccess}>
                {/* Green checkmark icon - using a simple SVG or text for now */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
                    <circle cx="26" cy="26" r="25" fill="#4CAF50"/>
                    <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" stroke="#FFFFFF" stroke-width="5"/>
                </svg>
            </div>
            <h2 className={styles.title}>Thanh toán thành công</h2>
            <p className={styles.message}>Cảm ơn bạn đã ủng hộ chúng tôi hôm nay.<br/>Chúng tôi trân trọng bạn!</p>
            <button className={styles.continueShoppingButton}>Tiếp tục mua hàng</button>
        </div>
    );
};

export default CheckoutSuccess; 