import { ProductResponse } from "../../../models/response/ProductResponse";
import ApiService from "../ApiService";

export const addProduct = async (product: any): Promise<ProductResponse> => {
  const result = await ApiService.post("/api/product", product, {}, false);
  // Unwrap .data if response is { data: ... }
  return result.data?.data ?? result.data;
};