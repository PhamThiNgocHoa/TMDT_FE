import {OrderRequest} from "../../../models/request/OrderRequest";
import ApiService from "../ApiService";
import {OrderMethod} from "../../../enums/OrderMethod";

export const createOrder = async (method: OrderMethod, orderRequest: OrderRequest): Promise<number> => {
    return ApiService.post("/api/order", {method, ...orderRequest});
}
