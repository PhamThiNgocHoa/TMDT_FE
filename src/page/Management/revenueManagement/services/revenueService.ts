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

// Headers auth với error handling
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
    }
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// ========== API doanh thu ==========
// ✅ Tổng doanh thu 12 tháng (mỗi tháng)
export const getRevenueByMonth = async (): Promise<RevenueByMonth[]> => {
    try {
        const response = await axios.get("/api/admin/order/revenue", {
            headers: getAuthHeaders(),
        });
        return response.data.data || [];
    } catch (error: any) {
        if (error.response?.status === 403) {
            throw new Error("Bạn không có quyền truy cập dữ liệu doanh thu");
        } else if (error.response?.status === 401) {
            throw new Error("Token hết hạn. Vui lòng đăng nhập lại");
        }
        throw new Error("Không thể tải dữ liệu doanh thu");
    }
};

// ✅ Doanh thu tháng/năm
export const getRevenueByMonthYear = async (
    month: number,
    year: number
): Promise<RevenueByMonthYearResponse> => {
    try {
        const response = await axios.get(`/api/admin/order/revenue/${month}/${year}`, {
            headers: getAuthHeaders(),
        });
        return response.data.data;
    } catch (error: any) {
        if (error.response?.status === 403) {
            throw new Error("Bạn không có quyền truy cập dữ liệu doanh thu");
        } else if (error.response?.status === 401) {
            throw new Error("Token hết hạn. Vui lòng đăng nhập lại");
        }
        throw new Error("Không thể tải dữ liệu doanh thu");
    }
};

export const getRevenueByDate = async (date: string): Promise<RevenueData> => {
    try {
        const response = await axios.get(`/api/admin/order/revenue/date/${date}`, {
            headers: getAuthHeaders(),
        });

        const data = response.data.data;
        // Map sang RevenueData
        return {
            date: `${data.year}-${String(data.month).padStart(2, "0")}-${String(data.day).padStart(2, "0")}`,
            amount: data.revenue, // lấy đúng trường revenue
        };
    } catch (error: any) {
        if (error.response?.status === 403) {
            throw new Error("Bạn không có quyền truy cập dữ liệu doanh thu");
        } else if (error.response?.status === 401) {
            throw new Error("Token hết hạn. Vui lòng đăng nhập lại");
        }
        throw new Error("Không thể tải dữ liệu doanh thu");
    }
};
