"use client";
import React from 'react';
import styles from '../PostManagement.module.css';
import { usePosts } from '../context/PostContext';

export function FilterSection() {
    const { filters, setFilters, fetchPosts } = usePosts();

    const handleStatusFilter = async (status: string) => {
        setFilters({ ...filters, status });
        await fetchPosts();
    };

    const handleDateFilter = async (date: string) => {
        setFilters({ ...filters, date });
        await fetchPosts();
    };

    return (
        <section className={styles.adminFilter}>
            <div className={styles.adminTabs}>
                <button
                    className={filters.status === '' ? styles.adminTabButton : styles.adminTabButton2}
                    onClick={() => handleStatusFilter('')}
                >
                    Tất cả bài viết
                </button>
                <button
                    className={filters.status === 'approved' ? styles.adminTabButton : styles.adminTabButton2}
                    onClick={() => handleStatusFilter('approved')}
                >
                    Đã duyệt
                </button>
                <button
                    className={filters.status === 'pending' ? styles.adminTabButton : styles.adminTabButton3}
                    onClick={() => handleStatusFilter('pending')}
                >
                    Đang chờ
                </button>
                <button
                    className={filters.status === 'draft' ? styles.adminTabButton : styles.adminTabButton4}
                    onClick={() => handleStatusFilter('draft')}
                >
                    Bản nháp
                </button>
                <button
                    className={filters.status === 'rejected' ? styles.adminTabButton : styles.adminTabButton5}
                    onClick={() => handleStatusFilter('rejected')}
                >
                    Từ chối
                </button>
            </div>
            <div className={styles.filter}>
                <button
                    className={styles.datepicker}
                    onClick={() => {
                        // Implement date picker
                        handleDateFilter('2025-03-31');
                    }}
                >
          <span className={styles.icon5}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002290eae4a78009da9a649e4c8fe21f822e6cea?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img18} alt="Calendar" />
          </span>
                    <span className={styles.text4}>Chọn ngày</span>
                </button>
                <button
                    className={styles.filter2}
                    onClick={() => {
                        // Implement filter modal
                        console.log('Open filter modal');
                    }}
                >
          <span className={styles.icon6}>
            <span className={styles.fiSrSettingsSliders} />
          </span>
                    <span className={styles.filters}>Bộ lọc</span>
                </button>
            </div>
        </section>
    );
}
