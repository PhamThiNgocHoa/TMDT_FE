"use client";
import React from 'react';
import styles from './PostManagement.module.css';
import { usePosts } from './context/PostContext';

export function Pagination() {
    const { pagination, setPagination, total, fetchPosts } = usePosts();

    const handlePageChange = async (page: number) => {
        setPagination({ ...pagination, page: page - 1 });
        await fetchPosts();
    };

    const totalPages = Math.ceil(total / pagination.limit);
    const currentDisplayPage = pagination.page + 1;

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
                Hiển thị {((currentDisplayPage - 1) * pagination.limit) + 1}-
                {Math.min(currentDisplayPage * pagination.limit, total)} trên tổng số {total}
            </div>
            <div className={styles.paginationControls}>
                <button
                    className={styles.paginationButton}
                    aria-label="Previous page"
                    onClick={() => handlePageChange(Math.max(1, currentDisplayPage - 1))}
                    disabled={currentDisplayPage === 1}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.paginationPageButton} ${currentDisplayPage === i + 1 ? styles.active : ''}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={styles.paginationButton}
                    aria-label="Next page"
                    onClick={() => handlePageChange(Math.min(totalPages, currentDisplayPage + 1))}
                    disabled={currentDisplayPage === totalPages}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}
