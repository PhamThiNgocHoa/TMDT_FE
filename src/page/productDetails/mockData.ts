import { Product } from "../homePage/types/product";
export const formatPrice = (price: number): string =>
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

export const calculateDiscountPercentage = (price: number, originalPrice: number): number =>
    originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export const relatedProducts: Product[] = [
];
