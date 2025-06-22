"use client";
import React from 'react';
import styles from '../OrderManagement.module.css';
import { useOrders } from '../context/OrderContext';
import { OrderStatus, OrderStatusDisplayName } from '../../../../enums/OrderStatus';

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
            status: value === '' ? undefined : value as OrderStatus,
        });
        fetchOrders();
    };

    return (
        <div className={styles.filterSection}>
            <div className={styles.filters}>
                <button
                    className={styles.adminButtonWithIcon}
                    onClick={() => console.log('Chọn ngày clicked')}
                >
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
                    <option value={OrderStatus.PENDING}>{OrderStatusDisplayName[OrderStatus.PENDING]}</option>
                    <option value={OrderStatus.PENDING_PAYMENT}>{OrderStatusDisplayName[OrderStatus.PENDING_PAYMENT]}</option>
                    <option value={OrderStatus.SHIPPING}>{OrderStatusDisplayName[OrderStatus.SHIPPING]}</option>
                    <option value={OrderStatus.PAYMENT_SUCCESS}>{OrderStatusDisplayName[OrderStatus.PAYMENT_SUCCESS]}</option>
                    <option value={OrderStatus.PAYMENT_FAILED}>{OrderStatusDisplayName[OrderStatus.PAYMENT_FAILED]}</option>
                    <option value={OrderStatus.DELIVERED}>{OrderStatusDisplayName[OrderStatus.DELIVERED]}</option>
                    <option value={OrderStatus.CANCELLED}>{OrderStatusDisplayName[OrderStatus.CANCELLED]}</option>
                    <option value={OrderStatus.RETURNED}>{OrderStatusDisplayName[OrderStatus.RETURNED]}</option>
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
