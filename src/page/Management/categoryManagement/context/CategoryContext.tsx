import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a category item
interface Category {
    id: string;
    name: string;
    // Add other category properties here based on your data structure
}

// Mock data for categories
const mockCategories: Category[] = [
    { id: 'cat1', name: 'Electronics' },
    { id: 'cat2', name: 'Books' },
    { id: 'cat3', name: 'Clothing' },
    // Add more mock categories as needed
];

// Simulate fetching categories from an API
const fetchMockCategories = async (): Promise<Category[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCategories);
        }, 500); // Simulate network delay
    });
};

// Define the shape of the context value
interface CategoryContextType {
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>; // This will now call the internal fetch function
    // Add other category related functions here later (e.g., add, edit, delete)
}

// Create the context with a default undefined value
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Create the provider component
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Internal function to load category data
    const loadCategoriesData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMockCategories(); // Call the imported mock function
            setCategories(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    // Provide the internal loading function via the context
    const fetchCategories = loadCategoriesData;

    // Initial fetch
    useEffect(() => {
        fetchCategories();
    }, []); // Empty dependency array to fetch only once on mount

    // Value provided by the context
    const contextValue: CategoryContextType = {
        categories,
        loading,
        error,
        fetchCategories,
    };

    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    );
};

// Custom hook to use the Category Context
export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}; 