import React, { useState, useEffect } from "react";
import styles from "./EditOrder.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "./components/Header";
import axios from "axios";

export function EditOrder() {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<"PENDING" | "PENDING_PAYMENT" | "SHIPPED" | "DELIVERED" | "CANCELLED">("PENDING");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await axios.put(`/api/admin/order/${orderId}`);
                const order = response.data;
                setFullname(order.fullname);
                setAddress(order.address);
                setPhone(order.phone);
                setStatus(order.status);
            } catch (err) {
                setError("Không thể tải đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        } else {
            setError("Thiếu mã đơn hàng.");
            setLoading(false);
        }
    }, [orderId]);

    const handleSave = async () => {
        if (!fullname || !address || !phone) {
            alert("Vui lòng nhập đầy đủ họ tên, địa chỉ và số điện thoại.");
            return;
        }

        try {
            // Cập nhật trạng thái
            await axios.put(`/api/admin/status/${status}/${orderId}`);
            alert("✅ Cập nhật đơn hàng thành công!");
            navigate("/management/orderManagement");
        } catch (err) {
            console.error("❌ Lỗi khi cập nhật:", err);
            alert("❌ Có lỗi khi cập nhật đơn hàng.");
        }
    };

    const handleCancel = () => {
        navigate("/management/orderManagement");
    };

    if (loading) return <div className={styles.loading}>Đang tải dữ liệu đơn hàng...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.editPostContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.editPostHeader}>
                    <h2>Chỉnh sửa Đơn Hàng</h2>
                    <div className={styles.headerActions}>
                        <button
                            className={`${styles.button} ${styles.secondaryButton}`}
                            onClick={handleCancel}
                        >
                            Hủy
                        </button>
                        <button
                            className={`${styles.button} ${styles.primaryButton}`}
                            onClick={handleSave}
                        >
                            Lưu
                        </button>
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
                                disabled
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Địa chỉ *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số điện thoại *</label>
                            <input
                                type="tel"
                                className={styles.input}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Trạng thái *</label>
                            <select
                                className={styles.select}
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as typeof status)
                                }
                            >
                                <option value="PENDING">Chờ xử lý</option>
                                <option value="PENDING_PAYMENT">Chờ thanh toán</option>
                                <option value="SHIPPED">Đang giao</option>
                                <option value="DELIVERED">Đã giao</option>
                                <option value="CANCELLED">Đã hủy</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
