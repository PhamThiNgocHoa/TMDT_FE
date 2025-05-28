export interface RatingRequest {
    rating: number;
    comment?: string;
    customerId: number;
    productId: number;
}