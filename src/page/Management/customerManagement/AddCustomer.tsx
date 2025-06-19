import React, { useState } from 'react';
import styles from './AddCustomer.module.css';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './components/Header';
import { addCustomer } from './services/customerService';
import { useNavigate } from 'react-router-dom';

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
            alert('Họ tên, Tên đăng nhập, Email và Mật khẩu là bắt buộc!');
            return;
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
            alert('Thêm người dùng thành công!');
            navigate('/management/customerManagement');
        } catch (err: any) {
            console.error('Chi tiết lỗi:', err.response?.data || err.message);
            alert('Không thể thêm người dùng: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc muốn hủy?')) {
            navigate('/management/customerManagement');
        }
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
