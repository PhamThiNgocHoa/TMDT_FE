import React from 'react';
import styles from '../PostManagement.module.css';
import { usePosts } from '../context/PostContext';

export const Pagination: React.FC = () => {
    const { total, pagination, setPagination } = usePosts();
    const totalPages = Math.ceil(total / (pagination.limit || 10));
    const currentPage = pagination.page || 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setPagination({ ...pagination, page });
        }
    };

    const renderPageButtons = () => {
        const pages = [];
        // Display a limited number of page buttons around the current page
        const maxButtons = 5; // Maximum number of page buttons to display
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (startPage > 1) {
             pages.push(
                 <button 
                     key={1} 
                     className={styles.paginationPageButton}
                     onClick={() => handlePageChange(1)}
                 >1</button>
             );
             if (startPage > 2) {
                 pages.push(<span key="ellipsis-start">...</span>);
             }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`${styles.paginationPageButton} ${i === currentPage ? styles.active : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

         if (endPage < totalPages) {
             if (endPage < totalPages - 1) {
                 pages.push(<span key="ellipsis-end">...</span>);
             }
             pages.push(
                 <button 
                     key={totalPages} 
                     className={styles.paginationPageButton}
                     onClick={() => handlePageChange(totalPages)}
                 >{totalPages}</button>
             );
         }

        return pages;
    };

    const startItem = (currentPage - 1) * (pagination.limit || 10) + 1;
    const endItem = Math.min(currentPage * (pagination.limit || 10), total);

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
                Hiển thị {startItem}-{endItem} trên tổng số {total}
            </div>
            <div className={styles.paginationControls}>
                <button 
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                {renderPageButtons()}
                <button 
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}; 