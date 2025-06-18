import {RatingResponseDTO} from "../../../models/response/RatingResponseDTO";
import ApiService from "../ApiService";
import {RatingRequestDTO} from "../../../models/request/RatingRequestDTO";

export const createRating = async (dto: RatingRequestDTO): Promise<RatingResponseDTO> => {
    const response = await ApiService.post(`/api/rating`, dto, false);
    return response.data;
};