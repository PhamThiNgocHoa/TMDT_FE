import React, { useState } from "react";
import styles from "./AddOrder.module.css";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "./components/Header";
import axios from "axios";

export function AddOrder() {
    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<"PENDING" | "PENDING_PAYMENT" | "SHIPPED" | "DELIVERED" | "CANCELLED">("PENDING");

    const handleSave = async () => {
        if (!fullname || !address || !phone) {
            alert("Vui lòng nhập đầy đủ Họ tên, Địa chỉ, và Số điện thoại.");
            return;
        }

        const payload = {
            fullname,
            address,
            phone,
            status,
        };

        try {
            const response = await axios.post("/api/admin/order", payload);
            alert("✅ Đơn hàng đã được thêm!");
            console.log("📦 Response:", response.data);
            handleCancel(); // reset form
        } catch (error: any) {
            console.error("❌ Lỗi khi tạo đơn hàng:", error);
            alert("❌ Có lỗi xảy ra khi thêm đơn hàng.");
        }
    };

    const handleCancel = () => {
        setFullname("");
        setAddress("");
        setPhone("");
        setStatus("PENDING");
    };

    return (
        <div className={styles.addCustomerContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.headerSection}>
                    <h2>Thêm Đơn Hàng Mới</h2>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ tên *</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Nhập họ tên người nhận"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Địa chỉ *</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nhập địa chỉ giao hàng"
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

                    <div className={styles.formGroup}>
                        <div className={styles.actionButtons}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>
                                Hủy
                            </button>
                            <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleSave}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
