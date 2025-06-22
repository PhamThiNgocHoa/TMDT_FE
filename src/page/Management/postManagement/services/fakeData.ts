export interface Post {
    id: number;
    image: string;
    title: string;
    shortTitle: string;
    author: string;
    tags: string;
    status: 'approved' | 'pending' | 'draft' | 'rejected';
    date: string;
    thumbnail: string; // Thêm thuộc tính này
    category: string;  // Thêm thuộc tính này
    createdAt: string; // Thêm thuộc tính này
    views: number;     // Thêm thuộc tính này
}

