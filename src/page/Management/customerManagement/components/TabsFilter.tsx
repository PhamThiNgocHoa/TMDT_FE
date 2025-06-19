import React from 'react';
import styles from '../CustomerManagement.module.css';
import { useCustomers } from '../context/CustomerContext';

export const TabsFilter: React.FC = () => {
  const { customers } = useCustomers();

  return (
      <div className={styles.tabsFilter}>
        <button className={styles.tabActive}>
          Tất cả khách hàng
          <span className={styles.tabCount}>{customers.length}</span>
        </button>
      </div>
  );
};
