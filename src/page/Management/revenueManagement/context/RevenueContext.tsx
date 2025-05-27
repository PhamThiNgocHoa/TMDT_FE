"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from "react";
import { PaginationParams } from "../services/api";

interface Revenue {
    id: number;
    customerName: string;
    productName: string;
    price: number;
    status: "paid" | "debt";
    date: string; // ISO string
}

interface RevenueFilters {
    search?: string;
    status?: "paid" | "debt"; // chỉ có 2 trạng thái
    sort?: string;
    category?: string;
}

interface RevenueContextType {
    revenues: Revenue[];
    loading: boolean;
    error: string | null;
    filters: RevenueFilters;
    pagination: PaginationParams;
    total: number;
    selectedRevenues: string[];
    setFilters: (filters: RevenueFilters) => void;
    setPagination: (pagination: PaginationParams) => void;
    setSelectedRevenues: Dispatch<SetStateAction<string[]>>;
    fetchRevenues: () => Promise<void>;
    deleteRevenue: (id: string) => Promise<void>;
    updateRevenueStatus: (id: string, status: Revenue["status"]) => Promise<void>;
}

const RevenueContext = createContext<RevenueContextType | undefined>(undefined);

// Fake data mẫu mới theo đúng interface
const fakeRevenues: Revenue[] = [
    {
        id: 1,
        customerName: "Nguyễn Văn A",
        productName: "Sản phẩm 1",
        price: 1500000,
        status: "paid",
        date: "2024-05-01T10:00:00Z",
    },
    {
        id: 2,
        customerName: "Trần Thị B",
        productName: "Sản phẩm 2",
        price: 2500000,
        status: "debt",
        date: "2024-05-02T12:00:00Z",
    },
    {
        id: 3,
        customerName: "Lê Văn C",
        productName: "Sản phẩm 3",
        price: 3500000,
        status: "paid",
        date: "2024-05-03T14:00:00Z",
    },
];

export function RevenueProvider({ children }: { children: React.ReactNode }) {
    const [revenues, setRevenues] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(fakeRevenues.length);
    const [filters, setFilters] = useState<RevenueFilters>({
        search: "",
        status: undefined, // Không khởi tạo '' nữa mà là undefined
        sort: "newest",
    });
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 10,
    });
    const [selectedRevenues, setSelectedRevenues] = useState<string[]>([]);

    const fetchRevenues = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fake delay mô phỏng request
            await new Promise((resolve) => setTimeout(resolve, 500));

            let filtered = [...fakeRevenues];

            if (filters.search) {
                filtered = filtered.filter((revenue) =>
                    revenue.customerName.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }

            if (filters.status) {
                filtered = filtered.filter((r) => r.status === filters.status);
            }

            if (filters.sort === "newest") {
                filtered.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
            } else if (filters.sort === "oldest") {
                filtered.sort(
                    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                );
            }

            const totalFiltered = filtered.length;
            const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
            const end = start + (pagination.limit || 10);
            const paginated = filtered.slice(start, end);

            setRevenues(paginated);
            setTotal(totalFiltered);
        } catch {
            setError("Failed to fetch revenues");
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deleteRevenue = async (id: string) => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Xóa trong fakeRevenues (mutable)
            const updated = fakeRevenues.filter((r) => r.id !== Number(id));
            fakeRevenues.splice(0, fakeRevenues.length, ...updated);

            await fetchRevenues();
            setSelectedRevenues([]);
        } catch {
            setError("Failed to delete revenue");
        } finally {
            setLoading(false);
        }
    };

    const updateRevenueStatus = async (id: string, status: Revenue["status"]) => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));

            const updated = fakeRevenues.map((r) =>
                r.id === Number(id) ? { ...r, status } : r
            );
            fakeRevenues.splice(0, fakeRevenues.length, ...updated);

            await fetchRevenues();
        } catch {
            setError("Failed to update revenue status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <RevenueContext.Provider
            value={{
                revenues,
                loading,
                error,
                filters,
                pagination,
                total,
                selectedRevenues,
                setFilters,
                setPagination,
                setSelectedRevenues,
                fetchRevenues,
                deleteRevenue,
                updateRevenueStatus,
            }}
        >
            {children}
        </RevenueContext.Provider>
    );
}

export const useRevenues = () => {
    const context = useContext(RevenueContext);
    if (context === undefined) {
        throw new Error("useRevenues must be used within a RevenueProvider");
    }
    return context;
};
