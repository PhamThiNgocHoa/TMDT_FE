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
    getOrderByStatus,
} from "../services/homepageService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const orderStatuses = [
    "PENDING",
    "PENDING_PAYMENT",
    "SHIPPING",
    "CARRIER_CANCELLED",
    "PAYMENT_SUCCESS",
    "PAYMENT_FAILED",
    "DELIVERED",
    "CANCELLED",
];

const HomepageCharts: React.FC = () => {
    const [categoryData, setCategoryData] = useState<number[]>([]);
    const [orderCounts, setOrderCounts] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                setError(null);

                const categoryStats = await getProductsByCategory();
                const orderCountsData = await Promise.all(
                    orderStatuses.map(async (status) => {
                        const orders = await getOrderByStatus(status);
                        return orders;
                    })
                );

                setCategoryData(categoryStats);
                setOrderCounts(orderCountsData);
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

            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {/* 📊 Biểu đồ sản phẩm theo danh mục */}
            <h3 style={{ marginTop: "2rem" }}>Sản phẩm theo danh mục</h3>
            <Bar
                data={{
                    labels: [
                        "Điện thoại",
                        "Laptop",
                        "Máy tính bảng",
                        "Phụ kiện",
                        "Đồng hồ",
                    ],
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
                    plugins: { legend: { display: false }, title: { display: false } },
                }}
            />

            {/* 📊 Biểu đồ tròn thống kê đơn hàng theo trạng thái */}
            <h3 style={{ marginTop: "2rem" }}>Đơn hàng theo trạng thái</h3>
            <Doughnut
                data={{
                    labels: orderStatuses,
                    datasets: [
                        {
                            label: "Số lượng đơn hàng",
                            data: orderCounts,
                            backgroundColor: [
                                "#60a5fa",
                                "#34d399",
                                "#f87171",
                                "#facc15",
                                "#c084fc",
                                "#a3e635",
                                "#fb923c",
                                "#ec4899",
                            ],
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: { legend: { position: "right" } },
                }}
            />
        </div>
    );
};

export default HomepageCharts;
