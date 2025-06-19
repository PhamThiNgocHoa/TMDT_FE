import axios from 'axios';

// Interface cho dữ liệu khách hàng
export interface CustomerPayload {
    fullname: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
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
