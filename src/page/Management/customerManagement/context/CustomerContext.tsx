"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import axios from 'axios';
import { PaginationParams } from '../services/api';

interface Customer {
    id: number;
    fullname: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string;
}

interface CustomerFilters {
    search?: string;
    sort?: string;
}

interface CustomerContextType {
    customers: Customer[];
    loading: boolean;
    error: string | null;
    filters: CustomerFilters;
    pagination: PaginationParams;
    total: number;
    selectedCustomers: string[];
    setFilters: (filters: CustomerFilters) => void;
    setPagination: (pagination: PaginationParams) => void;
    setSelectedCustomers: Dispatch<SetStateAction<string[]>>;
    fetchCustomers: () => Promise<void>;
    deleteCustomer: (id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<CustomerFilters>({
        search: '',
        sort: 'newest',
    });
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 10,
    });
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error('Bạn chưa đăng nhập');
            }

            const res = await axios.get('/api/admin/customers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const allCustomers: Customer[] = res.data?.data || [];

            console.log('📦 Dữ liệu người dùng:', allCustomers);

            let filtered = [...allCustomers];

            if (filters.search) {
                filtered = filtered.filter(customer =>
                    customer.fullname.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }

            const totalFiltered = filtered.length;
            const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
            const end = start + (pagination.limit || 10);
            const paginated = filtered.slice(start, end);

            setCustomers(paginated);
            setTotal(totalFiltered);
        } catch (err) {
            console.error('❌ Lỗi khi lấy danh sách khách hàng:', err);
            setError('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deleteCustomer = async (customerId: string) => {
        try {
            await axios.delete(`/api/admin/customer/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            await fetchCustomers();

            setSelectedCustomers(prev => prev.filter(id => id !== customerId));
        } catch (error: any) {
            console.error("❌ Lỗi khi xóa khách hàng:", error);
            alert("Xóa khách hàng thất bại!");
        }
    };

    return (
        <CustomerContext.Provider
            value={{
                customers,
                loading,
                error,
                filters,
                pagination,
                total,
                selectedCustomers,
                setFilters,
                setPagination,
                setSelectedCustomers,
                fetchCustomers,
                deleteCustomer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (!context) throw new Error('useCustomers must be used within a CustomerProvider');
    return context;
};
