import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddCategory.module.css'; // Create this CSS module
// import { useCategory } from '../context/CategoryContext'; // Use context later for adding

const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    // Add state for other category fields if any
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Basic validation
        if (!categoryName.trim()) {
            setError('Tên danh mục không được để trống.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Simulate adding category (replace with actual API call or context function)
            console.log('Adding category:', { name: categoryName });
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
            // Assuming success, navigate back to category management
            navigate('/management/category'); // Adjust the navigation path as needed
        } catch (err: any) {
            setError(err.message || 'Failed to add category.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/management/category'); // Adjust the navigation path as needed
    };

    return (
        <div className={styles.container}>
            <h2>Thêm Danh mục Mới</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formGroup}>
                    <label htmlFor="categoryName">Tên danh mục:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className={styles.input}
                        disabled={loading}
                    />
                </div>
                {/* Add form groups for other category fields here */}
                
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Đang thêm...' : 'Thêm Danh mục'}
                    </button>
                    <button type="button" className={styles.cancelButton} onClick={handleCancel} disabled={loading}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory; 