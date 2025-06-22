import ApiService from "../ApiService";
import {Category} from "../../../models/Category";
import {ProductResponse} from "../../../models/response/ProductResponse";

export const getProductById = async (productId: number): Promise<ProductResponse> => {
    const result = await ApiService.get(`/api/product/${productId}`, false);
    return result.data;
}
export const getListProduct = async (): Promise<ProductResponse[]> => {
    const result = await ApiService.get("/api/product/list", false);
    return result.data;

};
export const searchProduct = async (name: string): Promise<ProductResponse[]> => {
    const result = await ApiService.get(`/api/product/search?name=${encodeURIComponent(name)}`, false);
    return result.data;
};
export const listFindByName = async (name: string): Promise<ProductResponse[]> => {
    const result = await ApiService.get(`/api/product/list/findByName/${name}`, false);
    return result.data;
};
export const getListCategory = async (categoryId: number): Promise<Category[]> => {
    return ApiService.get(`/api/product//list/${categoryId}`);
};
export const getProductSale = async (): Promise<ProductResponse[]> => {
    const result = await ApiService.get("/api/product/sale", false);
    return result;
}
