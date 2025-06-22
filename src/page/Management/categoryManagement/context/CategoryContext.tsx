import { CategoryRequestDTO } from '../../../../models/request/CategoryRequestDTO';
import { CategoryResponseDTO } from '../../../../models/response/CategoryResponseDTO';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { adminCategoryApi } from '../../../../server/api/admin/category.admin.service';
import { getListCategory } from '../../../../server/api/category/category.get';

interface CategoryContextType {
    categories: CategoryResponseDTO[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    addCategory: (data: CategoryRequestDTO) => Promise<void>;
    updateCategory: (data: CategoryRequestDTO) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
}

// Context mặc định
export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 📌 fetchCategories được memo hóa
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const categoriesData = await getListCategory();
            setCategories(categoriesData as CategoryResponseDTO[]);
        } catch (err) {
            setError('Không thể tải danh mục');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // 📌 Các hàm còn lại cũng bọc useCallback
    const addCategory = useCallback(
        async (data: CategoryRequestDTO) => {
            setLoading(true);
            setError(null);
            try {
                await adminCategoryApi.add(data);
                await fetchCategories();
            } catch (err) {
                setError('Không thể thêm danh mục');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fetchCategories]
    );

    const updateCategory = useCallback(
        async (data: CategoryRequestDTO) => {
            setLoading(true);
            setError(null);
            try {
                await adminCategoryApi.update(data);
                await fetchCategories();
            } catch (err) {
                setError('Không thể cập nhật danh mục');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fetchCategories]
    );

    const deleteCategory = useCallback(
        async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                await adminCategoryApi.delete(id);
                await fetchCategories();
            } catch (err) {
                setError('Không thể xóa danh mục');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fetchCategories]
    );

    // 📌 Chạy 1 lần khi init
    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const contextValue: CategoryContextType = {
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    };

    return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

// Optional hook để tiện sử dụng context
export const useCategory = (): CategoryContextType => {
    const ctx = useContext(CategoryContext);
    if (!ctx) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return ctx;
};
