"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Post } from '../services/fakeData';
import { api, PostFilters, PaginationParams } from '../services/api';

interface PostContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    filters: PostFilters;
    pagination: PaginationParams;
    total: number;
    setFilters: (filters: PostFilters) => void;
    setPagination: (pagination: PaginationParams) => void;
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
    const [filters, setFilters] = useState<PostFilters>({});
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 10
    });

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, total } = await api.getPosts(filters, pagination);
            setPosts(data);
            setTotal(total);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    const deletePost = async (id: string) => {
        try {
            await api.deletePost(id);
            await fetchPosts();
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    const updatePostStatus = async (id: string, status: Post['status']) => {
        try {
            await api.updatePostStatus(id, status);
            await fetchPosts();
        } catch (err) {
            setError('Failed to update post status');
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
                setFilters,
                setPagination,
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
