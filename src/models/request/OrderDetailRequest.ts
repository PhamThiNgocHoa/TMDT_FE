import { ProductCustomization } from "../ProductCustomization";

export interface OrderDetailRequest {
    productId: number;
    quantity: number;
    color?: string;
    customization?: ProductCustomization;
    product?: {
        id: number;
        name: string;
        price: number;
        img: string;
    };
}
