"use client";
import React, { useEffect } from 'react';
import styles from './CategoryManagement.module.css';
import { AdminSidebar } from '../AdminSidebar'; // Import AdminSidebar
import CategoryTable from './components/CategoryTable';
import { useCategory } from './context/CategoryContext';
import { useNavigate } from 'react-router-dom';
import {Header} from "../postManagement/components/Header";
// Import other components if needed later, e.g., FilterSection, Pagination
// import { FilterSection } from './components/FilterSection';
// import { Pagination } from './components/Pagination'; // Reuse or create a new one

const CategoryManagement: React.FC = () => {
    const { categories, loading, error, fetchCategories } = useCategory();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleAddCategory = () => {
        navigate('/management/category/add');
    };

    const handleEditCategory = (categoryId: number) => {
        console.log('Edit category with ID:', categoryId);
        navigate(`/management/category/edit/${categoryId}`);
    };

    const handleDeleteCategory = (categoryId: number) => {
        console.log('Delete category with ID:', categoryId);
        if (window.confirm(`Are you sure you want to delete category ${categoryId}?`)) {
            // Implement actual delete logic here
            console.log(`Category ${categoryId} deleted (simulated).`);
            // fetchCategories(); // Uncomment after implementing actual delete
        }
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải danh mục...</div>;
    }

    if (error) {
        return <div className={styles.error}>Lỗi: {error}</div>;
    }

    return (
        <div className={styles.postManagement}> {/* Use the same class name as OrdersManagement */}
            <AdminSidebar /> {/* Include AdminSidebar */}
            <div className={styles.body}> {/* Main content body */}
                <Header/>
                <header className={styles.adminTitle}> {/* Header/Title section */}

                    <div className={styles.title}> {/* Title and Breadcrumbs */}
                        <h1 className={styles.text}>Quản lý Danh mục</h1> {/* Page Title */}
                        <nav className={styles.adminBreadcrumbs}> {/* Breadcrumbs */}
                            <a href="/admin">Trang chủ</a>
                            <span>/</span>
                            <span>Quản lý Danh mục</span>
                        </nav>
                    </div>
                    <div className={styles.right2}> {/* Buttons */}
                        <button className={styles.adminButtonWithIcon}> {/* Export button */}
                            <i className="fas fa-file-export"></i> {/* Placeholder icon */}
                            <span>Xuất file</span>
                        </button>
                        <button className={styles.adminButtonWithIcon2} onClick={handleAddCategory}> {/* Add button */}
                            <i className="fas fa-plus"></i> {/* Placeholder icon */}
                            <span>Thêm Danh mục</span>
                        </button>
                    </div>
                </header>
                <div className={styles.content}> {/* Content area for table, filters, etc. */}
                    {/* Render filter/search components here later */}
                    {/* <FilterSection /> */}

                    <div className={styles.tableContainer}> {/* Container for table */}
                        <CategoryTable
                            onEditCategory={handleEditCategory}
                            onDeleteCategory={handleDeleteCategory}
                        />
                    </div>

                    {/* Render pagination here later */}
                    {/* <Pagination /> */}
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement; 