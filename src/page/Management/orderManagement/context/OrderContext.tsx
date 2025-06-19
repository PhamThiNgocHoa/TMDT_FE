"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from "react";
import axios from "axios";
import { PaginationParams } from "../services/api";

interface Order {
    id: number;
    fullname: string;
    address: string;
    phone: string;
    status: "PENDING" | "PENDING_PAYMENT" | "DELIVERED" | "CANCELLED" | "SHIPPED";
}

interface OrderFilters {
    search?: string;
    status?: Order["status"];
    sort?: string;
    category?: string;
}

interface OrderContextType {
    orders: Order[];
    loading: boolean;
    error: string | null;
    filters: OrderFilters;
    pagination: PaginationParams;
    total: number;
    selectedOrders: string[];
    setFilters: (filters: OrderFilters) => void;
    setPagination: (pagination: PaginationParams) => void;
    setSelectedOrders: Dispatch<SetStateAction<string[]>>;
    fetchOrders: () => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;
    updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<OrderFilters>({
        search: "",
        status: undefined,
        sort: "newest",
    });
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 10,
    });
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                throw new Error("Bạn chưa đăng nhập");
            }

            const response = await axios.get("/api/admin/order/list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const rawData = response.data?.data || [];

            console.log("📦 Dữ liệu đơn hàng:", rawData);

            const mappedOrders: Order[] = rawData.map((item: any) => ({
                id: item.id,
                fullname: item.customerDTO?.fullname || "Không rõ",
                address: item.address || "",
                phone: item.numberPhone || "",
                status: item.status,
            }));

            let data = [...mappedOrders];

            if (filters.search) {
                data = data.filter(order =>
                    order.fullname.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }

            if (filters.status) {
                data = data.filter(order => order.status === filters.status);
            }

            if (filters.sort === "newest") {
                data.sort((a, b) => b.id - a.id);
            } else if (filters.sort === "oldest") {
                data.sort((a, b) => a.id - b.id);
            }

            const totalFiltered = data.length;
            const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
            const end = start + (pagination.limit || 10);
            const paginated = data.slice(start, end);

            setOrders(paginated);
            setTotal(totalFiltered);
        } catch (err: any) {
            console.error("❌ Fetch Orders Error:", err);
            setError("Không thể tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deleteOrder = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`/api/admin/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await fetchOrders();
            setSelectedOrders([]);
        } catch (err) {
            setError("Không thể xóa đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (id: string, status: Order["status"]) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("authToken");
            await axios.put(`/api/admin/status/${status}/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await fetchOrders();
        } catch (err) {
            setError("Không thể cập nhật trạng thái đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                error,
                filters,
                pagination,
                total,
                selectedOrders,
                setFilters,
                setPagination,
                setSelectedOrders,
                fetchOrders,
                deleteOrder,
                updateOrderStatus,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
};
