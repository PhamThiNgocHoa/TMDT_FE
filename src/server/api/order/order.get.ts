
import { OrderResponse } from "../../../models/response/OrderResponse";
import ApiService from "../ApiService";

export const getOrderByCustomerId = async (customerId: number): Promise<OrderResponse[]> => {
    const response = await ApiService.get(`/api/order/customer/${customerId}`);
    return response.data;
};

export const getOrderByStatusAndCustomerId = async (status: string, customerId: number): Promise<OrderResponse[]> => {
    const response = await ApiService.get(`/api/order/client/${status}&&${customerId}`);
    return response.data;
};


export const getOrderByStatus = async (status: string): Promise<OrderResponse[]> => {
    const response = await ApiService.get(`/api/admin/${status}`);
    return response.data.data || [];
};
