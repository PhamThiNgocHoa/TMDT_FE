import React from 'react';
import styles from '../OrderManagement.module.css';
import { useOrders } from '../context/OrderContext';

const TABS = [
  { key: '', label: 'Tất cả' },
  { key: 'PENDING', label: 'Chờ xử lý' },
  { key: 'PENDING_PAYMENT', label: 'Chờ thanh toán' },
  { key: 'SHIPPED', label: 'Đang giao' },
  { key: 'DELIVERED', label: 'Đã giao' },
  { key: 'CANCELLED', label: 'Đã hủy' },
];

export const TabsFilter: React.FC = () => {
  const { filters, setFilters, fetchOrders, orders } = useOrders();

  const countByStatus = (status: string) => {
    if (!status) return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  const handleTab = async (status: string) => {
    setFilters({
      ...filters,
      status: status === '' ? undefined : status as "PENDING" | "PENDING_PAYMENT" | "SHIPPED" | "DELIVERED" | "CANCELLED"
    });
    await fetchOrders();
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
                onClick={() => handleTab(tab.key)}
            >
              {tab.label}
              <span className={styles.tabCount}>{countByStatus(tab.key)}</span>
            </button>
        ))}
      </div>
  );
};
