import React from 'react';
import styles from '../OrderManagement.module.css';

type StatusBadgeProps = {
    status:
        | "PENDING"
        | "PENDING_PAYMENT"
        | "SHIPPING"
        | "CARRIER_CANCELLED"
        | "PAYMENT_SUCCESS"
        | "PAYMENT_FAILED"
        | "DELIVERED"
        | "CANCELLED";
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case "PENDING":
                return styles.statusPending;
            case "PENDING_PAYMENT":
                return styles.statusPendingPayment;
            case "SHIPPING": // Đổi SHIPPED -> SHIPPING
                return styles.statusShipped;
            case "CARRIER_CANCELLED":
                return styles.statusCancelled; // Dùng chung style cancelled
            case "PAYMENT_SUCCESS":
                return styles.statusSuccess;
            case "PAYMENT_FAILED":
                return styles.statusCancelled;
            case "DELIVERED":
                return styles.statusDelivered;
            case "CANCELLED":
                return styles.statusCancelled;
            default:
                return styles.statusDefault;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case "PENDING":
                return "Chờ xử lý";
            case "PENDING_PAYMENT":
                return "Chờ thanh toán";
            case "SHIPPING":
                return "Đang giao";
            case "CARRIER_CANCELLED":
                return "Hủy bởi nhà vận chuyển";
            case "PAYMENT_SUCCESS":
                return "Thanh toán thành công";
            case "PAYMENT_FAILED":
                return "Thanh toán thất bại";
            case "DELIVERED":
                return "Đã giao";
            case "CANCELLED":
                return "Đã hủy";
            default:
                return "Không xác định";
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
