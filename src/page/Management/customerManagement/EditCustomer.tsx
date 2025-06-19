"use client";
import React, { useState, useEffect } from 'react';
import styles from './EditCustomer.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './components/Header';
import axios from 'axios';

export function EditCustomer() {
    const navigate = useNavigate();
    const { Id: customerId } = useParams(); // chú ý dùng đúng tên "Id" vì ở App.tsx là ":Id"

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await axios.get(`/api/admin/customer/${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                const customer = res.data.data;
                setFullname(customer.fullname || '');
                setUsername(customer.username || '');
                setEmail(customer.email || '');
                setPhone(customer.phone || '');
            } catch (err: any) {
                const status = err.response?.status;
                const code = err.response?.data?.code;

                if (status === 401 || code === 4202) {
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    localStorage.removeItem("authToken");
                    window.location.href = "/login";
                } else {
                    setError('Không tìm thấy khách hàng hoặc lỗi khi tải dữ liệu.');
                    console.error('❌ Lỗi khi load khách hàng:', {
                        message: err.message,
                        status,
                        data: err.response?.data
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [customerId]);

    const handleSave = async () => {
        if (!fullname || !username || !email) {
            alert('Vui lòng nhập đầy đủ thông tin bắt buộc!');
            return;
        }

        try {
            setLoading(true);

            const updateData: any = {
                fullname,
                username,
                email,
                phone,
            };

            if (password.trim() !== '') {
                updateData.password = password;
            }

            console.log("📤 Dữ liệu gửi lên server:", updateData);

            const response = await axios.put(`/api/admin/customer/${customerId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            console.log("✅ Phản hồi từ server khi cập nhật:", response.data);

            alert('✅ Đã cập nhật thông tin khách hàng!');
            navigate('/management/customerManagement');
        } catch (err: any) {
            const status = err.response?.status;
            const code = err.response?.data?.code;
            const message = err.response?.data?.message || err.message;

            if (status === 401 || code === 4202) {
                alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            } else {
                console.error("❌ Lỗi khi cập nhật:", {
                    status,
                    message,
                    errorData: err.response?.data,
                    headers: err.response?.headers,
                    requestData: err.config?.data,
                    method: err.config?.method,
                    url: err.config?.url,
                });

                alert('Không thể cập nhật khách hàng: ' + message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/management/customerManagement');
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải dữ liệu khách hàng...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.editPostContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.editPostHeader}>
                    <h2>Chỉnh sửa thông tin khách hàng</h2>
                    <div className={styles.headerActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy</button>
                        <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleSave}>Lưu</button>
                    </div>
                </div>
                <div className={styles.editPostContent}>
                    <div className={styles.mainContent}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Họ tên *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tên đăng nhập *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email *</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số điện thoại</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Mật khẩu mới (nếu muốn đổi)</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Để trống nếu không muốn đổi"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
