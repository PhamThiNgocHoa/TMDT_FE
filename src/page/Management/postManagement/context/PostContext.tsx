"use client";
import React, { createContext, useContext, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { api, PaginationParams } from '../services/api';

interface Post {
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

interface PostFilters {
    search?: string;
    category?: string;
    status?: '' | 'published' | 'draft' | 'pending' | 'rejected';
    sort?: string;
}

interface PostContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    filters: PostFilters;
    pagination: PaginationParams;
    total: number;
    selectedPosts: string[];
    setFilters: (filters: PostFilters) => void;
    setPagination: (pagination: PaginationParams) => void;
    setSelectedPosts: Dispatch<SetStateAction<string[]>>;
    fetchPosts: () => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    updatePostStatus: (id: string, status: Post['status']) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Fake data - Updated with more varied statuses and tags
const fakePosts: Post[] = [
    {
        id: 1,
        title: 'Hướng dẫn mua sắm online an toàn',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/1/200/150',
        category: 'guide',
        status: 'published',
        createdAt: '2024-03-20T10:00:00Z',
        author: 'Admin',
        views: 1200,
        tags: ['online', 'shopping']
    },
    {
        id: 2,
        title: 'Top 10 sản phẩm bán chạy nhất',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/2/200/150',
        category: 'news',
        status: 'draft',
        createdAt: '2024-03-19T11:30:00Z',
        author: 'Admin',
        views: 800,
        tags: ['top', 'products']
    },
    {
        id: 3,
        title: 'Hướng dẫn cách chuyển tiền quốc tế',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/3/200/150',
        category: 'guide',
        status: 'rejected',
        createdAt: '2024-03-18T14:00:00Z',
        author: 'Editor',
        views: 500,
        tags: ['transfer', 'international']
    },
     {
        id: 4,
        title: 'Nạp code Second Piece mới nhất',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/4/200/150',
        category: 'game',
        status: 'pending',
        createdAt: '2024-03-18T09:00:00Z',
        author: 'Contributor',
        views: 300,
        tags: ['game', 'code']
    },
     {
        id: 5,
        title: 'Review điện thoại XYZ',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/5/200/150',
        category: 'review',
        status: 'published',
        createdAt: '2024-03-17T16:00:00Z',
        author: 'Admin',
        views: 2500,
        tags: ['review', 'phone']
    },
      {
        id: 6,
        title: 'Cách tối ưu SEO cho bài viết blog',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/6/200/150',
        category: 'guide',
        status: 'published',
        createdAt: '2024-03-16T10:00:00Z',
        author: 'Editor',
        views: 1800,
        tags: ['seo', 'blog']
    },
       {
        id: 7,
        title: 'Tin tức mới nhất về thị trường E-commerce',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/7/200/150',
        category: 'news',
        status: 'published',
        createdAt: '2024-03-15T14:00:00Z',
        author: 'Admin',
        views: 1500,
        tags: ['ecommerce', 'news']
    },
        {
        id: 8,
        title: 'Hướng dẫn tạo landing page hiệu quả',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/8/200/150',
        category: 'guide',
        status: 'draft',
        createdAt: '2024-03-14T11:00:00Z',
        author: 'Contributor',
        views: 900,
        tags: ['landing page', 'guide']
    },
      {
        id: 9,
        title: 'Các chiến dịch marketing thành công 2023',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/9/200/150',
        category: 'marketing',
        status: 'published',
        createdAt: '2024-03-13T15:00:00Z',
        author: 'Admin',
        views: 2000,
        tags: ['marketing', 'case study']
    },
      {
        id: 10,
        title: 'Bí quyết chụp ảnh sản phẩm đẹp',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/10/200/150',
        category: 'guide',
        status: 'published',
        createdAt: '2024-03-12T10:00:00Z',
        author: 'Editor',
        views: 1100,
        tags: ['photography', 'products']
    },
        {
        id: 11,
        title: 'Phân tích xu hướng mua sắm 2024',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/11/200/150',
        category: 'news',
        status: 'pending',
        createdAt: '2024-03-11T13:00:00Z',
        author: 'Admin',
        views: 700,
        tags: ['trends', 'shopping']
    },
        {
        id: 12,
        title: 'Cách sử dụng hiệu quả công cụ quảng cáo trực tuyến',
        content: 'Nội dung bài viết...',
        thumbnail: 'https://picsum.photos/seed/12/200/150',
        category: 'guide',
        status: 'published',
        createdAt: '2024-03-10T09:00:00Z',
        author: 'Editor',
        views: 1900,
        tags: ['ads', 'online marketing']
    },
];

export function PostProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(fakePosts.length);
    const [filters, setFilters] = useState<PostFilters>({
        search: '',
        category: '',
        status: '',
        sort: 'newest',
    });
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 10
    });
    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Simulate API call with filters and pagination
            await new Promise(resolve => setTimeout(resolve, 500));

            let filteredPosts = [...fakePosts];

            // Apply search filter
            if (filters.search) {
                filteredPosts = filteredPosts.filter(post =>
                    post.title.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }

            // Apply category filter
            if (filters.category) {
                filteredPosts = filteredPosts.filter(post =>
                    post.category === filters.category
                );
            }

            // Apply status filter
            if (filters.status) {
                 // Handle '' status separately for 'Tất cả bài viết'
                 if (filters.status) {
                     filteredPosts = filteredPosts.filter(post =>
                         post.status === filters.status
                     );
                 }
            }

            // Apply sorting
            if (filters.sort) {
                switch (filters.sort) {
                    case 'newest':
                        filteredPosts.sort((a, b) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        );
                        break;
                    case 'oldest':
                        filteredPosts.sort((a, b) =>
                            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        );
                        break;
                    case 'views':
                        filteredPosts.sort((a, b) => b.views - a.views);
                        break;
                }
            }

            // Calculate total based on filters BEFORE pagination
            const totalFiltered = filteredPosts.length;

            // Apply pagination
            const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
            const end = start + (pagination.limit || 10);
            const paginatedPosts = filteredPosts.slice(start, end);

            setPosts(paginatedPosts);
            setTotal(totalFiltered);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deletePost = async (id: string) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const updatedPosts = fakePosts.filter(post => post.id !== Number(id));
            fakePosts.splice(0, fakePosts.length, ...updatedPosts);
            await fetchPosts();
            setSelectedPosts([]);
        } catch (err) {
            setError('Failed to delete post');
        } finally {
            setLoading(false);
        }
    };

    const updatePostStatus = async (id: string, status: Post['status']) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const updatedPosts = fakePosts.map(post =>
                post.id === Number(id) ? { ...post, status } : post            );
            fakePosts.splice(0, fakePosts.length, ...updatedPosts);
            await fetchPosts();
        } catch (err) {
            setError('Failed to update post status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                error,
                filters,
                pagination,
                total,
                selectedPosts,
                setFilters,
                setPagination,
                setSelectedPosts,
                fetchPosts,
                deletePost,
                updatePostStatus
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

export const usePosts = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};
