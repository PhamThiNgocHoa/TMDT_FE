import {ProductImageResponse} from "./response/ProductImageResponse";

export interface Product {
    id: number;
    name: string;
    category: string;

    images: ProductImageResponse[];
    img?: string;

    price: number;
    originalPrice?: number;

    discountPercentage?: number;
    discount: string;

    description?: string;

    inStock?: boolean;
    productNew?: boolean;

    color?: string;
    size?: string;
    featured?: boolean;
}