"use client";
import React from 'react';
import styles from './RevenueManagement.module.css';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './components/Header';
import { TabsFilter } from './components/TabsFilter';
import { FilterSection } from './services/FilterSection';
import { RevenueTable } from './services/RevenueTable';
import { Pagination } from './Pagination';
import { RevenueProvider } from './context/RevenueContext';
import { useNavigate } from 'react-router-dom';

const RevenueManagement: React.FC = () => {
    const navigate = useNavigate();

    const handleAddRevenueClick = () => {
        navigate('/management/revenueManagement/add');
    };

    return (
        <RevenueProvider>
            <div className={styles.revenueManagement}>
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
                            <button className={styles.adminButtonWithIcon}>
                                <i className="fas fa-file-export"></i>
                                <span>Xuất file</span>
                            </button>
                            <button className={styles.adminButtonWithIcon2} onClick={handleAddRevenueClick}>
                                <i className="fas fa-plus"></i>
                                <span>Thêm doanh thu</span>
                            </button>
                        </div>
                    </header>
                    <div className={styles.content}>
                        <TabsFilter />
                        <FilterSection />
                        <RevenueTable />
                        <Pagination />
                    </div>
                </div>
            </div>
        </RevenueProvider>
    );
};

export default RevenueManagement;
