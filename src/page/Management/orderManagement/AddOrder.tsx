"use client";
import React, { useState } from 'react';
import styles from './AddOrder.module.css';
import { AdminSidebar } from '../AdminSidebar';
import { Header } from './components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { OrderStatus, OrderStatusDisplayName } from '../../../enums/OrderStatus';
import useCustomer from "../../../hooks/useCustomer";

export function AddOrder() {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);
    const [totalAmount, setTotalAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user} = useCustomer();

    const statusOptions = [
        { value: OrderStatus.PENDING, label: OrderStatusDisplayName[OrderStatus.PENDING] },
        { value: OrderStatus.PENDING_PAYMENT, label: OrderStatusDisplayName[OrderStatus.PENDING_PAYMENT] },
        { value: OrderStatus.SHIPPING, label: OrderStatusDisplayName[OrderStatus.SHIPPING] },
        { value: OrderStatus.DELIVERED, label: OrderStatusDisplayName[OrderStatus.DELIVERED] },
        { value: OrderStatus.PAYMENT_SUCCESS, label: OrderStatusDisplayName[OrderStatus.PAYMENT_SUCCESS] },
        { value: OrderStatus.PAYMENT_FAILED, label: OrderStatusDisplayName[OrderStatus.PAYMENT_FAILED] },
        { value: OrderStatus.CANCELLED, label: OrderStatusDisplayName[OrderStatus.CANCELLED] },
        { value: OrderStatus.RETURNED, label: OrderStatusDisplayName[OrderStatus.RETURNED] }
    ];

    const canEditOrder = (status: string) => {
        // Chỉ có thể chỉnh sửa đơn hàng ở các trạng thái: PENDING_PAYMENT, PENDING, PAYMENT_FAILED
        return [OrderStatus.PENDING_PAYMENT, OrderStatus.PENDING, OrderStatus.PAYMENT_FAILED].includes(status as OrderStatus);
    };

    const handleSave = async () => {
        if (!fullname || !address || !phone) {
            return Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Họ tên, địa chỉ và số điện thoại là bắt buộc!',
            });
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            return Swal.fire({
                icon: 'warning',
                title: 'Chưa đăng nhập',
                text: 'Vui lòng đăng nhập lại để thực hiện thao tác này.',
            });
        }

        const orderData = {
            fullname,
            address,
            phone,
            email,
            status,
            totalAmount: totalAmount ? parseFloat(totalAmount) : 0
        };

        try {
            setLoading(true);
            console.log("📦 Dữ liệu gửi đi:", orderData);
            
            const response = await axios.post('/api/admin/order', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("✅ Phản hồi từ server:", response.data);

            await Swal.fire({
                icon: 'success',
                title: 'Thêm đơn hàng thành công!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/management/orderManagement');
        } catch (err: any) {
            console.error('Chi tiết lỗi:', err.response?.data || err.message);
            Swal.fire({
                icon: 'error',
                title: 'Thêm đơn hàng thất bại',
                text: err.response?.data?.message || err.message || 'Đã có lỗi xảy ra.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn hủy?',
            text: 'Mọi thay đổi sẽ không được lưu.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Quay lại',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/management/orderManagement');
            }
        });
    };

    return (
        <div className={styles.addOrderContainer}>
            <AdminSidebar user={user} />
            <div className={styles.body}>
                <Header />
                <div className={styles.headerSection}>
                    <h2>Thêm Đơn Hàng Mới</h2>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ tên khách hàng *</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Nhập họ tên khách hàng"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Địa chỉ giao hàng *</label>
                        <textarea
                            className={styles.textarea}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nhập địa chỉ giao hàng"
                            rows={3}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số điện thoại *</label>
                        <input
                            type="tel"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Trạng thái đơn hàng</label>
                        <select
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value as OrderStatus)}
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tổng tiền (VNĐ)</label>
                        <input
                            type="number"
                            className={styles.input}
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            placeholder="Nhập tổng tiền"
                            min="0"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.actionButtons}>
                            <button
                                className={`${styles.button} ${styles.secondaryButton}`}
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Hủy
                            </button>
                            <button
                                className={`${styles.button} ${styles.primaryButton}`}
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? 'Đang lưu...' : 'Lưu'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
