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
    date?: string;
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

export function PostProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<PostFilters>({
        search: '',
        category: '',
        status: '',
        sort: 'newest',
    });
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 0,
        limit: 10
    });
    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching posts with filters:', filters);
            console.log('Fetching posts with pagination:', pagination);
            console.log('Current filters status:', filters.status);
            console.log('Current filters search:', filters.search);
            console.log('Current pagination page:', pagination.page);
            console.log('Current pagination limit:', pagination.limit);
            const { data, total } = await api.getPosts(filters, pagination);
            console.log('Context received data:', data);
            console.log('Context received total:', total);
            setPosts(data);
            setTotal(total);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deletePost = async (id: string) => {
        try {
            setLoading(true);
            await api.deletePost(id);
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
            await api.updatePostStatus(id, status);
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
