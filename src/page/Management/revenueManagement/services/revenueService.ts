import axios from "axios";

export interface CustomerPayload {
    fullname: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
}

// Interface cho doanh thu ngày/tháng
export interface RevenueData {
    date?: string;
    month?: number;
    year?: number;
    amount: number;
    total?: number;
}

// ✅ Interface doanh thu từng tháng của 2025 và API `/api/admin/order/revenue`
export interface RevenueByMonth {
    month: number;
    revenue: number; // <- API trả về trường này
}

// ✅ Interface doanh thu tháng/năm
export interface RevenueByMonthYearResponse {
    month: number;
    year: number;
    revenue: number;
}

// Headers auth
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// ========== API doanh thu ==========
// ✅ Tổng doanh thu 12 tháng (mỗi tháng)
export const getRevenueByMonth = async (): Promise<RevenueByMonth[]> => {
    const response = await axios.get("/api/admin/order/revenue", {
        headers: getAuthHeaders(),
    });
    return response.data.data || [];
};

// ✅ Doanh thu tháng/năm
export const getRevenueByMonthYear = async (
    month: number,
    year: number
): Promise<RevenueByMonthYearResponse> => {
    const response = await axios.get(`/api/admin/order/revenue/${month}/${year}`, {
        headers: getAuthHeaders(),
    });
    return response.data.data;
};

// ✅ Doanh thu ngày
export const getRevenueByDate = async (date: string): Promise<RevenueData> => {
    const response = await axios.get(`/api/admin/order/revenue/date/${date}`, {
        headers: getAuthHeaders(),
    });
    return response.data.data || { date, amount: 0 };
};
