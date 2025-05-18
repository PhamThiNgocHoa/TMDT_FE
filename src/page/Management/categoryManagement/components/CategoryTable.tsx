import React from 'react';
import { useCategory } from '../context/CategoryContext';
// Import category-specific CSS if needed, or use general table styles
// import styles from './CategoryTable.module.css';

interface CategoryTableProps {
    // Add any props needed, e.g., for handling edit/delete actions
    onEditCategory: (categoryId: string) => void;
    onDeleteCategory: (categoryId: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    onEditCategory,
    onDeleteCategory,
}) => {
    const { categories, loading, error } = useCategory();

    if (loading) {
        return <p>Đang tải danh mục...</p>;
    }

    if (error) {
        return <p>Lỗi: {error}</p>;
    }

    if (categories.length === 0) {
        return <p>Chưa có danh mục nào.</p>;
    }

    return (
        <table className="category-table"> {/* Use a CSS class for styling */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    {/* Add other table headers as needed */}
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        {/* Render other category data here */}
                        <td>
                            <button onClick={() => onEditCategory(category.id)}>Sửa</button>
                            <button onClick={() => onDeleteCategory(category.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoryTable; 