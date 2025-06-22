import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryRequestDTO } from '../../../models/request/CategoryRequestDTO';
import styles from './AddCategory.module.css';
import { CategoryContext } from './context/CategoryContext';

const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    const { addCategory, loading, error } = useContext(CategoryContext)!;
    const [formData, setFormData] = useState<CategoryRequestDTO>({
        name: '',
        description: '',
        img: '',
        active: true
    });
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    const validateForm = (): boolean => {
        const errors: {[key: string]: string} = {};
        if (!formData.name.trim()) {
            errors.name = 'Tên danh mục là bắt buộc';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Tên danh mục phải có ít nhất 2 ký tự';
        }
        if (formData.description && formData.description.length > 500) {
            errors.description = 'Mô tả không được vượt quá 500 ký tự';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const { id, ...categoryData } = formData;
            await addCategory(categoryData);
            navigate('/management/category');
        } catch (err: any) {
            console.error('Error in handleSubmit:', err);
        }
    };

    const handleCancel = () => {
        navigate('/management/category');
    };

    return (
        <div className={styles.addCategoryContainer}>
            <div className={styles.header}>
                <h1>Thêm Danh mục Mới</h1>
                <nav className={styles.breadcrumbs}>
                    <a href="/management/category">Quản lý Danh mục</a>
                    <span>/</span>
                    <span>Thêm mới</span>
                </nav>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.errorMessage}>
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Tên danh mục <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`${styles.input} ${validationErrors.name ? styles.inputError : ''}`}
                            placeholder="Nhập tên danh mục..."
                            disabled={loading}
                        />
                        {validationErrors.name && (
                            <span className={styles.errorText}>{validationErrors.name}</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>
                            Mô tả
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleInputChange}
                            className={`${styles.textarea} ${validationErrors.description ? styles.inputError : ''}`}
                            placeholder="Nhập mô tả danh mục (tùy chọn)..."
                            rows={4}
                            disabled={loading}
                        />
                        {validationErrors.description && (
                            <span className={styles.errorText}>{validationErrors.description}</span>
                        )}
                        <span className={styles.characterCount}>
                            {(formData.description || '').length}/500
                        </span>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="img" className={styles.label}>
                            Hình ảnh
                        </label>
                        <input
                            type="text"
                            id="img"
                            name="img"
                            value={formData.img || ''}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="Nhập URL hình ảnh (tùy chọn)..."
                            disabled={loading}
                        />
                        <span className={styles.helpText}>
                            Nhập URL hình ảnh hoặc đường dẫn đến file hình ảnh
                        </span>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleInputChange}
                                className={styles.checkbox}
                                disabled={loading}
                            />
                            <span className={styles.checkboxText}>Kích hoạt danh mục</span>
                        </label>
                    </div>
                    <div className={styles.formActions}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={styles.cancelButton}
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Đang thêm...
                                </>
                            ) : (
                                'Thêm danh mục'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory; 