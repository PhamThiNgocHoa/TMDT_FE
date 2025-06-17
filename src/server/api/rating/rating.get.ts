import ApiService from "../ApiService";
import {RatingResponseDTO} from "../../../models/response/RatingResponseDTO";

export const getRatingById = async (id: number): Promise<RatingResponseDTO> => {
    const response = await ApiService.get(`/api/rating/${id}`, false);
    return response.data;
};

export const getRatingsByProductId = async (productId: number): Promise<RatingResponseDTO[]> => {
    const response = await ApiService.get(`/api/rating/product/${productId}`, false);
    return response.data;
};

export const getAvgRatingByProductId = async (productId: number): Promise<number> => {
    const response = await ApiService.get(`/api/rating/avg/${productId}`, false);
    return response.data;
};


