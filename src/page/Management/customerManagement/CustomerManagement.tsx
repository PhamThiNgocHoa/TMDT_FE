"use client";
import React from 'react';
import styles from './CustomerManagement.module.css';
import { AdminSidebar } from './AdminSidebar';
// import { TopBar } from './TopBar'; // Removed TopBar as Header component replaces it
import { Header } from './components/Header'; // Use named import
import { TabsFilter } from './components/TabsFilter'; // Use named import
import { FilterSection } from './services/FilterSection'; // Use named import
import { CustomerTable } from './services/CustomerTable'; // Use named import
import { Pagination } from './Pagination'; // Use named import
import { CustomerProvider } from './context/CustomerContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CustomerManagement: React.FC = () => {
    const navigate = useNavigate();

    const handleAddPostClick = () => {
        navigate('/management/customerManagement/add');
    };

    return (
        <CustomerProvider>
            <div className={styles.postManagement}>
                <AdminSidebar />
                <div className={styles.body}>
                    <Header />
                    {/* <TopBar /> */}
                    <header className={styles.adminTitle}>
                        <div className={styles.title}>
                            <h1 className={styles.text}>Quản lý người dùng</h1>
                            <nav className={styles.adminBreadcrumbs}>
                                <a href="/admin">Trang chủ</a>
                                <span>/</span>
                                <span>Quản lý người dùng</span>
                            </nav>
                        </div>
                        <div className={styles.right2}>
                            <button className={styles.adminButtonWithIcon}>
                                <i className="fas fa-file-export"></i>
                                <span>Xuất file</span>
                            </button>
                            <button className={styles.adminButtonWithIcon2} onClick={handleAddPostClick}>
                                <i className="fas fa-plus"></i>
                                <span>Thêm người dùng</span>
                            </button>
                        </div>
                    </header>
                    <div className={styles.content}>
                        <TabsFilter />
                        <FilterSection />
                        <CustomerTable />
                        <Pagination />
                    </div>
                </div>
            </div>
        </CustomerProvider>
    );
};

export default CustomerManagement;
