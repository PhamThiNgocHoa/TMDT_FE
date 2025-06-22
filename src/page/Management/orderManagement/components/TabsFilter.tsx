import React from 'react';
import styles from '../OrderManagement.module.css';
import { useOrders } from '../context/OrderContext';
import { OrderStatus, OrderStatusDisplayName } from '../../../../enums/OrderStatus';

const TABS = [
  { key: '', label: 'Tất cả' },
  { key: OrderStatus.PENDING, label: OrderStatusDisplayName[OrderStatus.PENDING] },
  { key: OrderStatus.PENDING_PAYMENT, label: OrderStatusDisplayName[OrderStatus.PENDING_PAYMENT] },
  { key: OrderStatus.SHIPPING, label: OrderStatusDisplayName[OrderStatus.SHIPPING] },
  { key: OrderStatus.PAYMENT_SUCCESS, label: OrderStatusDisplayName[OrderStatus.PAYMENT_SUCCESS] },
  { key: OrderStatus.PAYMENT_FAILED, label: OrderStatusDisplayName[OrderStatus.PAYMENT_FAILED] },
  { key: OrderStatus.DELIVERED, label: OrderStatusDisplayName[OrderStatus.DELIVERED] },
  { key: OrderStatus.CANCELLED, label: OrderStatusDisplayName[OrderStatus.CANCELLED] },
  { key: OrderStatus.RETURNED, label: OrderStatusDisplayName[OrderStatus.RETURNED] },
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
      status: status === '' ? undefined : status as OrderStatus,
    });
    await fetchOrders();
  };

  return (
      <div className={styles.tabsFilter}>
        {TABS.map((tab) => (
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
