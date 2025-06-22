"use client";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import styles from "../HomepageManagment.module.css";

import {
    getProductsByCategory,
    getOrdersByStatus,
    getCustomerStats,
} from "../services/homepageService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const HomepageCharts: React.FC = () => {
    const [categoryData, setCategoryData] = useState<number[]>([]);
    const [orderStatusData, setOrderStatusData] = useState<number[]>([]);
    const [customerStats, setCustomerStats] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [categoryStats, orderStats, customerData] = await Promise.all([
                    getProductsByCategory(),
                    getOrdersByStatus(),
                    getCustomerStats()
                ]);

                setCategoryData(categoryStats);
                setOrderStatusData(orderStats);
                setCustomerStats(customerData);
            } catch {
                setError(`Không thể tải dữ liệu biểu đồ`);
            } finally {
                setLoading(false);
            }
        };
        fetchChartData();
    }, []);

    return (
        <div className={styles.chartSection}>
            <h3>Thống kê tổng quan</h3>

            {/* Trạng thái tải hoặc lỗi */}
            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {/* Biểu đồ sản phẩm theo danh mục */}
            <h3 style={{ marginTop: "2rem" }}>Sản phẩm theo danh mục</h3>
            <Bar
                data={{
                    labels: ['Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện', 'Đồng hồ'],
                    datasets: [
                        {
                            label: "Số lượng sản phẩm",
                            data: categoryData,
                            backgroundColor: "#60a5fa",
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: false },
                    },
                }}
            />

            {/* Biểu đồ đơn hàng theo trạng thái */}
            <h3 style={{ marginTop: "2rem" }}>Đơn hàng theo trạng thái</h3>
            <Doughnut
                data={{
                    labels: ['Chờ xử lý', 'Đang xử lý', 'Đã giao', 'Đã hủy'],
                    datasets: [
                        {
                            data: orderStatusData,
                            backgroundColor: [
                                '#fbbf24',
                                '#60a5fa',
                                '#34d399',
                                '#f87171'
                            ],
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: false },
                    },
                }}
            />

            {/* Biểu đồ thống kê khách hàng */}
            <h3 style={{ marginTop: "2rem" }}>Thống kê khách hàng</h3>
            <Bar
                data={{
                    labels: ['Khách hàng mới', 'Khách hàng thân thiết', 'Khách hàng VIP'],
                    datasets: [
                        {
                            label: "Số lượng",
                            data: customerStats,
                            backgroundColor: "#34d399",
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: false },
                    },
                }}
            />
        </div>
    );
};

export default HomepageCharts; 