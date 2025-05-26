import {ProductImage} from "../page/homePage/types/product";
import {Rating} from "./Rating";

export interface Product {
    id: number;
    name: string;
    category: string;

    images: ProductImage[];
    img?: string;

    price: number;
    originalPrice?: number;

    discountPercentage?: number;
    discount: string;

    description?: string;

    inStock?: boolean;
    productNew?: boolean;

    colors?: string[];
    sizes?: string[];
}