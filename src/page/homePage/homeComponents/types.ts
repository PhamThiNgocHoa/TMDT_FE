export interface Product {
    id: number;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    description?: string;
    category?: string;
}

export interface Category {
    id: number;
    name: string;
    image?: string;
}

export interface FlashSaleSectionProps {
    products: Product[];
}

export interface CategorySectionProps {
    categories: Category[];
}

export interface TopProductsSectionProps {
    products: Product[];
}

export interface ProductsSectionProps {
    products: Product[];
}

export interface NewReleaseSectionProps {
    products: Product[];
}

export interface SideNavigationProps {
    categories: Category[];
} 