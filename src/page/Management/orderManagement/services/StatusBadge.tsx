import React from 'react';
import styles from '../OrderManagement.module.css';

type StatusBadgeProps = {
    status: 'PENDING' | 'PENDING_PAYMENT' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case 'PENDING':
                return styles.statusPending;
            case 'PENDING_PAYMENT':
                return styles.statusPendingPayment;
            case 'SHIPPED':
                return styles.statusShipped;
            case 'DELIVERED':
                return styles.statusDelivered;
            case 'CANCELLED':
                return styles.statusCancelled;
            default:
                return styles.statusDefault;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'PENDING':
                return 'Chờ xử lý';
            case 'PENDING_PAYMENT':
                return 'Chờ thanh toán';
            case 'SHIPPED':
                return 'Đang giao';
            case 'DELIVERED':
                return 'Đã giao';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    return (
        <div className={getStatusStyles()}>
            <div className={styles.container6}>
                <div className={styles.label}>{getStatusText()}</div>
            </div>
        </div>
    );
}
