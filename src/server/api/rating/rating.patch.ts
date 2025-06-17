import {RatingResponseDTO} from "../../../models/response/RatingResponseDTO";
import ApiService from "../ApiService";
import {RatingRequestDTO} from "../../../models/request/RatingRequestDTO";

export const updateRating = async (id: number, dto: RatingRequestDTO): Promise<RatingResponseDTO> => {
    const response = await ApiService.patch(`/api/rating/${id}`, dto, false);
    return response.data;
};
