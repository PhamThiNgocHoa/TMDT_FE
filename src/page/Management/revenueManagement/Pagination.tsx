"use client";
import React from 'react';
import styles from './RevenueManagement.module.css';
import { useRevenues } from './context/RevenueContext';

export function Pagination() {
    const { pagination, setPagination, total, fetchRevenues } = useRevenues();

    const handlePageChange = async (page: number) => {
        setPagination({ ...pagination, page });
        await fetchRevenues();
    };

    const totalPages = Math.ceil(total / pagination.limit);

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
                Hiển thị {((pagination.page - 1) * pagination.limit) + 1}-
                {Math.min(pagination.page * pagination.limit, total)} trên tổng số {total}
            </div>
            <div className={styles.paginationControls}>
                <button
                    className={styles.paginationButton}
                    aria-label="Previous page"
                    onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                    disabled={pagination.page === 1}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.paginationPageButton} ${pagination.page === i + 1 ? styles.active : ''}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={styles.paginationButton}
                    aria-label="Next page"
                    onClick={() => handlePageChange(Math.min(totalPages, pagination.page + 1))}
                    disabled={pagination.page === totalPages}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}
