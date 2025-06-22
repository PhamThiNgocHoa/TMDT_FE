"use client";
import React from 'react';
import styles from './HomepageManagment.module.css';
import { AdminSidebar } from '../AdminSidebar';
import { Header } from './components/Header';
import HomepageCharts from './components/HomepageCharts';
import { HomepageProvider, useHomepage } from './context/HomepageContext';

const HomepageOverview: React.FC = () => {
    const {
        loading,
        error,
        totalProducts,
        totalCategories,
        totalOrders,
        totalCustomers,
        homepageStats
    } = useHomepage();

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
                        <i className="fas fa-box"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Tổng sản phẩm</h3>
                        <p>{totalProducts.toLocaleString()}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-tags"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Tổng danh mục</h3>
                        <p>{totalCategories.toLocaleString()}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Tổng đơn hàng</h3>
                        <p>{totalOrders.toLocaleString()}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>Tổng khách hàng</h3>
                        <p>{totalCustomers.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <HomepageCharts />
        </div>
    );
};

const HomepageManagementContent: React.FC = () => {
    const { homepageStats } = useHomepage();

    // Hàm xuất báo cáo trang chủ
    const exportHomepageReport = () => {
        const headers = ['Thống kê', 'Số lượng'];
        const rows = [
            ['Tổng sản phẩm', homepageStats.totalProducts],
            ['Tổng danh mục', homepageStats.totalCategories],
            ['Tổng đơn hàng', homepageStats.totalOrders],
            ['Tổng khách hàng', homepageStats.totalCustomers]
        ];

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        csvContent += rows.map(row => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'bao_cao_trang_chu.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Hàm tạo báo cáo chi tiết
    const generateDetailedReport = () => {
        // Có thể mở modal hoặc chuyển trang để tạo báo cáo chi tiết
        console.log('Tạo báo cáo chi tiết trang chủ');
    };

    return (
        <div className={styles.postManagement}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <header className={styles.adminTitle}>
                    <div className={styles.title}>
                        <h1 className={styles.text}>Quản lý trang chủ</h1>
                        <nav className={styles.adminBreadcrumbs}>
                            <a href="/admin">Trang chủ</a>
                            <span>/</span>
                            <span>Quản lý trang chủ</span>
                        </nav>
                    </div>
                    <div className={styles.right2}>
                        {/* Nút Xuất báo cáo */}
                        <button className={styles.adminButtonWithIcon} onClick={exportHomepageReport}>
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
                    <HomepageOverview />
                </div>
            </div>
        </div>
    );
};

// Bọc toàn bộ bằng HomepageProvider
const HomepageManagment: React.FC = () => {
    return (
        <HomepageProvider>
            <HomepageManagementContent />
        </HomepageProvider>
    );
};

export default HomepageManagment;
