"use client";
import React from 'react';
import styles from './OrderManagement.module.css';
import { AdminSidebar } from '../AdminSidebar';
import { Header } from './components/Header';
import { TabsFilter } from './components/TabsFilter';
import { FilterSection } from './services/FilterSection';
import { OrderTable } from './services/OrderTable';
import { Pagination } from './Pagination';
import { OrderProvider } from './context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderManagementContent: React.FC = () => {
    const navigate = useNavigate();

    const handleAddOrderClick = () => {
        navigate('/management/orderManagement/add');
    };

    // Hàm xuất file CSV
    const exportToCSV = () => {
        // TODO: Implement CSV export functionality
        console.log('Export to CSV');
    };

    return (
        <div className={styles.orderManagement}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <header className={styles.adminTitle}>
                    <div className={styles.title}>
                        <h1 className={styles.text}>Quản lý đơn hàng</h1>
                        <nav className={styles.adminBreadcrumbs}>
                            <a href="/admin">Trang chủ</a>
                            <span>/</span>
                            <span>Quản lý đơn hàng</span>
                        </nav>
                    </div>
                    <div className={styles.right2}>
                        {/* Nút Xuất File */}
                        <button className={styles.adminButtonWithIcon} onClick={exportToCSV}>
                            <i className="fas fa-file-export"></i>
                            <span>Xuất file</span>
                        </button>
                        {/* Nút Thêm đơn hàng */}
                        <button className={styles.adminButtonWithIcon2} onClick={handleAddOrderClick}>
                            <i className="fas fa-plus"></i>
                            <span>Thêm đơn hàng</span>
                        </button>
                    </div>
                </header>
                <div className={styles.content}>
                    <TabsFilter />
                    <FilterSection />
                    <OrderTable />
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

const OrderManagement: React.FC = () => {
    return (
        <OrderProvider>
            <OrderManagementContent />
        </OrderProvider>
    );
};

export default OrderManagement;
