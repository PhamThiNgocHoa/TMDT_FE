import axios from "axios";

class ApiService {
    private static getAuthHeaders() {
        const token = localStorage.getItem("authToken");
        console.log("🔐 Token lấy từ localStorage:", token); // 👈 Log token để kiểm tra

        const headers: any = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        console.log("📦 Headers sẽ gửi:", headers); // 👈 Log headers

        return headers;
    }

    public static async request(
        url: string,
        method: string = "GET",
        body: any = null,
        headers: any = {},
        requireAuth: boolean = true
    ): Promise<any> {
        try {
            const combinedHeaders = requireAuth
                ? { ...ApiService.getAuthHeaders(), ...headers }
                : { "Content-Type": "application/json", ...headers };

            const axiosConfig: any = {
                url,
                method,
                headers: combinedHeaders,
                data: body,
            };

            console.log(`📡 Đang gửi request: ${method} ${url}`);
            if (body) console.log("📨 Body:", body);

            const response = await axios(axiosConfig);

            console.log("✅ Response nhận được:", response.data); // 👈 Log response
            return response.data;

        } catch (error: any) {
            const status = error.response?.status;
            const errorData = error.response?.data;
            console.error("❌ Lỗi khi gọi API:", {
                status,
                data: errorData,
                message: error.message,
            });

            throw new Error(
                `Error fetching data: ${status} - ${JSON.stringify(errorData) || error.message}`
            );
        }
    }

    public static get(url: string, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "GET", null, headers, requireAuth);
    }

    public static post(url: string, body: any, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "POST", body, headers, requireAuth);
    }

    public static put(url: string, body: any, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "PUT", body, headers, requireAuth);
    }

    public static delete(url: string, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "DELETE", null, headers, requireAuth);
    }

    public static patch(url: string, body: any, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "PATCH", body, headers, requireAuth);
    }
}

export default ApiService;
