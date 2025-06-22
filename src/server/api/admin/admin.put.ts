import {Customer} from "../../../models/Customer";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import {CategoryRequestDTO} from "../../../models/request/CategoryRequestDTO";
import {CategoryResponseDTO} from "../../../models/response/CategoryResponseDTO";
import ApiService from "../ApiService";
import {OrderEditReques} from "../../../models/request/OrderEditReques";
import {OrderStatus} from "../../../enums/OrderStatus";

export const updateCustomer = async (id: number, customer: Customer): Promise<CustomerResponse> => {
    return ApiService.put("/api/admin/customer", customer);
}

export const updateCategory = async (category: CategoryRequestDTO): Promise<CategoryResponseDTO> => {
    return ApiService.put("/api/admin/category", category);
}

export const editOrder = async (orderRequest: OrderEditReques, orderId: number): Promise<void> => {
    return ApiService.put(`/api/admin/order/${orderId}`, orderRequest);
}

export const changeOrderStatus = async (status: OrderStatus, orderId: number): Promise<void> => {
    return ApiService.put(`/api/admin/status/${status}/${orderId}`, status);
}