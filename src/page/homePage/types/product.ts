export interface ProductImage {
    url: string;
    alt: string;
}

export interface Product {
    id: number; // Dùng string để tương thích với URL hoặc database key
    name: string;
    category: string;

    images: ProductImage[];         // Đa ảnh
    img?: string;              // Ảnh chính (nếu cần)

    price: number;                  // Giá số
    originalPrice?: number;         // Giá gốc số (optional)
    formattedPrice?: string;        // Chuỗi hiển thị giá (VD: "1.000.000đ")
    formattedOriginalPrice?: string;

    discountPercentage?: number;    // VD: 30 (%)
    discount?: string;              // VD: "-30%"

    description?: string;           // Mô tả sản phẩm

    rating: number;                 // VD: 4.5
    reviews: number;                // Tổng số đánh giá
    reviewCount?: number;          // Alias cho `reviews`

    inStock?: boolean;             // Tồn kho (mặc định true nếu không có)
    productNew?: boolean;               // Sản phẩm mới

    colors?: string[];             // Danh sách màu
    sizes?: string[];              // Danh sách kích thước
}
export interface BreadcrumbItem {
    label: string;
    path: string;
}
