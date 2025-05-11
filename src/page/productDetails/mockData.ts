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
    {
        id: '1',
        name: 'Havic HV G-92 Gamepad',
        category: 'Gaming',
        images: [
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/11c73c757bebbfeb527092163e780840067258db', alt: 'Gamepad view 1' },
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b15d55a62f5a2345f878ebfe6090e89edb999d94', alt: 'Gamepad view 2' },
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f7a842b4533a04f1ed8dd550791ba0e1651f6659', alt: 'Gamepad view 3' },
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dc9ce81b13d3a0577cab4f41b308f0b01631cc41', alt: 'Gamepad view 4' },
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5d7c6cc437a13e2cae1b17a13ca2352d901332ce', alt: 'Gamepad main view' },
        ],
        price: 2400000,
        originalPrice: 3000000,
        formattedPrice: '2,400,000 VND',
        formattedOriginalPrice: '3,000,000 VND',
        description: 'Vỏ bảo vệ tay cầm PlayStation 5 bằng vinyl chất lượng cao...',
        rating: 4.5,
        reviews: 150,
        inStock: true,
        discountPercentage: 20,
        discount: '-20%',
        colors: ['#e07575'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: '2',
        name: 'Tay cầm chơi game HAVIT HV-G92',
        category: 'Gaming',
        images: [
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/21f9b9c39a3c80b6e5a8c630460e4f5710f4c373', alt: 'HAVIT HV-G92' }
        ],
        price: 3000000,
        originalPrice: 4000000,
        formattedPrice: '3,000,000 VND',
        formattedOriginalPrice: '4,000,000 VND',
        rating: 4.5,
        reviews: 88,
        discount: '-40%',
        discountPercentage: 25,
        inStock: true,
        colors: ['#e07575'],
        sizes: ['M']
    },
    {
        id: '3',
        name: 'Bàn phím có dây AK-900',
        category: 'Gaming',
        images: [
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a401c8b62e51947681bf608839ff1e00ad3dfaa3', alt: 'AK-900 Keyboard' }
        ],
        price: 24000000,
        originalPrice: 29000000,
        formattedPrice: '24,000,000 VND',
        formattedOriginalPrice: '29,000,000 VND',
        rating: 4.2,
        reviews: 75,
        discount: '-35%',
        discountPercentage: 17,
        inStock: true,
        colors: ['#000000'],
        sizes: ['Standard']
    },
    {
        id: '4',
        name: 'IPS LCD Gaming Monitor',
        category: 'Monitors',
        images: [
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2c9936a5a732845a7e336241db62a4dd78c6437b', alt: 'Gaming Monitor' }
        ],
        price: 9250000,
        originalPrice: 10000000,
        formattedPrice: '9,250,000 VND',
        formattedOriginalPrice: '10,000,000 VND',
        rating: 4.8,
        reviews: 99,
        discount: '-30%',
        discountPercentage: 8,
        inStock: true,
        colors: ['#000000'],
        sizes: ['27"']
    },
    {
        id: '5',
        name: 'RGB liquid CPU Cooler',
        category: 'Components',
        images: [
            { url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a81259debbe79371946ca6e164991080e4cd6f4', alt: 'CPU Cooler' }
        ],
        price: 4000000,
        originalPrice: 4250000,
        formattedPrice: '4,000,000 VND',
        formattedOriginalPrice: '4,250,000 VND',
        rating: 4.3,
        reviews: 65,
        inStock: true,
        colors: ['#RGB'],
        sizes: ['Standard']
    }
];
