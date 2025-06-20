import {OrderRequest} from "../../../models/request/OrderRequest";
import ApiService from "../ApiService";
import {OrderMethod} from "../../../enums/OrderMethod";
import {OrderDetailRequest} from "../../../models/request/OrderDetailRequest";

export const createOrder = async (
    order: {
        orderDetails: OrderDetailRequest[];
        address: string;
        receiver: string;
        numberPhone: any;
        customerId: number;
    },
    method: OrderMethod
) => {
    try {
        const response = await ApiService.post(`/api/order?method=${method}`, order);
        return response.data;
    } catch {
    }
};
