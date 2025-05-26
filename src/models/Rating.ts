export interface Rating {
    id: number;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
    productId: number;
}
