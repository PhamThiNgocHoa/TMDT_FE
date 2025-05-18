"use client";
import React from 'react';
import styles from '../PostManagement.module.css';
import { usePosts } from '../context/PostContext';

export const FilterSection: React.FC = () => {
    const { filters, setFilters } = usePosts();

    // Search functionality moved to Header component
    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFilters({ ...filters, search: e.target.value });
    // };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, category: e.target.value });
    };

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

                <select 
                    className={styles.filterSelect}
                    value={filters.category || ''}
                    onChange={handleCategoryChange}
                >
                    <option value="">Tất cả danh mục</option>
                    <option value="news">Tin tức</option>
                    <option value="guide">Hướng dẫn</option>
                    <option value="review">Đánh giá</option>
                    <option value="game">Game</option>
                    <option value="marketing">Marketing</option>
                </select>

                <select 
                    className={styles.filterSelect}
                    value={filters.sort || 'newest'}
                    onChange={handleSortChange}
                >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="views">Lượt xem</option>
                </select>
            </div>
        </div>
    );
};
