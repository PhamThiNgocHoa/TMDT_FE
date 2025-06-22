import {Category} from "../../../models/Category";
import ApiService from "../ApiService";

// category.get.ts
export const getListCategory = async (): Promise<Category[]> => {
    return await ApiService.get("/api/category/list");
};



export const getCategoryById = async (categoryId: number): Promise<Category> => {
    return ApiService.get(`/api/category/${categoryId}`, false);

}