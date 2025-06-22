import { useState, useEffect } from 'react';
import ApiService from '../server/ApiService';
import { Product, Category } from '../types';

interface HomePageData {
    flashSaleProducts: Product[];
    categories: Category[];
    topProducts: Product[];
    newProducts: Product[];
    regularProducts: Product[];
}

const useHomePage = () => {
    const [data, setData] = useState<HomePageData>({
        flashSaleProducts: [],
        categories: [],
        topProducts: [],
        newProducts: [],
        regularProducts: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [flashSaleRes, categoriesRes, topProductsRes, newProductsRes, regularProductsRes] = await Promise.all([
                    ApiService.get('/api/product/flash-sale'),
                    ApiService.get('/api/category'),
                    ApiService.get('/api/product/top'),
                    ApiService.get('/api/product/new'),
                    ApiService.get('/api/product')
                ]);

                setData({
                    flashSaleProducts: flashSaleRes.data || [],
                    categories: categoriesRes.data || [],
                    topProducts: topProductsRes.data || [],
                    newProducts: newProductsRes.data || [],
                    regularProducts: regularProductsRes.data || []
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useHomePage;