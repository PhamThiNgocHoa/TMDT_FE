import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryRequestDTO } from '../../../models/request/CategoryRequestDTO';
import styles from './AddCategory.module.css';
import { CategoryContext } from './context/CategoryContext';
import { getCategoryById } from '../../../server/api/category/category.get';

const EditCategory: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { updateCategory, loading, error } = useContext(CategoryContext)!;
    const [formData, setFormData] = useState<CategoryRequestDTO>({
        name: '',
        description: '',
        img: '',
        active: true,
    });
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            setIsLoading(true);
            setNotFound(false);
            try {
                if (!id) {
                    console.error('Thiếu id trên URL!');
                    setNotFound(true);
                    return;
                }
                console.log('ID param:', id);
                const category = await getCategoryById(Number(id));
                console.log('Category fetched:', category);
                if (!category || category.id === undefined || category.id === null) {
                    setNotFound(true);
                } else {
            setFormData({
                        id: category.id,
                        name: category.name,
                        description: category.description || '',
                        img: category.img || '',
                        active: category.active !== null && category.active !== undefined ? category.active : true,
            });
        }
            } catch (err) {
                setNotFound(true);
            } finally {
        setIsLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const validateForm = (): boolean => {
        const errors: {[key: string]: string} = {};
        if (!formData.name.trim()) {
            errors.name = 'Tên danh mục là bắt buộc';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Tên danh mục phải có ít nhất 2 ký tự';
        }
        if (!formData.img || !formData.img.trim()) {
            errors.img = 'Hình ảnh là bắt buộc';
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
        if (formData.id === null || formData.id === undefined) {
            alert('Không xác định được ID danh mục!');
            console.error('formData.id bị null hoặc undefined:', formData);
            return;
        }
        try {
            const updateData: CategoryRequestDTO = {
                id: formData.id,
                name: formData.name.trim(),
                img: formData.img?.trim() || 'default.png',
                active: formData.active === false ? false : true,
                description: formData.description ?? '',
            };
            console.log('Payload gửi lên:', updateData);
            await updateCategory(updateData);
            navigate('/management/category');
        } catch (err) {
            console.error('Error updating category:', err);
        }
    };

    const handleCancel = () => {
        navigate('/management/category');
    };

    if (isLoading) {
        return (
            <div className={styles.addCategoryContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải thông tin danh mục...</p>
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className={styles.addCategoryContainer}>
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h3>Không tìm thấy danh mục</h3>
                    <p>Danh mục bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                    <button 
                        onClick={() => navigate('/management/category')}
                        className={styles.submitButton}
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.addCategoryContainer}>
            <div className={styles.header}>
                <h1>Chỉnh sửa Danh mục</h1>
                <nav className={styles.breadcrumbs}>
                    <a href="/management/category">Quản lý Danh mục</a>
                    <span>/</span>
                    <span>Chỉnh sửa</span>
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
                            Hình ảnh <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="img"
                            name="img"
                            value={formData.img || ''}
                            onChange={handleInputChange}
                            className={`${styles.input} ${validationErrors.img ? styles.inputError : ''}`}
                            placeholder="Nhập URL hình ảnh..."
                            disabled={loading}
                        />
                        {validationErrors.img && (
                            <span className={styles.errorText}>{validationErrors.img}</span>
                        )}
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
                                    Đang cập nhật...
                                </>
                            ) : (
                                'Cập nhật danh mục'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory; 