import axios from 'axios';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const getAllCustomers = async () => {
    const response = await axios.get('/api/admin/customer', {
        headers: getAuthHeaders(),
    });
    return response.data;
};

export const deleteCustomer = async (id: number) => {
    return axios.delete(`/api/admin/customer/${id}`, {
        headers: getAuthHeaders(),
    });
};

export const addCustomer = async (data: any) => {
    const token = localStorage.getItem('authToken');
    const res = await axios.post('/api/admin/customer', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return res.data;
};


export const updateCustomer = async (id: number, data: any) => {
    return axios.put(`/api/admin/customer/${id}`, data, {
        headers: getAuthHeaders(),
    });
};
