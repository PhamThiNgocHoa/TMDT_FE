import React from 'react';
import styles from '../CustomerManagement.module.css';

type StatusBadgeProps = {
    status: 'approved' | 'pending' | 'draft' | 'rejected';
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case 'approved':
                return styles.adminTableStatus;
            case 'pending':
                return styles.adminTableStatus4;
            case 'draft':
                return styles.adminTableStatus2;
            case 'rejected':
                return styles.adminTableStatus3;
            default:
                return styles.adminTableStatus;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'approved':
                return 'Đã duyệt';
            case 'pending':
                return 'Đang chờ';
            case 'draft':
                return 'Bản nháp';
            case 'rejected':
                return 'Từ chối';
            default:
                return 'Đã duyệt';
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
