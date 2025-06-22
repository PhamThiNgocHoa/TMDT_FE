import ApiService from "../ApiService";

export const deleteRating = async (id: number): Promise<void> => {
    await ApiService.delete(`/api/rating/${id}`, false);
};