export interface Post {
    id: string;
    image: string;
    title: string;
    shortTitle: string;
    author: string;
    tags: string;
    status: 'approved' | 'pending' | 'draft' | 'rejected';
    date: string;
}

export const fakePosts: Post[] = [
    {
        id: "402011",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3e44c6124fb91f59c78fe7ad6f6f206b3fe59afa?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29",
        title: "Cách hẹn giờ tắt máy tính...",
        shortTitle: "Cách hẹn...",
        author: "Thanh Đào",
        tags: "Hẹn giờ tắt máy...",
        status: "approved",
        date: "31 March 2025"
    },
    {
        id: "402012",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f1acb0a9ccd5e6fd96234cd78cdc5d13f487586?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29",
        title: "Hướng dẫn chi tiết 5 cách...",
        shortTitle: "Hướng dẫn...",
        author: "Thanh Đào",
        tags: "Hướng dẫn",
        status: "draft",
        date: "31 March 2025"
    },
    {
        id: "402013",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8c4876cdab17f3c5948b63dc9046ec5a81bcddd2?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29",
        title: "Hướng dẫn cách chuyển...",
        shortTitle: "Hướng dẫn...",
        author: "Thanh Đào",
        tags: "Hướng dẫn",
        status: "rejected",
        date: "31 March 2025"
    },
    // Add more fake posts...
];
