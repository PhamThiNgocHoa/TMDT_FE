"use client";
import React from 'react';
import styles from './PostManagement.module.css';
import { usePosts } from './context/PostContext';

export function Pagination() {
    const { pagination, setPagination, total, fetchPosts } = usePosts();

    const handlePageChange = async (page: number) => {
        setPagination({ ...pagination, page });
        await fetchPosts();
    };

    const totalPages = Math.ceil(total / pagination.limit);

    return (
        <footer className={styles.adminFooter}>
            <p className={styles.showing110From100}>
                Hiển thị {((pagination.page - 1) * pagination.limit) + 1}-
                {Math.min(pagination.page * pagination.limit, total)} trên tổng số {total}
            </p>
            <nav className={styles.pagination}>
                <div className={styles.pages}>
                    <button
                        className={styles.arrowButton}
                        aria-label="Previous page"
                        onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                        disabled={pagination.page === 1}
                    >
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/934f206f2bb4dfe41abffb7cb5d572ce6cf0a156?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img42} alt="" />
                    </button>
                    {[...Array(Math.min(5, totalPages))].map((_, i) => (
                        <button
                            key={i}
                            className={pagination.page === i + 1 ? styles.numberButton : styles.numberButton2}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </button>
                    ))}
                    <button
                        className={styles.arrowButton}
                        aria-label="Next page"
                        onClick={() => handlePageChange(Math.min(totalPages, pagination.page + 1))}
                        disabled={pagination.page === totalPages}
                    >
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ddc58103883c000ad3f6aec0323bcd99019b5ee?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img43} alt="" />
                    </button>
                </div>
            </nav>
        </footer>
    );
}
