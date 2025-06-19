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
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: string;
    avatar?: string;
}

interface CustomerFilters {
    search?: string;
    status?: '' | 'active' | 'inactive' | 'pending';
    sort?: string;
    category?: string;
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
    updateCustomerStatus: (id: string, status: Customer['status']) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<CustomerFilters>({
        search: '',
        status: '',
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
            const ids = [1, 2, 3, 4, 5]; // 5 người dùng đầu tiên
            const responses = await Promise.all(
                ids.map(id =>
                    axios
                        .get(`/api/admin/customer/${id}`)
                        .then(res => res.data)
                        .catch(() => null) // Bỏ qua nếu user không tồn tại
                )
            );

            let filtered = responses.filter(c => c !== null) as Customer[];

            // Lọc theo search
            if (filters.search) {
                filtered = filtered.filter(customer =>
                    customer.name.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }

            // Lọc theo trạng thái
            if (filters.status) {
                filtered = filtered.filter(c => c.status === filters.status);
            }

            // Sắp xếp
            if (filters.sort === 'newest') {
                filtered.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            }

            const totalFiltered = filtered.length;

            // Phân trang
            const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
            const end = start + (pagination.limit || 10);
            const paginated = filtered.slice(start, end);

            setCustomers(paginated);
            setTotal(totalFiltered);
        } catch (err) {
            setError('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deleteCustomer = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(`/api/admin/customer/${id}`);
            await fetchCustomers();
            setSelectedCustomers([]);
        } catch (err) {
            setError('Xóa người dùng thất bại');
        } finally {
            setLoading(false);
        }
    };

    const updateCustomerStatus = async (id: string, status: Customer['status']) => {
        try {
            setLoading(true);
            await axios.put(`/api/admin/customer/${id}`, { status });
            await fetchCustomers();
        } catch (err) {
            setError('Cập nhật trạng thái thất bại');
        } finally {
            setLoading(false);
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
                updateCustomerStatus,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomers must be used within a CustomerProvider');
    }
    return context;
};
