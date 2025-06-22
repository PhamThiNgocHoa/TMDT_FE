"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import axios from "axios";

interface HomepageStats {
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalCustomers: number;
}

interface HomepageContextType {
    loading: boolean;
    error: string | null;
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalCustomers: number;
    homepageStats: HomepageStats;
    fetchAllHomepageData: () => Promise<void>;
}

const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

export const HomepageProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalCategories, setTotalCategories] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalCustomers, setTotalCustomers] = useState<number>(0);

    const fetchAllHomepageData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const headers = { Authorization: `Bearer ${token}` };

            // Gửi request
            const [resProducts, resCategories, resOrders, resCustomers] = await Promise.all([
                axios.get(`/api/admin/products`, { headers }),
                axios.get(`/api/admin/categories`, { headers }),
                axios.get(`/api/admin/orders`, { headers }),
                axios.get(`/api/admin/customers`, { headers })
            ]);

            // 🔵 Tổng sản phẩm
            setTotalProducts(resProducts.data.data ? resProducts.data.data.length : 0);

            // 🔵 Tổng danh mục
            setTotalCategories(resCategories.data.data ? resCategories.data.data.length : 0);

            // 🔵 Tổng đơn hàng
            setTotalOrders(resOrders.data.data ? resOrders.data.data.length : 0);

            // 🔵 Tổng khách hàng
            setTotalCustomers(resCustomers.data.data ? resCustomers.data.data.length : 0);

        } catch (error: any) {
            setError(error.message || "Không thể tải dữ liệu trang chủ");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllHomepageData();
    }, [fetchAllHomepageData]);

    const homepageStats: HomepageStats = {
        totalProducts,
        totalCategories,
        totalOrders,
        totalCustomers
    };

    return (
        <HomepageContext.Provider
            value={{
                loading,
                error,
                totalProducts,
                totalCategories,
                totalOrders,
                totalCustomers,
                homepageStats,
                fetchAllHomepageData,
            }}
        >
            {children}
        </HomepageContext.Provider>
    );
};

export const useHomepage = () => {
    const context = useContext(HomepageContext);
    if (!context) throw new Error("useHomepage must be used within a HomepageProvider");
    return context;
}; 