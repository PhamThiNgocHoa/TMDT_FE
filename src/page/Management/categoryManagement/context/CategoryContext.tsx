import { CategoryRequestDTO } from '../../../../models/request/CategoryRequestDTO';
import { CategoryResponseDTO } from '../../../../models/response/CategoryResponseDTO';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { adminCategoryApi } from '../../../../server/api/admin/category.admin.service';
import { getListCategory } from '../../../../server/api/category/category.get';


// Define the shape of the context value
interface CategoryContextType {
    categories: CategoryResponseDTO[];

    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    addCategory: (data: CategoryRequestDTO) => Promise<void>;
    updateCategory: (data: CategoryRequestDTO) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    // Add other category related functions here later (e.g., add, edit, delete)
}

// Create the context with a default undefined value
export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
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
    };

    const addCategory = async (data: CategoryRequestDTO) => {
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
    };

    const updateCategory = async (data: CategoryRequestDTO) => {
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
    };

    const deleteCategory = async (id: number) => {
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
    };

    useEffect(() => {
        fetchCategories();
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

    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    );
};

// Custom hook to use the Category Context
// export const useCategory = () => {
//     const context = useContext(CategoryContext);
//     if (!context) {
//         throw new Error('useCategory must be used within a CategoryProvider');
//     }
//     return context;
// };