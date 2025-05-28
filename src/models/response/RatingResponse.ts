// RatingResponse.ts
import {CustomerResponse} from "./CustomerResponse";
import {ProductResponse} from "./ProductResponse";

export interface RatingResponse {
    id: number;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
    customer: CustomerResponse;
    product: ProductResponse;
}

// Dữ liệu tạm thời cho RatingResponse
const sampleRatings: RatingResponse[] = [
    {
        id: 1,
        rating: 5,
        comment: "Sản phẩm tuyệt vời, chất lượng rất tốt!",
        createdAt: "2025-05-21T10:00:00Z",
        updatedAt: "2025-05-21T10:00:00Z",
        customer: {
            id: 1,
            fullname: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            username: "johndoe",
            cartId: 1
        },
        product: {
            id: 101,
            name: "Laptop HP",
            category: "Electronics",
            images: [{url: "laptop.jpg", alt: "Laptop HP"}],
            price: 1000,
            originalPrice: 1200,
            discountPercentage: 20,
            discount: "-20%",
            inStock: true,
            productNew: true,
            productColors: [
                {
                    id: 1,
                    color: "444", // sửa lại từ coclor thành color
                },
            ],
            productSizes: [   // chuyển thành mảng
                {
                    id: 1,
                    size: "15 inch",
                },
            ],
            ratings: [],
            productImages:[]
        }

    },
];

export default sampleRatings;
