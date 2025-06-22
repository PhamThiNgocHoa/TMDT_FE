"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from './CustomerManagement.module.css';
import { useNavigate } from 'react-router-dom';
import {useCustomers} from "../../Management/customerManagement/context/CustomerContext";
import {Customer} from "../../../models/Customer";
import ViewCustomer from "../../Management/customerManagement/ViewCustomer";

export const CustomerTable: React.FC = () => {
    const {
        customers,
        loading,
        error,
        fetchCustomers,
        deleteCustomer,
        selectedCustomers,
        setSelectedCustomers
    } = useCustomers();

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [customerToDeleteId, setCustomerToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = customers.map(c => c.id.toString());
            setSelectedCustomers(allIds);
        } else {
            setSelectedCustomers([]);
        }
    };

    const handleSelectCustomer = (id: string) => {
        setSelectedCustomers(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const isCustomerSelected = (id: string) => selectedCustomers.includes(id);

    const handleDeleteSelected = () => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa (${selectedCustomers.length}) khách hàng đã chọn?`)) {
            selectedCustomers.forEach(id => deleteCustomer(id));
        }
    };

    const isAllSelected = useMemo(
        () => customers.length > 0 && selectedCustomers.length === customers.length,
        [customers, selectedCustomers]
    );

    const isIndeterminate = useMemo(
        () => selectedCustomers.length > 0 && selectedCustomers.length < customers.length,
        [customers, selectedCustomers]
    );

    const handleEditClick = (customerId: number) => {
        navigate(`/management/customerManagement/edit/${customerId}`);
    };

    const handleShowDeleteConfirm = (id: string) => {
        setCustomerToDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setCustomerToDeleteId(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (customerToDeleteId) {
            deleteCustomer(customerToDeleteId);
            setCustomerToDeleteId(null);
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
            {selectedCustomers.length > 0 && (
                <div className={styles.bulkActions}>
                    <span className={styles.selectedCount}>Đã chọn {selectedCustomers.length} khách hàng</span>
                    <button className={styles.deleteSelectedBtn} onClick={handleDeleteSelected}>
                        <i className="fas fa-trash"></i>
                        Xóa đã chọn
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
                    <th>ID</th>
                    <th>Họ tên</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Thao tác</th>
                </tr>
                </thead>

                <tbody>
                {customers
                    .filter((customer) => customer.role === 'STAFF')
                    .map((customer) => (
                        <tr key={customer.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={isCustomerSelected(customer.id.toString())}
                                    onChange={() => handleSelectCustomer(customer.id.toString())}
                                />
                            </td>
                            <td>{customer.id}</td>
                            <td>{customer.fullname}</td>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.editBtn} onClick={() => handleEditClick(customer.id)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className={styles.viewBtn}
                                        onClick={() => setSelectedCustomer(customer)}
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>

                                    <button className={styles.deleteBtn}
                                            onClick={() => handleShowDeleteConfirm(customer.id.toString())}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                {customers.length === 0 && !loading && !error && (
                    <tr>
                        <td colSpan={8} className={styles.noData}>Không có khách hàng nào được tìm thấy.</td>
                    </tr>
                )}
                </tbody>
            </table>

            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Xóa khách hàng?</h3>
                        <p>Bạn có chắc chắn muốn xóa khách hàng này không?</p>
                        <div className={styles.modalActions}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancelDelete}>Hủy</button>
                            <button className={`${styles.button} ${styles.primaryButton} ${styles.deleteButton}`} onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedCustomer && (
                <ViewCustomer
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                />
            )}

        </div>
    );
};
