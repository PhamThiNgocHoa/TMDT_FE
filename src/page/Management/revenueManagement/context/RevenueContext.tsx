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
            if (!token) {
                setError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
                return;
            }

            const today = dayjs().format("YYYY-MM-DD");
            const headers = { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            };
            const year = dayjs().year();

            // Gửi request với error handling riêng cho từng API
            try {
                // 1. Doanh thu hôm nay
                const resToday = await axios.get(`/api/admin/order/revenue/date/${today}`, { headers });
                console.log("API doanh thu hôm nay response:", resToday.data); // Debug log
                const todayRevenue = resToday.data.data?.revenue || 0;
                console.log("Setting revenueToday to:", todayRevenue); // Debug log
                setRevenueToday(todayRevenue);
            } catch (error: any) {
                console.error("Lỗi lấy doanh thu hôm nay:", error);
                setRevenueToday(0);
            }

            try {
                // 2. Doanh thu theo tháng
                const resMonth = await axios.get(`/api/admin/order/revenue`, { headers });
                console.log("API doanh thu theo tháng response:", resMonth.data); // Debug log
                const thisMonth = dayjs().month() + 1;
                console.log("Tháng hiện tại:", thisMonth); // Debug log
                const currentMonthData = resMonth.data.data?.find((m: any) => m.month === thisMonth);
                console.log("Dữ liệu tháng hiện tại:", currentMonthData); // Debug log
                const monthRevenue = currentMonthData?.revenue || 0;
                console.log("Setting totalRevenueThisMonth to:", monthRevenue); // Debug log
                setTotalRevenueThisMonth(monthRevenue);

                // Doanh thu từng tháng trong năm (phục vụ biểu đồ)
                const revenueData = resMonth.data.data?.map((item: any) => ({
                    date: `${year}-${String(item.month).padStart(2, "0")}-01`,
                    amount: item.revenue
                })) || [];
                console.log("Setting revenueByDate to:", revenueData); // Debug log
                setRevenueByDate(revenueData);
            } catch (error: any) {
                console.error("Lỗi lấy doanh thu theo tháng:", error);
                setTotalRevenueThisMonth(0);
                setRevenueByDate([]);
            }

            try {
                // 3. Tổng khách hàng
                const resUsers = await axios.get(`/api/admin/customers`, { headers });
                setTotalUsers(resUsers.data.data ? resUsers.data.data.length : 0);
            } catch (error: any) {
                console.error("Lỗi lấy danh sách khách hàng:", error);
                setTotalUsers(0);
            }

            try {
                // 4. Đơn hàng chờ xử lý - sử dụng đúng endpoint
                const resPending = await axios.get(`/api/admin/PENDING`, { headers });
                console.log("API PENDING response:", resPending.data); // Debug log
                const pendingCount = resPending.data.data ? resPending.data.data.length : 0;
                console.log("Setting totalPendingOrders to:", pendingCount); // Debug log
                setTotalPendingOrders(pendingCount);
            } catch (error: any) {
                console.error("Lỗi lấy đơn hàng chờ xử lý:", error);
                setTotalPendingOrders(0);
            }

        } catch (error: any) {
            console.error("Lỗi chung:", error);
            if (error.response?.status === 403) {
                setError("Bạn không có quyền truy cập. Vui lòng đăng nhập với tài khoản admin.");
            } else if (error.response?.status === 401) {
                setError("Token hết hạn. Vui lòng đăng nhập lại.");
            } else {
                setError("Không thể tải dữ liệu doanh thu. Vui lòng thử lại sau.");
            }
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
