import ApiService from "../../../../server/ApiService";

export interface Post {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    category: string;
    status: 'published' | 'draft' | 'pending' | 'rejected';
    createdAt: string;
    author: string;
    views: number;
    tags?: string[];
}

export interface PostFilters {
    status?: string;
    date?: string;
    search?: string;
    category?: string;
    sort?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export const api = {
    async getPosts(filters: PostFilters, pagination: PaginationParams): Promise<{ data: Post[], total: number }> {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.date) params.append('date', filters.date);
        if (filters.sort) params.append('sort', filters.sort);
        // Sử dụng zero-based pagination (page bắt đầu từ 0)
        if (pagination.page !== undefined) params.append('page', pagination.page.toString());
        if (pagination.limit) params.append('limit', pagination.limit.toString());
        
        const url = `/api/posts?${params.toString()}`;
        console.log('API URL:', url); // Debug log
        console.log('API Params:', Object.fromEntries(params)); // Debug log
        
        const res = await ApiService.get(url);
        console.log('API Response:', res);
        console.log('Response data:', res.data);
        console.log('Response total:', res.total);
        return {
            data: res.data,
            total: res.total
        };
    },

    async getPostById(id: number): Promise<Post> {
        return await ApiService.get(`/api/posts/${id}`);
    },

    async createPost(newPost: Omit<Post, 'id'>): Promise<Post> {
        return await ApiService.post('/api/posts', newPost);
    },

    async updatePost(id: number, updated: Partial<Post>): Promise<Post> {
        return await ApiService.put(`/api/posts/${id}`, updated);
    },

    async deletePost(id: string): Promise<void> {
        return await ApiService.delete(`/api/posts/${id}`);
    },

    async updatePostStatus(id: string, status: Post['status']): Promise<void> {
        return await ApiService.patch(`/api/posts/${id}/status`, { status });
    }
};
