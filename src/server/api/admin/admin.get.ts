import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";
import {MonthlyRevenueResponse} from "../../../models/response/MonthlyRevenueResponse";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {OrderStatus} from "../../../enums/OrderStatus";
import {RevenueResponse} from "../../../models/response/RevenueResponse";

export const getCustomers = async (): Promise<CustomerResponse[]> => {
    return await ApiService.get("/api/admin/customers");
}
export const getCustomer = async (customerId: number): Promise<CustomerResponse> => {
    return await ApiService.get(`/api/admin/customer/${customerId}`);
}
export const getOrderRevenue = async (): Promise<MonthlyRevenueResponse[]> => {
    const response = await ApiService.get("/api/admin/order/revenue");
    return response.data
}
export const getAllOrders = async (): Promise<OrderResponse[]> => {
    return await ApiService.get("/api/admin/order/list");
}
export const getOrderByStatus = async (status: OrderStatus): Promise<OrderResponse[]> => {
    return await ApiService.get(`/api/admin/${status}`);
}
export const getOrderRevenueAtDay = async (date: string): Promise<RevenueResponse> => {
    const response = await ApiService.get(`/api/admin/order/revenue/date/${date}`);
    return response.data;
}
export const getOrderRevenueAtMonthYear = async (month: string, year: string): Promise<RevenueResponse> => {
    const response = await ApiService.get(`/api/admin/order/revenue/${month}/${year}`);
    return response.data;
}
export const getOrderRevenueAtYear= async (year: string): Promise<RevenueResponse> => {
    const response = await ApiService.get(`/api/admin/order/order/revenue/year/${year}`);
    return response.data;
}