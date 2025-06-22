export interface ProductImage {
    id: number;
    url: string;
}

export interface ProductColor {
    id: number;
    name: string;
    code: string;
}

export interface ProductSize {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    discountPrice?: number;
    description?: string;
    category?: string;
    images: ProductImage[];
    productColors: ProductColor[];
    productSizes: ProductSize[];
    productImages: ProductImage[];
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