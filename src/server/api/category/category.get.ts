// <<<<<<< Updated upstream
import {Category} from "../../../models/Category";
import ApiService from "../ApiService";
//
// // category.get.ts
// export const getListCategory = async (): Promise<Category[]> => {
//     return await ApiService.get("/api/category/list");
// };
//
//
//
// export const getCategoryById = async (categoryId: number): Promise<Category> => {
//     return ApiService.get(`/api/category/${categoryId}`, false);
//
// =======
// import {Category} from "../../../models/Category";
// import ApiService from "../ApiService";

export const getListCategory = async (): Promise<Category[]> => {
    try {
        console.log('Fetching categories from API...');
        const responses = await ApiService.get("/api/category/list", {}, false); // Không require auth
        console.log('API Response:', responses);
        // Ensure we return an array
        return Array.isArray(responses?.data) ? responses.data :
               Array.isArray(responses) ? responses : [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Return empty array on error
    }
}

export const getCategoryById = async (categoryId: number): Promise<Category> => {
    try {
        console.log('Fetching category by ID:', categoryId);
        const response = await ApiService.get(`/api/category/${categoryId}`, {}, false); // Không require auth
        console.log('Category by ID response:', response);
        return response.data || response;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
// >>>>>>> Stashed changes
}