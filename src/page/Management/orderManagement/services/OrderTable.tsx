"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../OrderManagement.module.css';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

export const OrderTable: React.FC = () => {
    const {
        orders,
        loading,
        error,
        fetchOrders,
        deleteOrder,
        selectedOrders,
        setSelectedOrders
    } = useOrders();

    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [orderToDeleteId, setOrderToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOrders(
            e.target.checked ? orders.map(o => o.id.toString()) : []
        );
    };

    const handleSelectOrder = (id: string) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const isAllSelected = useMemo(
        () => orders.length > 0 && selectedOrders.length === orders.length,
        [orders, selectedOrders]
    );

    const isIndeterminate = useMemo(
        () => selectedOrders.length > 0 && selectedOrders.length < orders.length,
        [orders, selectedOrders]
    );

    const handleEditClick = (order: { id: number }) => {
        navigate(`/management/orderManagement/edit/${order.id}`);
    };

    const handleShowDeleteConfirm = (id: string) => {
        setOrderToDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setOrderToDeleteId(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (orderToDeleteId) {
            deleteOrder(orderToDeleteId);
            setOrderToDeleteId(null);
            setShowDeleteConfirm(false);
        }
    };

    const statusLabel = (status: string) => {
        switch (status) {
            case "PENDING": return "Chờ xử lý";
            case "PENDING_PAYMENT": return "Chờ thanh toán";
            case "DELIVERED": return "Đã giao";
            case "CANCELLED": return "Đã hủy";
            case "SHIPPED": return "Đang giao";
            default: return status;
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
            {selectedOrders.length > 0 && (
                <div className={styles.bulkActions}>
                    <span className={styles.selectedCount}>Đã chọn {selectedOrders.length} mục</span>
                    <button className={styles.deleteSelectedBtn} onClick={() => {
                        if (window.confirm(`Xóa ${selectedOrders.length} đơn hàng?`)) {
                            selectedOrders.forEach(id => deleteOrder(id));
                        }
                    }}>
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
                    <th>Khách hàng</th>
                    <th>Địa chỉ</th>
                    <th>SĐT</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {orders.length === 0 && !loading && (
                    <tr>
                        <td colSpan={6} className={styles.noData}>Không có dữ liệu.</td>
                    </tr>
                )}
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedOrders.includes(order.id.toString())}
                                onChange={() => handleSelectOrder(order.id.toString())}
                            />
                        </td>
                        <td>{order.fullname}</td>
                        <td>{order.address}</td>
                        <td>{order.phone}</td>
                        <td>
                                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                    {statusLabel(order.status)}
                                </span>
                        </td>
                        <td>
                            <div className={styles.actions}>
                                <button className={styles.editBtn} onClick={() => handleEditClick(order)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className={styles.viewBtn} onClick={() => console.log('View order:', order.id)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button className={styles.deleteBtn} onClick={() => handleShowDeleteConfirm(order.id.toString())}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Xóa đơn hàng?</h3>
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
