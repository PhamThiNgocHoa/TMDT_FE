import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditCategory.module.css'; // Create this CSS module
// import { useCategory } from '../context/CategoryContext'; // Use context later for fetching/editing

// Define the shape of a category item (should match the Category interface in context)
interface Category {
    id: number;
    name: string;
    // Add other category properties here
}

// Simulate fetching a category by ID
const fetchCategoryById = async (id: number): Promise<Category | undefined> => {
    // This should fetch from your actual data source or context
    // For now, using mock data similar to the context
    const mockCategories: Category[] = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Books' },
        { id: 3, name: 'Clothing' },
    ];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCategories.find(cat => cat.id === id));
        }, 500); // Simulate network delay
    });
};

const EditCategory: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : NaN;
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category | null>(null);
    const [categoryName, setCategoryName] = useState('');
    // Add state for other category fields
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategory = async () => {
            if (!categoryId) {
                setError('Category ID is missing.');
                setLoading(false);
                return;
            }
            try {
                const data = await fetchCategoryById(categoryIdNumber);                if (data) {
                    setCategory(data);
                    setCategoryName(data.name);
                    // Set state for other fields
                } else {
                    setError(`Category with ID ${categoryId} not found.`);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load category.');
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [categoryId]); // Reload if categoryId changes

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Basic validation
        if (!categoryName.trim()) {
            setError('Tên danh mục không được để trống.');
            return;
        }

        if (!category) return; // Should not happen if category is loaded

        setSaving(true);
        setError(null);

        const updatedCategory = {
            ...category,
            name: categoryName,
            // Include other updated fields
        };

        try {
            // Simulate saving category (replace with actual API call or context function)
            console.log('Saving category:', updatedCategory);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
            // Assuming success, navigate back to category management
            navigate('/management/category'); // Adjust the navigation path as needed
        } catch (err: any) {
            setError(err.message || 'Failed to save category.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/management/category'); // Adjust the navigation path as needed
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải danh mục...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!category) {
        return <div className={styles.notFound}>Không tìm thấy danh mục.</div>; // Should be covered by error state, but as a fallback
    }

    return (
        <div className={styles.container}>
            <h2>Chỉnh sửa Danh mục: {category.name}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="categoryName">Tên danh mục:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className={styles.input}
                        disabled={saving}
                    />
                </div>
                {/* Add form groups for other category fields here */}
                
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton} disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Lưu Thay đổi'}
                    </button>
                    <button type="button" className={styles.cancelButton} onClick={handleCancel} disabled={saving}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCategory; 