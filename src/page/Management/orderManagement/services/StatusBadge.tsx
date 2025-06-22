import React from 'react';
import styles from '../OrderManagement.module.css';
import { OrderStatus, OrderStatusDisplayName } from '../../../../enums/OrderStatus';

type StatusBadgeProps = {
    status: OrderStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case OrderStatus.PENDING:
                return styles.statusPending;
            case OrderStatus.PENDING_PAYMENT:
                return styles.statusPendingPayment;
            case OrderStatus.SHIPPING:
                return styles.statusShipped;
            case OrderStatus.PAYMENT_SUCCESS:
                return styles.statusSuccess;
            case OrderStatus.PAYMENT_FAILED:
                return styles.statusCancelled;
            case OrderStatus.DELIVERED:
                return styles.statusDelivered;
            case OrderStatus.CANCELLED:
                return styles.statusCancelled;
            case OrderStatus.RETURNED:
                return styles.statusCancelled; // Dùng chung style cancelled
            default:
                return styles.statusDefault;
        }
    };

    const getStatusText = () => {
        return OrderStatusDisplayName[status];
    };

    return (
        <div className={getStatusStyles()}>
            <div className={styles.container6}>
                <div className={styles.label}>{getStatusText()}</div>
            </div>
        </div>
    );
}
