import axios from "axios";

// Hàm hỗ trợ lấy auth header
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// ✅ Tổng số sản phẩm
export const getTotalProducts = async (): Promise<number> => {
    try {
        const response = await axios.get("/api/product/list", {
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
        const response = await axios.get("/api/category/list", {
            headers: getAuthHeaders(),
        });
        return response.data ? response.data.length : 0;
    } catch (error) {
        console.error("Error fetching total categories:", error);
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

// ✅ Tổng số đơn hàng
export const getTotalOrders = async (): Promise<number> => {
    try {
        const response = await axios.get("/api/admin/order/list", {
            headers: getAuthHeaders(),
        });
        return response.data.data ? response.data.data.length : 0;
    } catch (error) {
        console.error("Error fetching total orders:", error);
        return 0;
    }
};

// ✅ Tổng sản phẩm theo danh mục (số sản phẩm trong mỗi danh mục id 1-7)
export const getProductsByCategory = async (): Promise<number[]> => {
    try {
        const response = await axios.get("/api/product/list", {
            headers: getAuthHeaders(),
        });

        const products = response.data.data || [];
        const categoryCounts = Array(7).fill(0); // Nếu có đúng 7 danh mục

        products.forEach((product: any) => {
            if (product.categoryId >= 1 && product.categoryId <= 7) {
                categoryCounts[product.categoryId - 1]++;
            }
        });

        return categoryCounts;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return Array(7).fill(0);
    }
};


// ✅ Tổng số đơn hàng theo status
export const getOrderByStatus = async (status: string): Promise<number> => {
    try {
        const response = await axios.get(`/api/admin/${status}`, {
            headers: getAuthHeaders(),
        });
        return response.data.data ? response.data.data.length : 0;
    } catch (error) {
        console.error(`Error fetching orders with status ${status}:`, error);
        return 0;
    }
};
