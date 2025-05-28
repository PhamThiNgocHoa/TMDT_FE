import React, { useState, useEffect } from "react";
import styles from "./EditRevenue.module.css";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "./components/Header";

// Giả lập fetch dữ liệu doanh thu theo id
const fetchFakeRevenueById = (id: number) => {
    const revenues = [
        {
            id: 1,
            customerName: "Nguyễn Văn A",
            productName: "Sản phẩm 1",
            price: 1000000,
            status: "paid",
            date: "2024-05-20",
            avatarName: "avatar1.jpg",
        },
        {
            id: 2,
            customerName: "Trần Thị B",
            productName: "Sản phẩm 2",
            price: 500000,
            status: "debt",
            date: "2024-05-22",
            avatarName: null,
        },
    ];

    return revenues.find((r) => r.id === id) || null;
};

export function EditRevenue() {
    const navigate = useNavigate();

    const id = 1; // id giả định, thực tế có thể lấy từ params

    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [status, setStatus] = useState<"paid" | "debt">("paid");
    const [date, setDate] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const revenue = fetchFakeRevenueById(id);
        if (revenue) {
            setCustomerName(revenue.customerName);
            setProductName(revenue.productName);
            setPrice(revenue.price);
            setStatus(revenue.status as "paid" | "debt");
            setDate(revenue.date);
            setAvatar(null); // nếu có ảnh avatar dạng File thì cần xử lý upload riêng, ở đây giả lập null
        } else {
            setError("Không tìm thấy doanh thu với ID này.");
        }
        setLoading(false);
    }, [id]);

    const handleSave = () => {
        if (!customerName || !productName || price === "" || !date) {
            alert("Vui lòng nhập đầy đủ thông tin: khách hàng, sản phẩm, giá tiền và ngày.");
            return;
        }

        console.log("Cập nhật doanh thu:", {
            id,
            customerName,
            productName,
            price,
            status,
            date,
            avatar,
        });

        // TODO: Gọi API hoặc cập nhật context ở đây

        alert("Đã cập nhật doanh thu thành công!");
        navigate("/management/revenueManagement");
    };

    const handleCancel = () => {
        navigate("/management/revenueManagement");
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            alert(`Đã chọn ảnh: ${e.target.files[0].name}`);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải dữ liệu doanh thu...</div>;
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
                    <h2>Chỉnh sửa Doanh Thu</h2>
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
                            <label className={styles.label}>Tên khách hàng *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Sản phẩm *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Giá tiền *</label>
                            <input
                                type="number"
                                className={styles.input}
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value === "" ? "" : Number(e.target.value))
                                }
                                min={0}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Ngày *</label>
                            <input
                                type="date"
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
                                onChange={(e) =>
                                    setStatus(e.target.value as "paid" | "debt")
                                }
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
                    </div>
                </div>
            </div>
        </div>
    );
}
