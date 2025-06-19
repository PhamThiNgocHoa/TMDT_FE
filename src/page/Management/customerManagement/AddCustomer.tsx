import React, { useState } from 'react';
import styles from './AddCustomer.module.css';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './components/Header';
import { addCustomer } from './services/customerService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function AddCustomer() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!fullName || !username || !email || !password) {
            return Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Họ tên, Tên đăng nhập, Email và Mật khẩu là bắt buộc!',
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

        const customerData = {
            fullname: fullName,
            username,
            email,
            password,
            phone,
        };

        try {
            setLoading(true);
            console.log("📦 Dữ liệu gửi đi:", customerData);
            await addCustomer(customerData);
            await Swal.fire({
                icon: 'success',
                title: 'Thêm người dùng thành công!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/management/customer');
        } catch (err: any) {
            console.error('Chi tiết lỗi:', err.response?.data || err.message);
            Swal.fire({
                icon: 'error',
                title: 'Thêm người dùng thất bại',
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
                navigate('/management/customer');
            }
        });
    };

    return (
        <div className={styles.addCustomerContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.headerSection}>
                    <h2>Thêm Người Dùng Mới</h2>
                </div>

                <div className={styles.formSection}>
                    {/* Các ô input giữ nguyên */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ và Tên *</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên đăng nhập *</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập username"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email *</label>
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mật khẩu *</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số điện thoại</label>
                        <input
                            type="tel"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
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
