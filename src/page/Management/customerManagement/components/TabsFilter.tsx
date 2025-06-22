import React from 'react';
import styles from '../CustomerManagement.module.css';
import { useCustomers } from '../context/CustomerContext';

export const TabsFilter: React.FC = () => {
    const { customers } = useCustomers();

    // Đếm số khách hàng có role là "USER"
    const userCount = customers.filter((customer) => customer.role === 'USER').length;

    return (
        <div className={styles.tabsFilter}>
            <button className={styles.tabActive}>
                Khách hàng người dùng
                <span className={styles.tabCount}>{userCount}</span>
            </button>
        </div>
    );
};
