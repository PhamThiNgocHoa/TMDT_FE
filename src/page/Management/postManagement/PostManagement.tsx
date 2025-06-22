"use client";
import React from 'react';
import styles from './PostManagement.module.css';
import { Header } from './components/Header'; // Use named import
import { TabsFilter } from './components/TabsFilter'; // Use named import
import { FilterSection } from './services/FilterSection'; // Use named import
import { PostTable } from './services/PostTable'; // Use named import
import { Pagination } from './Pagination'; // Use named import
import { PostProvider } from './context/PostContext';
import { useNavigate } from 'react-router-dom';
import useCustomer from "../../../hooks/useCustomer";
import {AdminSidebar} from "../AdminSidebar";

const PostManagement: React.FC = () => {
    const navigate = useNavigate(); // Get navigate function
    const {user} = useCustomer();


    const handleAddPostClick = () => {
        navigate('/postManagement/add');
    };

    return (
        <PostProvider>
            <div className={styles.postManagement}>
                <AdminSidebar user={user} />
                <div className={styles.body}>
                    <Header />
                    {/* <TopBar /> */}
                    <header className={styles.adminTitle}>
                        <div className={styles.title}>
                            <h1 className={styles.text}>Quản lý bài viết</h1>
                            <nav className={styles.adminBreadcrumbs}>
                                <a href="/admin">Trang chủ</a>
                                <span>/</span>
                                <span>Quản lý bài viết</span>
                            </nav>
                        </div>
                        <div className={styles.right2}>
                            <button className={styles.adminButtonWithIcon}>
                                <i className="fas fa-file-export"></i>
                                <span>Xuất file</span>
                            </button>
                            <button className={styles.adminButtonWithIcon2} onClick={handleAddPostClick}>
                                <i className="fas fa-plus"></i>
                                <span>Thêm bài viết</span>
                            </button>
                        </div>
                    </header>
                    <div className={styles.content}>
                        <TabsFilter />
                        <FilterSection />
                        <PostTable />
                        <Pagination />
                    </div>
                </div>
            </div>
        </PostProvider>
    );
};

export default PostManagement;