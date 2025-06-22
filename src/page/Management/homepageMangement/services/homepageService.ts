import axios from "axios";

// Interface cho thống kê sản phẩm theo danh mục
export interface ProductCategoryStats {
    categoryId: number;
    categoryName: string;
    productCount: number;
}

// Interface cho thống kê đơn hàng theo trạng thái
export interface OrderStatusStats {
    status: string;
    count: number;
}

// Interface cho thống kê khách hàng
export interface CustomerStats {
    newCustomers: number;
    loyalCustomers: number;
    vipCustomers: number;
}

// Headers auth
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// ========== API thống kê trang chủ ==========
// ✅ Sản phẩm theo danh mục
export const getProductsByCategory = async (): Promise<number[]> => {
    try {
        const response = await axios.get("/api/admin/products", {
            headers: getAuthHeaders(),
        });
        
        // Mock data cho biểu đồ - trong thực tế sẽ có API riêng
        const products = response.data.data || [];
        const categoryCounts = [0, 0, 0, 0, 0]; // 5 danh mục
        
        products.forEach((product: any) => {
            if (product.categoryId && product.categoryId <= 5) {
                categoryCounts[product.categoryId - 1]++;
            }
        });
        
        return categoryCounts;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [10, 15, 8, 20, 12]; // Mock data
    }
};

// ✅ Đơn hàng theo trạng thái
export const getOrdersByStatus = async (): Promise<number[]> => {
    try {
        const response = await axios.get("/api/admin/orders", {
            headers: getAuthHeaders(),
        });
        
        // Mock data cho biểu đồ - trong thực tế sẽ có API riêng
        const orders = response.data.data || [];
        const statusCounts = [0, 0, 0, 0]; // 4 trạng thái
        
        orders.forEach((order: any) => {
            switch (order.status) {
                case 'PENDING':
                    statusCounts[0]++;
                    break;
                case 'PROCESSING':
                    statusCounts[1]++;
                    break;
                case 'DELIVERED':
                    statusCounts[2]++;
                    break;
                case 'CANCELLED':
                    statusCounts[3]++;
                    break;
            }
        });
        
        return statusCounts;
    } catch (error) {
        console.error("Error fetching orders by status:", error);
        return [5, 8, 15, 3]; // Mock data
    }
};

// ✅ Thống kê khách hàng
export const getCustomerStats = async (): Promise<number[]> => {
    try {
        const response = await axios.get("/api/admin/customers", {
            headers: getAuthHeaders(),
        });
        
        // Mock data cho biểu đồ - trong thực tế sẽ có API riêng
        const customers = response.data.data || [];
        const totalCustomers = customers.length;
        
        // Phân loại khách hàng (mock logic)
        const newCustomers = Math.floor(totalCustomers * 0.4);
        const loyalCustomers = Math.floor(totalCustomers * 0.4);
        const vipCustomers = totalCustomers - newCustomers - loyalCustomers;
        
        return [newCustomers, loyalCustomers, vipCustomers];
    } catch (error) {
        console.error("Error fetching customer stats:", error);
        return [20, 15, 5]; // Mock data
    }
};

// ✅ Tổng số sản phẩm
export const getTotalProducts = async (): Promise<number> => {
    try {
        const response = await axios.get("/api/admin/products", {
            headers: getAuthHeaders(),
        });
        return response.data.data ? response.data.data.length : 0;
    } catch (error) {
        console.error("Error fetching total products:", error);
        return 0;
    }
};

// ✅ Tổng số danh mục
export const getTotalCategories = async (): Promise<number> => {
    try {
        const response = await axios.get("/api/admin/categories", {
            headers: getAuthHeaders(),
        });
        return response.data.data ? response.data.data.length : 0;
    } catch (error) {
        console.error("Error fetching total categories:", error);
        return 0;
    }
};

// ✅ Tổng số đơn hàng
export const getTotalOrders = async (): Promise<number> => {
    try {
        const response = await axios.get("/api/admin/orders", {
            headers: getAuthHeaders(),
        });
        return response.data.data ? response.data.data.length : 0;
    } catch (error) {
        console.error("Error fetching total orders:", error);
        return 0;
    }
};

// ✅ Tổng số khách hàng
export const getTotalCustomers = async (): Promise<number> => {
    try {
        const response = await axios.get("/api/admin/customers", {
            headers: getAuthHeaders(),
        });
        return response.data.data ? response.data.data.length : 0;
    } catch (error) {
        console.error("Error fetching total customers:", error);
        return 0;
    }
}; 