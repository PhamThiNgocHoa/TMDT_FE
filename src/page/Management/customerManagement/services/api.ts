import { Post } from './fakeData';

export interface PostFilters {
    status?: string;
    date?: string;
    search?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export const api = {
    async getPosts(filters: PostFilters, pagination: PaginationParams): Promise<{ data: Post[], total: number }> {
        // Simulate API call with setTimeout
        return new Promise((resolve) => {
            setTimeout(() => {
                // Import fake data
                const { fakePosts } = require('./fakeData');

                // Apply filters
                let filtered = [...fakePosts];
                if (filters.status) {
                    filtered = filtered.filter(post => post.status === filters.status);
                }
                if (filters.search) {
                    filtered = filtered.filter(post =>
                        post.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
                        post.author.toLowerCase().includes(filters.search!.toLowerCase())
                    );
                }

                // Apply pagination
                const start = (pagination.page - 1) * pagination.limit;
                const paginatedData = filtered.slice(start, start + pagination.limit);

                resolve({
                    data: paginatedData,
                    total: filtered.length
                });
            }, 500); // Simulate network delay
        });
    },

    async deletePost(id: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    },

    async updatePostStatus(id: string, status: Post['status']): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    }
};
