import React from 'react';
import { PaymentMethod } from '../../types';
import styles from './styles.module.css';

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onSelectPaymentMethod: (id: number) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  paymentMethods, 
  onSelectPaymentMethod 
}) => {
  return (
    <section className={styles.paymentMethodsSection}>
      <div className={styles.bankMethod}>
        <div className={styles.methodSelection}>
          <div 
            className={`${styles.radioButton} ${paymentMethods[0].selected ? styles.selected : ''}`}
            onClick={() => onSelectPaymentMethod(1)}
          />
          <span className={styles.methodName}>Ngân hàng</span>
        </div>
        
        <div className={styles.bankLogos}>
          <div className={styles.bankLogo}>
            <div className={styles.bkashLogo} />
          </div>
          <div className={styles.bankLogo}>
            <div className={styles.visaLogo} />
          </div>
          <div className={styles.bankLogo}>
            <div className={styles.mastercardLogo} />
          </div>
          <div className={styles.bankLogo}>
            <div className={styles.nagadLogo} />
          </div>
        </div>
      </div>
      
      <div className={styles.cashMethod}>
        <div 
          className={`${styles.radioButton} ${paymentMethods[1].selected ? styles.selected : ''}`}
          onClick={() => onSelectPaymentMethod(2)}
        />
        <span className={styles.methodName}>Tiền mặt</span>
      </div>
    </section>
  );
};

export default PaymentMethods;
