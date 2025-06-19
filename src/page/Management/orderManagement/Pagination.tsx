"use client";
import React from 'react';
import styles from './OrderManagement.module.css';
import { useOrders } from './context/OrderContext';

export function Pagination() {
    const { pagination, setPagination, total, fetchOrders } = useOrders();

    const handlePageChange = async (page: number) => {
        if (page === pagination.page) return;
        setPagination({ ...pagination, page });
        await fetchOrders();
    };

    const totalPages = Math.ceil(total / pagination.limit);

    // Tạo mảng số trang (tối đa 5 nút hiển thị gần trang hiện tại)
    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, pagination.page - 2);
        const end = Math.min(totalPages, pagination.page + 2);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
                Hiển thị {((pagination.page - 1) * pagination.limit) + 1} -
                {Math.min(pagination.page * pagination.limit, total)} trên tổng số {total}
            </div>
            <div className={styles.paginationControls}>
                <button
                    className={styles.paginationButton}
                    aria-label="Previous page"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>

                {pagination.page > 3 && totalPages > 5 && (
                    <>
                        <button className={styles.paginationPageButton} onClick={() => handlePageChange(1)}>1</button>
                        <span className={styles.ellipsis}>...</span>
                    </>
                )}

                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`${styles.paginationPageButton} ${pagination.page === page ? styles.active : ''}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {pagination.page < totalPages - 2 && totalPages > 5 && (
                    <>
                        <span className={styles.ellipsis}>...</span>
                        <button className={styles.paginationPageButton} onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className={styles.paginationButton}
                    aria-label="Next page"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === totalPages}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}
