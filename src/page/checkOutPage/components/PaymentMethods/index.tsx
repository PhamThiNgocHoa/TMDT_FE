import React from 'react';
import styles from './styles.module.css';
import {OrderMethod, OrderMethodDisplayName} from "../../../../enums/OrderMethod";

interface PaymentMethodsProps {
    paymentMethods: OrderMethod[];
    selectedMethod: OrderMethod;
    onSelectPaymentMethod: (method: OrderMethod) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
                                                           paymentMethods,
                                                           selectedMethod,
                                                           onSelectPaymentMethod,
                                                       }) => {
    return (
        <section className={styles.paymentMethodsSection}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                }}
            >
                {paymentMethods.map((method) => (
                    <div
                        key={method}
                        className={styles.methodSelection}
                        onClick={() => onSelectPaymentMethod(method)}
                    >
                        <div
                            className={`${styles.radioButton} ${
                                selectedMethod === method ? styles.selected : ''
                            }`}
                        />
                        <span className={styles.methodName}>
                        {OrderMethodDisplayName[method]}
                    </span>

                        {method === 'VN_PAY' && (
                            <div className={styles.bankLogos}>
                                <div className={styles.visaLogo}></div>
                                <div className={styles.mastercardLogo}></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PaymentMethods;
