"use client";
import React, {useState, useEffect} from 'react';
import styles from './EditCustomer.module.css';
import {useParams, useNavigate} from 'react-router-dom';
import {Header} from './components/Header';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCustomer from "../../../hooks/useCustomer";
import {AdminSidebar} from "../AdminSidebar"; // ✅ Thêm dòng này

export function EditCustomer() {
    const navigate = useNavigate();
    const {Id: customerId} = useParams();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = useCustomer();

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
                setRole(customer.role || 'USER');
            } catch (err: any) {
                const status = err.response?.status;
                const code = err.response?.data?.code;

                if (status === 401 || code === 4202) {
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Phiên đăng nhập hết hạn',
                        text: 'Vui lòng đăng nhập lại.',
                    });
                    localStorage.removeItem("authToken");
                    navigate("/login");
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
    }, [customerId, navigate]);

    const handleSave = async () => {
        if (!fullname || !username || !email) {
            return Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng nhập đầy đủ thông tin bắt buộc!',
            });
        }

        try {
            setLoading(true);

            const updateData: any = {
                fullname,
                username,
                email,
                phone,
                role,
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

            await Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công!',
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/management/customer');
        } catch (err: any) {
            const status = err.response?.status;
            const code = err.response?.data?.code;
            const message = err.response?.data?.message || err.message;

            if (status === 401 || code === 4202) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Phiên đăng nhập hết hạn',
                    text: 'Vui lòng đăng nhập lại.',
                });
                localStorage.removeItem("authToken");
                navigate("/login");
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

                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi khi cập nhật',
                    text: message,
                });
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
            <AdminSidebar user={user}/>
            <div className={styles.body}>
                <Header/>
                <div className={styles.editPostHeader}>
                    <h2>Chỉnh sửa thông tin khách hàng</h2>
                    <div className={styles.headerActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy
                        </button>
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
                            <label className={styles.label}>Quyền</label>

                            {user?.role === 'ADMIN' ? (
                                <select
                                    className={styles.input}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="USER">Người dùng</option>
                                    <option value="STAFF">Nhân viên</option>
                                    <option value="ADMIN">Quản trị viên</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={
                                        role === 'ADMIN'
                                            ? 'Quản trị viên'
                                            : role === 'STAFF'
                                                ? 'Nhân viên'
                                                : 'Người dùng'
                                    }
                                    readOnly
                                />
                            )}
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
