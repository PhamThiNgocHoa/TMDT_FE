"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import styles from "../RevenusManagement.module.css";

import {
    getRevenueByDate,
    getRevenueByMonthYear,
    getRevenueByMonth,
} from "../services/revenueService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueCharts: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [dailyRevenue, setDailyRevenue] = useState<number>(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
    const [yearData, setYearData] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchYearData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getRevenueByMonth();
                setYearData(data.map((item) => item.revenue || 0)); // ✅ lấy trường revenue
            } catch (error: any) {
                setError(error.message || "Không thể tải doanh thu 12 tháng");
                setYearData(Array(12).fill(0)); // Set default data
            } finally {
                setLoading(false);
            }
        };
        fetchYearData();
    }, []);

    const fetchRevenueByDate = async () => {
        if (!selectedDate) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getRevenueByDate(selectedDate);
            setDailyRevenue(data.amount || 0);
        } catch (error: any) {
            setError(error.message || "Không thể tải doanh thu ngày");
            setDailyRevenue(0);
        } finally {
            setLoading(false);
        }
    };

    const fetchRevenueByMonthYear = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRevenueByMonthYear(selectedMonth, selectedYear);
            setMonthlyRevenue(data.revenue || 0); // ✅ lấy trường revenue
        } catch (error: any) {
            setError(error.message || "Không thể tải doanh thu tháng/năm");
            setMonthlyRevenue(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.chartSection}>
            <h3>Tra cứu doanh thu</h3>

            {/* Tra cứu doanh thu ngày */}
            <div className={styles.searchRow}>
                <input
                    className={styles.input}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button
                    className={styles.adminButtonWithIcon}
                    onClick={fetchRevenueByDate}
                    disabled={loading}
                >
                    {loading ? "Đang tải..." : "Xem doanh thu ngày"}
                </button>
            </div>
            <div className={styles.resultText}>
                Doanh thu ngày {selectedDate || "(chưa chọn)"}:{" "}
                {dailyRevenue.toLocaleString()} ₫
            </div>

            {/* Tra cứu doanh thu tháng/năm */}
            <div className={styles.searchRow} style={{ marginTop: "1rem" }}>
                <input
                    className={styles.input}
                    type="number"
                    min={1}
                    max={12}
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    placeholder="Tháng"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    placeholder="Năm"
                />
                <button
                    className={styles.adminButtonWithIcon}
                    onClick={fetchRevenueByMonthYear}
                    disabled={loading}
                >
                    {loading ? "Đang tải..." : "Xem doanh thu tháng"}
                </button>
            </div>
            <div className={styles.resultText}>
                Doanh thu {selectedMonth}/{selectedYear}:{" "}
                {monthlyRevenue.toLocaleString()} ₫
            </div>

            {/* Trạng thái tải hoặc lỗi */}
            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {/* Biểu đồ doanh thu */}
            <h3 style={{ marginTop: "2rem" }}>Biểu đồ doanh thu 12 tháng</h3>
            <Bar
                data={{
                    labels: Array.from({ length: 12 }, (_, i) => `T${i + 1}`),
                    datasets: [
                        {
                            label: "Doanh thu",
                            data: yearData,
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
        </div>
    );

};

export default RevenueCharts;
