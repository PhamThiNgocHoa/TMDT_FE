import {Product} from "./Product";

export interface Category{
    id: number;
    name: string;
    img?: string;
    description?: string;
    products?: Product[];
    active?: boolean | null;
}