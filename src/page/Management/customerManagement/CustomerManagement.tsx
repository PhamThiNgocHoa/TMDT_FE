"use client";
import React from 'react';
import styles from './CustomerManagement.module.css';
import { Header } from './components/Header';
import { TabsFilter } from './components/TabsFilter';
import { FilterSection } from './services/FilterSection';
import { CustomerTable } from './services/CustomerTable';
import { Pagination } from './Pagination';
import { useNavigate } from 'react-router-dom';
import {useCustomerManagement} from "../../../hooks/useCustomerManagement";
import {useToken} from "../../../hooks/useToken";
import useCustomer from "../../../hooks/useCustomer";
import {AdminSidebar} from "../AdminSidebar";

const CustomerManagementContent: React.FC = () => {
    const navigate = useNavigate();
    const {user} = useCustomer();
    const token = useToken();
    const { customers } = useCustomerManagement(token, user?.role);
    const handleAddCustomerClick = () => {
        navigate('/management/customerManagement/add');
    };

    // Hàm xuất file CSV
    const exportToCSV = () => {
        if (!Array.isArray(customers)) {
            console.error("customers is not an array:", customers);
            return;
        }

        const headers = ['ID', 'Họ tên', 'Tên đăng nhập', 'Email', 'Số điện thoại'];
        const rows = customers.map(c => [
            c.id,
            `"${c.fullname}"`,
            `"${c.username}"`,
            `"${c.email}"`,
            `"${c.phone}"`,
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        csvContent += rows.map(row => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'danh_sach_khach_hang.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className={styles.postManagement}>
            <AdminSidebar user={user} />
            <div className={styles.body}>
                <Header />
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
                        {/* Nút Xuất File */}
                        <button className={styles.adminButtonWithIcon} onClick={exportToCSV}>
                            <i className="fas fa-file-export"></i>
                            <span>Xuất file</span>
                        </button>
                        {/* Nút Thêm người dùng */}
                        <button className={styles.adminButtonWithIcon2} onClick={handleAddCustomerClick}>
                            <i className="fas fa-plus"></i>
                            <span>Thêm người dùng</span>
                        </button>
                    </div>
                </header>
                <div className={styles.content}>
                    <TabsFilter />
                    <FilterSection />
                    <CustomerTable  />
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

const CustomerManagement: React.FC = () => {
    return (
            <CustomerManagementContent />
    );
};

export default CustomerManagement;
