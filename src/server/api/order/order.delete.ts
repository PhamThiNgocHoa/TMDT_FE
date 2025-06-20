import {OrderStatus} from "../../../enums/OrderStatus";
import ApiService from "../ApiService";

export const changeOrderStatus = async (orderId: number): Promise<void> => {
    return ApiService.delete(`/api/order/${orderId}`);
};