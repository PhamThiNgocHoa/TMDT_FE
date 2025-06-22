"use client";
import React, { useEffect, useState } from 'react';
import styles from './RevenusManagement.module.css';
import { AdminSidebar } from '../AdminSidebar';
import { Header } from './components/Header';
import RevenueCharts from './components/RevenueCharts';
import { RevenueProvider, useRevenue } from './context/RevenueContext';

// Component kiểm tra authentication
const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            window.location.href = '/admin/login';
            return;
        }
        
        // Kiểm tra token có hợp lệ không (có thể thêm logic kiểm tra role admin)
        setIsAuthenticated(true);
    }, []);

    if (isAuthenticated === null) {
        return <div className={styles.loading}>Đang kiểm tra quyền truy cập...</div>;
    }

    if (!isAuthenticated) {
        return null; // Sẽ redirect
    }

    return <>{children}</>;
};

const RevenueOverview: React.FC = () => {
    const {
        loading,
        error,
        revenueToday,
        totalRevenueThisMonth,
        totalUsers,
        totalPendingOrders,
        revenueByDate
    } = useRevenue();

    // Debug log để kiểm tra giá trị
    console.log("RevenueOverview - revenueToday:", revenueToday);
    console.log("RevenueOverview - totalRevenueThisMonth:", totalRevenueThisMonth);
    console.log("RevenueOverview - totalUsers:", totalUsers);
    console.log("RevenueOverview - totalPendingOrders:", totalPendingOrders);
    console.log("RevenueOverview - revenueByDate:", revenueByDate);

    if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;

    return (
        <div className={styles.dashboardContent}>
            {error && (
                <div className={styles.errorBanner}>
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>{error}</span>
                </div>
            )}
            
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Doanh thu hôm nay</h3>
                        <p>{revenueToday.toLocaleString()} ₫</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Doanh thu tháng này</h3>
                        <p>{totalRevenueThisMonth.toLocaleString()} ₫</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Tổng người dùng</h3>
                        <p>{totalUsers.toLocaleString()}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Đơn đang xử lý</h3>
                        <p>{totalPendingOrders.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <RevenueCharts />
        </div>
    );
};

const RevenueManagementContent: React.FC = () => {
    const { revenueByDate } = useRevenue();

    // Hàm xuất báo cáo doanh thu
    const exportRevenueReport = () => {
        const headers = ['Ngày', 'Doanh thu (VNĐ)'];
        const rows = revenueByDate.map(rev => [
            rev.date,
            rev.amount.toLocaleString()
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        csvContent += rows.map(row => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'bao_cao_doanh_thu.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Hàm tạo báo cáo chi tiết
    const generateDetailedReport = () => {
        // Có thể mở modal hoặc chuyển trang để tạo báo cáo chi tiết
        console.log('Tạo báo cáo chi tiết');
    };

    return (
        <div className={styles.postManagement}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <header className={styles.adminTitle}>
                    <div className={styles.title}>
                        <h1 className={styles.text}>Quản lý doanh thu</h1>
                        <nav className={styles.adminBreadcrumbs}>
                            <a href="/admin">Trang chủ</a>
                            <span>/</span>
                            <span>Quản lý doanh thu</span>
                        </nav>
                    </div>
                    <div className={styles.right2}>
                        {/* Nút Xuất báo cáo */}
                        <button className={styles.adminButtonWithIcon} onClick={exportRevenueReport}>
                            <i className="fas fa-file-export"></i>
                            <span>Xuất báo cáo</span>
                        </button>
                        {/* Nút Tạo báo cáo chi tiết */}
                        <button className={styles.adminButtonWithIcon2} onClick={generateDetailedReport}>
                            <i className="fas fa-chart-line"></i>
                            <span>Báo cáo chi tiết</span>
                        </button>
                    </div>
                </header>
                <div className={styles.content}>
                    <RevenueOverview />
                </div>
            </div>
        </div>
    );
};

// Bọc toàn bộ bằng RevenueProvider và AuthCheck
const RevenusManagement: React.FC = () => {
    return (
        <AuthCheck>
            <RevenueProvider>
                <RevenueManagementContent />
            </RevenueProvider>
        </AuthCheck>
    );
};

export default RevenusManagement;
