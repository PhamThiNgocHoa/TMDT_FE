import React from 'react';
import styles from '../RevenueManagement.module.css';
import { useRevenues } from '../context/RevenueContext';

const TABS = [
  { key: '', label: 'Tất cả' },
  { key: 'paid', label: 'Đã thanh toán' },
  { key: 'debt', label: 'Nợ' },
];

export const TabsFilter: React.FC = () => {
  const { filters, setFilters, fetchRevenues, revenues } = useRevenues();

  // Đếm số lượng từng loại trạng thái
  const countByStatus = (status: string) => {
    if (!status) return revenues.length;
    return revenues.filter(revenue => revenue.status === status).length;
  };

  const handleTab = async (status: "" | "paid" | "debt") => {
    // Khi status là "" (tất cả), set thành undefined để phù hợp type
    setFilters({ ...filters, status: status === "" ? undefined : status });
    await fetchRevenues();
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
                onClick={() => handleTab(tab.key as "" | "paid" | "debt")}
            >
              {tab.label}
              <span className={styles.tabCount}>{countByStatus(tab.key)}</span>
            </button>
        ))}
      </div>
  );
};
