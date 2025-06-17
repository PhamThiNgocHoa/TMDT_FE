import { useState } from "react";
import { RatingRequestDTO } from "../models/request/RatingRequestDTO";
import { RatingResponseDTO } from "../models/response/RatingResponseDTO";
import {createRating} from "../server/api/rating/rating.post";
import {updateRating} from "../server/api/rating/rating.patch";
import {deleteRating} from "../server/api/rating/rating.delete";
import {getAvgRatingByProductId, getRatingById, getRatingsByProductId} from "../server/api/rating/rating.get";

function useRating() {
    const [ratings, setRatings] = useState<RatingResponseDTO[]>([]);
    const [rating, setRating] = useState<RatingResponseDTO | null>(null);
    const [average, setAverage] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };

    const fetchCreateRating = async (dto: RatingRequestDTO) => {
        setLoading(true);
        try {
            const data = await createRating(dto);
            return data;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateRating = async (id: number, dto: RatingRequestDTO) => {
        setLoading(true);
        try {
            const data = await updateRating(id, dto);
            return data;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDeleteRating = async (id: number) => {
        setLoading(true);
        try {
            await deleteRating(id);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRatingById = async (id: number) => {
        setLoading(true);
        try {
            const data = await getRatingById(id);
            setRating(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRatingsByProduct = async (productId: number) => {
        setLoading(true);
        try {
            const data = await getRatingsByProductId(productId);
            setRatings(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAverageRating = async (productId: number) => {
        setLoading(true);
        try {
            const avg = await getAvgRatingByProductId(productId);
            setAverage(avg);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        ratings,
        rating,
        average,
        error,
        loading,
        fetchCreateRating,
        fetchUpdateRating,
        fetchDeleteRating,
        fetchRatingById,
        fetchRatingsByProduct,
        fetchAverageRating,
    };
}

export default useRating;
