import React from 'react';
import styles from '../CustomerManagement.module.css';
import { useCustomers } from '../context/CustomerContext';

const TABS = [
  { key: '', label: 'Tất cả khách hàng' },
  { key: 'pending', label: 'Đang chờ' },
  { key: 'active', label: 'Hoạt động' },
  { key: 'inactive', label: 'Không hoạt động' },
];

export const TabsFilter: React.FC = () => {
  const { filters, setFilters, fetchCustomers, customers } = useCustomers();

  // Đếm số lượng từng loại trạng thái
  const countByStatus = (status: string) => {
    if (!status) return customers.length;
    return customers.filter(customer => customer.status === status).length;
  };

  const handleTab = async (status: "" | "pending" | "active" | "inactive") => {
    setFilters({ ...filters, status });
    await fetchCustomers();
  };

  return (
    <div className={styles.tabsFilter}>
      {TABS.map(tab => (
        <button
          key={tab.key}
          className={
            filters.status === tab.key || (!filters.status && tab.key === '')
              ? styles.tabActive
              : styles.tab
          }
          onClick={() => handleTab(tab.key as "" | "pending" | "active" | "inactive")}
        >
          {tab.label}
          <span className={styles.tabCount}>{countByStatus(tab.key)}</span>
        </button>
      ))}
    </div>
  );
};