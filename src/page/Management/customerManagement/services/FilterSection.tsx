"use client";
import React from 'react';
import styles from '../CustomerManagement.module.css';
import { useCustomers } from '../context/CustomerContext';

export const FilterSection: React.FC = () => {
    const { filters, setFilters } = useCustomers();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, sort: e.target.value });
    };

    return (
        <div className={styles.filterSection}>
            <div className={styles.filters}>
                <button className={styles.adminButtonWithIcon} onClick={() => console.log('Chọn ngày clicked')}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Chọn ngày</span>
                </button>
                <button className={styles.adminButtonWithIcon} onClick={() => console.log('Bộ lọc clicked')}>
                    <i className="fas fa-filter"></i>
                    <span>Bộ lọc</span>
                </button>

                {/* Đã loại bỏ select danh mục vì không còn field category */}

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
