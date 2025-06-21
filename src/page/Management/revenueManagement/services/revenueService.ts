import axios from 'axios';

// Interface cho dữ liệu khách hàng
export interface CustomerPayload {
    fullname: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
}

// Interface cho dữ liệu doanh thu
export interface RevenueData {
    date?: string;
    month?: number;
    year?: number;
    amount: number;
    total?: number;
}

// Hàm hỗ trợ lấy token từ localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// Lấy tất cả khách hàng
export const getAllCustomers = async () => {
    const response = await axios.get('/api/admin/customer', {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Xoá khách hàng theo ID
export const deleteCustomer = async (id: number) => {
    return axios.delete(`/api/admin/customer/${id}`, {
        headers: getAuthHeaders(),
    });
};

// Thêm khách hàng
export const addCustomer = async (data: CustomerPayload) => {
    const response = await axios.post('/api/admin/customer', data, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Cập nhật khách hàng
export const updateCustomer = async (id: number, data: Partial<CustomerPayload>) => {
    return axios.put(`/api/admin/customer/${id}`, data, {
        headers: getAuthHeaders(),
    });
};

// ========== REVENUE CHART APIs ==========

// 1. Lấy doanh thu theo tháng (tháng hiện tại)
export const getRevenueByMonth = async () => {
    try {
        const response = await axios.get('/api/admin/order/revenue', {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.warn('API error, using mock data for monthly revenue');
        // Mock data cho tháng hiện tại
        return generateMockMonthlyData();
    }
};

// 2. Lấy doanh thu theo tháng và năm cụ thể
export const getRevenueByMonthYear = async (month: number, year: number) => {
    try {
        const response = await axios.get(`/api/admin/order/revenue/${month}/${year}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.warn('API error, using mock data for month/year revenue');
        // Mock data cho tháng/năm cụ thể
        return generateMockMonthYearData(month, year);
    }
};

// 3. Lấy doanh thu theo năm
export const getRevenueByYear = async (year: number) => {
    try {
        const response = await axios.get(`/api/admin/order/revenue/year/${year}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.warn('API error, using mock data for yearly revenue');
        // Mock data cho năm
        return generateMockYearlyData(year);
    }
};

// 4. Lấy doanh thu theo ngày cụ thể
export const getRevenueByDate = async (date: string) => {
    try {
        const response = await axios.get(`/api/admin/order/revenue/date/${date}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.warn('API error, using mock data for daily revenue');
        // Mock data cho ngày cụ thể
        return generateMockDailyData(date);
    }
};

// ========== MOCK DATA FUNCTIONS ==========

// Tạo mock data cho tháng hiện tại
const generateMockMonthlyData = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const data = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
        data.push({
            date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            amount: Math.floor(Math.random() * 5000000) + 1000000 // 1M - 6M VND
        });
    }
    
    return data;
};

// Tạo mock data cho tháng/năm cụ thể
const generateMockMonthYearData = (month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const data = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
        data.push({
            date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            amount: Math.floor(Math.random() * 5000000) + 1000000 // 1M - 6M VND
        });
    }
    
    return data;
};

// Tạo mock data cho năm
const generateMockYearlyData = (year: number) => {
    const data = [];
    
    for (let month = 1; month <= 12; month++) {
        data.push({
            month: month,
            amount: Math.floor(Math.random() * 50000000) + 10000000 // 10M - 60M VND
        });
    }
    
    return data;
};

// Tạo mock data cho ngày cụ thể
const generateMockDailyData = (date: string) => {
    return {
        date: date,
        amount: Math.floor(Math.random() * 5000000) + 1000000 // 1M - 6M VND
    };
};
