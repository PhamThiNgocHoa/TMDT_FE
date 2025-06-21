"use client";
import React, { useState, useEffect } from "react";
import styles from "./EditOrder.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar";
import { Header } from "./components/Header";
import axios from "axios";
import Swal from "sweetalert2";

type OrderStatus =
    | "PENDING"
    | "PENDING_PAYMENT"
    | "SHIPPING"
    | "CARRIER_CANCELLED"
    | "PAYMENT_SUCCESS"
    | "PAYMENT_FAILED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

interface OrderData {
    id: number;
    fullname: string;
    address: string;
    phone: string;
    status: OrderStatus;
    totalAmount?: number;
    orderDate?: string;
    customerDTO?: {
        fullname: string;
        email: string;
        phone: string;
    };
}

export function EditOrder() {
    const navigate = useNavigate();
    const { Id: orderId } = useParams();

    const [orderData, setOrderData] = useState<OrderData>({
        id: 0,
        fullname: "",
        address: "",
        phone: "",
        status: "PENDING",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUsingMockData, setIsUsingMockData] = useState(false);

    const statusOptions = [
        { value: "PENDING", label: "Đang chờ xử lý" },
        { value: "PENDING_PAYMENT", label: "Đang chờ thanh toán" },
        { value: "SHIPPING", label: "Đang giao hàng" },
        { value: "DELIVERED", label: "Đã giao hàng" },
        { value: "PAYMENT_SUCCESS", label: "Đã thanh toán" },
        { value: "PAYMENT_FAILED", label: "Thanh toán thất bại" },
        { value: "CANCELLED", label: "Đã hủy" },
        { value: "RETURNED", label: "Đã trả hàng" },
    ];

    const canEditOrder = (status: string) => {
        // Chỉ có thể chỉnh sửa đơn hàng ở các trạng thái: PENDING_PAYMENT, PENDING, PAYMENT_FAILED
        return ['PENDING_PAYMENT', 'PENDING', 'PAYMENT_FAILED'].includes(status);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("Bạn chưa đăng nhập");

                console.log("🔍 Đang tải danh sách đơn hàng để lọc ID:", orderId);

                const res = await axios.get(`/api/admin/order/list`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const allOrders = res.data?.data || [];
                const order = allOrders.find((item: any) => String(item.id) === String(orderId));

                if (!order) throw new Error("Không tìm thấy đơn hàng với ID này");

                setOrderData({
                    id: order.id,
                    fullname: order.customerDTO?.fullname || order.fullname || "",
                    address: order.address || "",
                    phone: order.numberPhone || order.phone || "",
                    status: order.status || "PENDING",
                    totalAmount: order.totalAmount,
                    orderDate: order.orderDate,
                    customerDTO: order.customerDTO,
                });

                console.log("✅ Đã load đơn hàng thành công:", order);

            } catch (err: any) {
                console.error("❌ Lỗi khi load đơn hàng:", err);
                setError(err.message || "Lỗi không xác định");

                // Fallback mock data
                setIsUsingMockData(true);
                setOrderData({
                    id: parseInt(orderId || "0"),
                    fullname: "Nguyễn Văn A (Mock)",
                    address: "123 Đường ABC, Quận 1, TP.HCM (Mock)",
                    phone: "0123456789 (Mock)",
                    status: "PENDING",
                    totalAmount: 1500000,
                    orderDate: new Date().toISOString(),
                    customerDTO: {
                        fullname: "Nguyễn Văn A (Mock)",
                        email: "nguyenvana@example.com (Mock)",
                        phone: "0123456789 (Mock)",
                    },
                });

                Swal.fire({
                    icon: "info",
                    title: "Đang sử dụng dữ liệu mẫu",
                    text: "API đang gặp sự cố. Dữ liệu hiển thị là dữ liệu mẫu để test giao diện.",
                });
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        } else {
            setError("Thiếu ID đơn hàng");
            setLoading(false);
        }
    }, [orderId, navigate]);

    const handleSave = async () => {
        if (!orderData.fullname || !orderData.address || !orderData.phone) {
            return Swal.fire({
                icon: "warning",
                title: "Thiếu thông tin",
                text: "Vui lòng nhập đầy đủ thông tin bắt buộc!",
            });
        }

        if (isUsingMockData) {
            return Swal.fire({
                icon: "warning",
                title: "Không thể lưu",
                text: "Đang sử dụng dữ liệu mẫu. Vui lòng thử lại khi API hoạt động bình thường.",
            });
        }

        if (!canEditOrder(orderData.status)) {
            return Swal.fire({
                icon: "warning",
                title: "Không thể chỉnh sửa",
                text: "Chỉ có thể chỉnh sửa đơn hàng ở trạng thái 'Đang chờ xử lý', 'Đang chờ thanh toán' hoặc 'Thanh toán thất bại'",
            });
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const updateData = {
                fullname: orderData.fullname,
                address: orderData.address,
                phone: orderData.phone,
                status: orderData.status,
            };
            console.log("📤 Dữ liệu gửi lên server:", updateData);

            await axios.put(`/api/admin/order/${orderId}`, updateData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            await axios.put(`/api/admin/status/${orderData.status}/${orderId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await Swal.fire({
                icon: "success",
                title: "Cập nhật thành công!",
                text: "Thông tin đơn hàng đã được cập nhật.",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate("/management/orderManagement");
        } catch (err: any) {
            console.error("❌ Lỗi khi cập nhật:", err);
            Swal.fire({
                icon: "error",
                title: "Lỗi khi cập nhật",
                text: err.response?.data?.message || err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => navigate("/management/orderManagement");

    if (loading) return <div className={styles.loading}>Đang tải dữ liệu đơn hàng...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.editPostContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.editPostHeader}>
                    <h2>Chỉnh sửa thông tin đơn hàng #{orderData.id}</h2>
                    <div className={styles.headerActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy</button>
                        <button
                            className={`${styles.button} ${styles.primaryButton} ${(isUsingMockData || !canEditOrder(orderData.status)) ? styles.disabledButton : ""}`}
                            onClick={handleSave}
                            disabled={isUsingMockData || !canEditOrder(orderData.status)}
                        >
                            {isUsingMockData ? "Không thể lưu" : !canEditOrder(orderData.status) ? "Không thể chỉnh sửa" : "Lưu"}
                        </button>
                    </div>
                </div>
                {isUsingMockData && (
                    <div className={styles.mockDataBanner}>⚠️ Đang sử dụng dữ liệu mẫu - API đang gặp sự cố</div>
                )}
                {!isUsingMockData && !canEditOrder(orderData.status) && (
                    <div className={styles.readOnlyBanner}>
                        📋 Chế độ chỉ đọc - Không thể chỉnh sửa đơn hàng ở trạng thái này
                    </div>
                )}
                <div className={styles.editPostContent}>
                    <div className={styles.mainContent}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Họ tên khách hàng *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={orderData.fullname}
                                onChange={(e) => setOrderData({ ...orderData, fullname: e.target.value })}
                                disabled={!canEditOrder(orderData.status)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Địa chỉ giao hàng *</label>
                            <textarea
                                className={styles.textarea}
                                value={orderData.address}
                                onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                                rows={3}
                                disabled={!canEditOrder(orderData.status)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số điện thoại *</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={orderData.phone}
                                onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                                disabled={!canEditOrder(orderData.status)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Trạng thái đơn hàng *</label>
                            <select
                                className={styles.select}
                                value={orderData.status}
                                onChange={(e) => setOrderData({ ...orderData, status: e.target.value as OrderStatus })}
                                disabled={!canEditOrder(orderData.status)}
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarSection}>
                            <h3>Thông tin đơn hàng</h3>
                            <div className={styles.infoItem}><span className={styles.infoLabel}>Mã đơn hàng:</span><span className={styles.infoValue}>#{orderData.id}</span></div>
                            {orderData.totalAmount && (
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Tổng tiền:</span><span className={styles.infoValue}>{orderData.totalAmount.toLocaleString()} ₫</span></div>
                            )}
                            {orderData.orderDate && (
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Ngày đặt:</span><span className={styles.infoValue}>{new Date(orderData.orderDate).toLocaleDateString('vi-VN')}</span></div>
                            )}
                        </div>
                        {orderData.customerDTO && (
                            <div className={styles.sidebarSection}>
                                <h3>Thông tin khách hàng</h3>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Email:</span><span className={styles.infoValue}>{orderData.customerDTO.email}</span></div>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>SĐT:</span><span className={styles.infoValue}>{orderData.customerDTO.phone}</span></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
