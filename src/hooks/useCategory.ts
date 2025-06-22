import {useEffect, useState} from "react";
import {Category} from "../models/Category";
import {getCategoryById, getListCategory} from "../server/api/category/category.get";

// Hook sử dụng cho Category
function useCategory() {
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        console.error("Category error:", message);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                console.log('useCategory: Starting to fetch categories...');
                setLoading(true);
                setError(null);
                const res = await getListCategory();
                console.log('useCategory: API response received:', res);
                setCategories(res || []);
                console.log('useCategory: Categories set to state:', res || []);
            } catch (error) {
                console.error('useCategory: Error fetching categories:', error);
                handleError(error);
                setCategories([]);
            } finally {
                setLoading(false);
                console.log('useCategory: Loading finished');
            }
        };
        
        fetchCategories();
    }, []);

    const fetchGetCategoryById = async (id: number): Promise<Category | null> => {
        try {
            setLoading(true);
            setError(null);
            return await getCategoryById(id);
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        categories,
        error,
        loading,
        fetchGetCategoryById,
        setCategories,
    };
}

export default useCategory;
