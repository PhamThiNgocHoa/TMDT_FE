import React, { useState } from "react";
import styles from "./AddRevenue.module.css";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "./components/Header";

export function AddRevenue() {
    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [status, setStatus] = useState<"paid" | "debt">("paid"); // chỉ 2 trạng thái
    const [date, setDate] = useState(""); // ISO date string, input type date
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleSave = () => {
        if (!customerName || !productName || price === "" || !date) {
            alert("Vui lòng nhập đầy đủ: Khách hàng, sản phẩm, giá tiền và ngày.");
            return;
        }

        // Thay bằng API gọi backend hoặc logic lưu dữ liệu
        console.log("Saving revenue...", {
            customerName,
            productName,
            price,
            status,
            date,
            avatar,
        });

        alert("Đã lưu doanh thu thành công!");
        handleCancel(); // reset form sau khi lưu
    };

    const handleCancel = () => {
        setCustomerName("");
        setProductName("");
        setPrice("");
        setStatus("paid");
        setDate("");
        setAvatar(null);
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            alert(`Đã chọn ảnh: ${e.target.files[0].name}`);
        }
    };

    return (
        <div className={styles.addCustomerContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.headerSection}>
                    <h2>Thêm Doanh Thu Mới</h2>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="customerName" className={styles.label}>
                            Khách hàng *
                        </label>
                        <input
                            type="text"
                            id="customerName"
                            className={styles.input}
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Nhập tên khách hàng"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="productName" className={styles.label}>
                            Sản phẩm *
                        </label>
                        <input
                            type="text"
                            id="productName"
                            className={styles.input}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.label}>
                            Giá tiền *
                        </label>
                        <input
                            type="number"
                            id="price"
                            className={styles.input}
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value === "" ? "" : Number(e.target.value))
                            }
                            placeholder="Nhập giá tiền"
                            min={0}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="date" className={styles.label}>
                            Ngày *
                        </label>
                        <input
                            type="date"
                            id="date"
                            className={styles.input}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Trạng thái *</label>
                        <select
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "paid" | "debt")}
                        >
                            <option value="paid">Đã thanh toán</option>
                            <option value="debt">Chưa thanh toán</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ảnh đại diện (nếu có)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className={styles.fileInput}
                        />
                        {avatar && <p className={styles.fileName}>{avatar.name}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.actionButtons}>
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
                </div>
            </div>
        </div>
    );
}
