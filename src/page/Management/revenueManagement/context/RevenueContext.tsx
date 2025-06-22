"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import axios from "axios";
import dayjs from "dayjs";

interface Revenue {
    date: string; // yyyy-mm-dd
    amount: number;
}

interface RevenueContextType {
    loading: boolean;
    error: string | null;
    revenueByDate: Revenue[];
    revenueToday: number;
    totalUsers: number;
    totalPendingOrders: number;
    totalRevenueThisMonth: number;
    fetchAllRevenueData: () => Promise<void>;
}

const RevenueContext = createContext<RevenueContextType | undefined>(undefined);

export const RevenueProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [revenueByDate, setRevenueByDate] = useState<Revenue[]>([]);
    const [revenueToday, setRevenueToday] = useState<number>(0);
    const [totalRevenueThisMonth, setTotalRevenueThisMonth] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalPendingOrders, setTotalPendingOrders] = useState<number>(0);

    const fetchAllRevenueData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const today = dayjs().format("YYYY-MM-DD");
            const headers = { Authorization: `Bearer ${token}` };
            const year = dayjs().year();

            // Gửi request
            const [resToday, resMonth, resUsers, resPending] = await Promise.all([
                axios.get(`/api/admin/order/revenue/date/${today}`, { headers }),
                axios.get(`/api/admin/order/revenue`, { headers }),
                axios.get(`/api/admin/customers`, { headers }),
                axios.get(`/api/admin/PENDING`, { headers })
            ]);

            // 🔵 Doanh thu hôm nay
            setRevenueToday(resToday.data.data?.revenue || 0);

            // 🔵 Tổng doanh thu tháng này
            const thisMonth = dayjs().month() + 1;
            const currentMonthData = resMonth.data.data.find((m: any) => m.month === thisMonth);
            setTotalRevenueThisMonth(currentMonthData?.revenue || 0);

            // 🔵 Tổng khách hàng
            setTotalUsers(resUsers.data.data ? resUsers.data.data.length : 0);

            // 🔵 Tổng đơn hàng chờ xử lý
            setTotalPendingOrders(resPending.data.data ? resPending.data.data.length : 0);

            // 🔵 Doanh thu từng tháng trong năm (phục vụ biểu đồ)
            const revenueData = resMonth.data.data.map((item: any) => ({
                date: `${year}-${String(item.month).padStart(2, "0")}-01`,
                amount: item.revenue
            }));
            setRevenueByDate(revenueData);

        } catch (error: any) {
            setError(error.message || "Không thể tải dữ liệu doanh thu");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchAllRevenueData();
    }, [fetchAllRevenueData]);

    return (
        <RevenueContext.Provider
            value={{
                loading,
                error,
                revenueByDate,
                revenueToday,
                totalUsers,
                totalPendingOrders,
                totalRevenueThisMonth,
                fetchAllRevenueData,
            }}
        >
            {children}
        </RevenueContext.Provider>
    );
};

export const useRevenue = () => {
    const context = useContext(RevenueContext);
    if (!context) throw new Error("useRevenue must be used within a RevenueProvider");
    return context;
};
