"use client";
import React, { useEffect, useState, useContext } from 'react';
import styles from './CategoryManagement.module.css';
import { AdminSidebar } from '../AdminSidebar';
import CategoryTable from './components/CategoryTable';
import { CategoryContext } from './context/CategoryContext';
import { useNavigate } from 'react-router-dom';
import { Header } from "../postManagement/components/Header";
import { CategoryResponseDTO } from '../../../models/response/CategoryResponseDTO';
import { getListProduct } from '../../../server/api/product/product.get';
import { ProductResponse } from '../../../models/response/ProductResponse';
import useCustomer from "../../../hooks/useCustomer";
import Swal from "sweetalert2"; // 👈 import Swal

const CategoryManagement: React.FC = () => {
    const context = useContext(CategoryContext);
    const { user } = useCustomer();
    if (!context) throw new Error('CategoryContext not found');
    const { categories, loading, error, fetchCategories, deleteCategory } = context;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [products, setProducts] = useState<ProductResponse[]>([]);

    useEffect(() => {
        fetchCategories();
        getListProduct().then(setProducts);
    }, [fetchCategories]);

    const handleAddCategory = () => {
        navigate('/management/category/add');
    };

    const handleEditCategory = (categoryId: number) => {
        navigate(`/management/category/edit/${categoryId}`);
    };

    const handleDeleteCategory = async (categoryId: number) => {
        // ✅ Hiển thị Swal xác nhận
        const result = await Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            setIsDeleting(categoryId);
            try {
                await deleteCategory(categoryId);
                await getListProduct().then(setProducts); // refetch
                Swal.fire({
                    icon: "success",
                    title: "Đã xóa!",
                    text: "Danh mục đã được xóa thành công.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi!",
                    text: "Xóa danh mục thất bại.",
                });
            } finally {
                setIsDeleting(null);
            }
        }
    };

    const filteredCategories = (categories || []).filter((category: CategoryResponseDTO) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const categoriesArray = categories || [];
        const csvContent = [
            ['ID', 'Tên danh mục', 'Mô tả', 'Trạng thái'],
            ...categoriesArray.map((cat: CategoryResponseDTO) => [
                cat.id.toString(),
                cat.name,
                cat.description || '',
                cat.active ? 'Kích hoạt' : 'Không kích hoạt',
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `categories_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading && (categories || []).length === 0) {
        return (
            <div className={styles.postManagement}>
                <AdminSidebar user={user} />
                <div className={styles.body}>
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Đang tải danh mục...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.postManagement}>
            <AdminSidebar user={user} />
            <div className={styles.body}>
                <Header />
                <header className={styles.adminTitle}>
                    <div className={styles.title}>
                        <h1 className={styles.text}>Quản lý Danh mục</h1>
                        <nav className={styles.adminBreadcrumbs}>
                            <a href="/admin">Trang chủ</a>
                            <span>/</span>
                            <span>Quản lý Danh mục</span>
                        </nav>
                    </div>
                    <div className={styles.right2}>
                        <button
                            className={styles.adminButtonWithIcon}
                            onClick={handleExport}
                            disabled={(categories || []).length === 0}
                        >
                            <i className="fas fa-file-export"></i>
                            <span>Xuất file</span>
                        </button>
                        <button className={styles.adminButtonWithIcon2} onClick={handleAddCategory}>
                            <i className="fas fa-plus"></i>
                            <span>Thêm Danh mục</span>
                        </button>
                    </div>
                </header>

                <div className={styles.content}>
                    <div className={styles.searchSection}>
                        <div className={styles.searchContainer}>
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Tìm kiếm danh mục..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className={styles.clearSearch}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <div className={styles.searchResults}>
                                Tìm thấy {filteredCategories.length} danh mục
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className={styles.errorContainer}>
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>Lỗi: {error}</p>
                            <button onClick={() => fetchCategories()} className={styles.retryButton}>
                                Thử lại
                            </button>
                        </div>
                    )}

                    <div className={styles.tableContainer}>
                        <CategoryTable
                            categories={filteredCategories}
                            products={products}
                            onEditCategory={handleEditCategory}
                            onDeleteCategory={handleDeleteCategory}
                            isDeleting={isDeleting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement;
