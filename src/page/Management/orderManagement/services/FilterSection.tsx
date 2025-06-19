"use client";
import React from 'react';
import styles from '../OrderManagement.module.css';
import { useOrders } from '../context/OrderContext';

export const FilterSection: React.FC = () => {
    const { filters, setFilters, fetchOrders } = useOrders();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, sort: e.target.value });
        fetchOrders();
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            status: value === '' ? undefined : value as "PENDING" | "PENDING_PAYMENT" | "SHIPPED" | "DELIVERED" | "CANCELLED"
        });
        fetchOrders();
    };

    return (
        <div className={styles.filterSection}>
            <div className={styles.filters}>
                <button className={styles.adminButtonWithIcon} onClick={() => console.log('Chọn ngày clicked')}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Chọn ngày</span>
                </button>

                {/* Dropdown lọc trạng thái */}
                <select
                    className={styles.filterSelect}
                    value={filters.status || ''}
                    onChange={handleStatusChange}
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="PENDING">Chờ xử lý</option>
                    <option value="PENDING_PAYMENT">Chờ thanh toán</option>
                    <option value="SHIPPED">Đang giao</option>
                    <option value="DELIVERED">Đã giao</option>
                    <option value="CANCELLED">Đã hủy</option>
                </select>

                <select
                    className={styles.filterSelect}
                    value={filters.sort || 'newest'}
                    onChange={handleSortChange}
                >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                </select>
            </div>
        </div>
    );
};
