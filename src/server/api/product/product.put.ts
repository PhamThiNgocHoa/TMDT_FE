import ApiService from "../ApiService";
import { ProductResponse } from "../../../models/response/ProductResponse";

export const updateProduct = async (productId: number, product: any): Promise<ProductResponse> => {
  const result = await ApiService.put(`/api/product/${productId}`, product);
  // Unwrap .data if response is { data: ... }
  return result.data?.data ?? result.data;
};