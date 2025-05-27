"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import { api, PaginationParams } from '../services/api';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: string
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

// Fake data
const fakeCustomers: Customer[] = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'a@example.com',
        phone: '0909000001',
        status: 'active',
        createdAt: '2024-05-01T10:00:00Z',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'b@example.com',
        phone: '0909000002',
        status: 'pending',
        createdAt: '2024-05-02T12:00:00Z',
    },
    {
        id: 3,
        name: 'Lê Văn C',
        email: 'c@example.com',
        phone: '0909000003',
        status: 'inactive',
        createdAt: '2024-05-03T14:00:00Z',
    },
];

export function CustomerProvider({ children }: { children: React.ReactNode }) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(fakeCustomers.length);
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
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 500));

            let filtered = [...fakeCustomers];

            if (filters.search) {
                filtered = filtered.filter(customer =>
                    customer.name.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }

            if (filters.status) {
                filtered = filtered.filter(c => c.status === filters.status);
            }

            if (filters.sort === 'newest') {
                filtered.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            }

            const totalFiltered = filtered.length;
            const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
            const end = start + (pagination.limit || 10);
            const paginated = filtered.slice(start, end);

            setCustomers(paginated);
            setTotal(totalFiltered);
        } catch (err) {
            setError('Failed to fetch customers');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deleteCustomer = async (id: string) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            const updated = fakeCustomers.filter(c => c.id !== Number(id));
            fakeCustomers.splice(0, fakeCustomers.length, ...updated);
            await fetchCustomers();
            setSelectedCustomers([]);
        } catch (err) {
            setError('Failed to delete customer');
        } finally {
            setLoading(false);
        }
    };

    const updateCustomerStatus = async (id: string, status: Customer['status']) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            const updated = fakeCustomers.map(c =>
                c.id === Number(id) ? { ...c, status } : c
            );
            fakeCustomers.splice(0, fakeCustomers.length, ...updated);
            await fetchCustomers();
        } catch (err) {
            setError('Failed to update customer status');
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
