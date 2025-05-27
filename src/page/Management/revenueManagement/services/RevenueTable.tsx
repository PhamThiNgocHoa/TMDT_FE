"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../RevenueManagement.module.css';
import { useRevenues } from '../context/RevenueContext'; // giả sử dùng useRevenues cho doanh thu
import { useNavigate } from 'react-router-dom';

export const RevenueTable: React.FC = () => {
    const {
        revenues,
        loading,
        error,
        fetchRevenues,
        deleteRevenue,
        selectedRevenues,
        setSelectedRevenues
    } = useRevenues();

    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [revenueToDeleteId, setRevenueToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchRevenues();
    }, [fetchRevenues]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = revenues.map(r => r.id.toString());
            setSelectedRevenues(allIds);
        } else {
            setSelectedRevenues([]);
        }
    };

    const handleSelectRevenue = (id: string) => {
        setSelectedRevenues(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const isRevenueSelected = (id: string) => selectedRevenues.includes(id);

    const handleDeleteSelected = () => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa (${selectedRevenues.length}) mục đã chọn?`)) {
            selectedRevenues.forEach(id => deleteRevenue(id));
        }
    };

    const isAllSelected = useMemo(
        () => revenues.length > 0 && selectedRevenues.length === revenues.length,
        [revenues, selectedRevenues]
    );

    const isIndeterminate = useMemo(
        () => selectedRevenues.length > 0 && selectedRevenues.length < revenues.length,
        [revenues, selectedRevenues]
    );

    const handleEditClick = (revenue: { id: number }) => {
        navigate(`/management/revenueManagement/edit/${revenue.id}`);
    };

    const handleShowDeleteConfirm = (id: string) => {
        setRevenueToDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setRevenueToDeleteId(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (revenueToDeleteId) {
            deleteRevenue(revenueToDeleteId);
            setRevenueToDeleteId(null);
            setShowDeleteConfirm(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <i className="fas fa-exclamation-circle"></i>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            {selectedRevenues.length > 0 && (
                <div className={styles.bulkActions}>
                    <span className={styles.selectedCount}>Đã chọn {selectedRevenues.length} mục</span>
                    <button className={styles.deleteSelectedBtn} onClick={handleDeleteSelected}>
                        <i className="fas fa-trash"></i> Xóa đã chọn
                    </button>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            ref={input => {
                                if (input) input.indeterminate = isIndeterminate;
                            }}
                        />
                    </th>
                    <th>Tên khách hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Tình trạng</th>
                    <th>Ngày</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {revenues.length === 0 && !loading && (
                    <tr>
                        <td colSpan={7} className={styles.noData}>Không có dữ liệu.</td>
                    </tr>
                )}
                {revenues.map((revenue) => (
                    <tr key={revenue.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={isRevenueSelected(revenue.id.toString())}
                                onChange={() => handleSelectRevenue(revenue.id.toString())}
                            />
                        </td>
                        <td>{revenue.customerName}</td>
                        <td>{revenue.productName}</td>
                        <td>{revenue.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td>
                                <span className={`${styles.status} ${styles[revenue.status === 'paid' ? 'paid' : 'debt']}`}>
                                    {revenue.status === 'paid' ? 'Đã thanh toán' : 'Nợ'}
                                </span>
                        </td>
                        <td>{new Date(revenue.date).toLocaleDateString('vi-VN')}</td>
                        <td>
                            <div className={styles.actions}>
                                <button className={styles.editBtn} onClick={() => handleEditClick(revenue)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className={styles.viewBtn} onClick={() => console.log('View revenue:', revenue.id)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button className={styles.deleteBtn} onClick={() => handleShowDeleteConfirm(revenue.id.toString())}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal xác nhận xóa */}
            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Xóa mục doanh thu?</h3>
                        <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                        <div className={styles.modalActions}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancelDelete}>Hủy</button>
                            <button className={`${styles.button} ${styles.primaryButton} ${styles.deleteButton}`} onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
