export interface Category {
    id: number;
    name: string;
    iconUrl: string;
    isActive: boolean;
}

export const categories: Category[] = [
    {
        id: 1,
        name: 'Bàn phím cơ',
        iconUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/b7fd1ad4-7469-4762-875b-210805ca2464.png',
        isActive: false
    },
    {
        id: 2,
        name: 'Chuột',
        iconUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/6Ah7zQ6zPN.png',
        isActive: false
    },
    {
        id: 3,
        name: 'Keycap',
        iconUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/607353c0-e3b2-4552-be28-509e6d256f28.png',
        isActive: false
    },
    {
        id: 4,
        name: 'Switch',
        iconUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/7Cg4PdONfd.png',
        isActive: true
    },
    {
        id: 5,
        name: 'Tai nghe',
        iconUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/QZSApLBh7o.png',
        isActive: false
    },
    {
        id: 6,
        name: 'Dịch vụ custom',
        iconUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/8dq5z4APHa.png',
        isActive: false
    }
];
