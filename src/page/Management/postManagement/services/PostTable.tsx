"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../PostManagement.module.css';
import { usePosts } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';

export const PostTable: React.FC = () => {
    const { posts, loading, error, fetchPosts, deletePost, updatePostStatus, selectedPosts, setSelectedPosts } = usePosts();
    const navigate = useNavigate();

    // Debug logs
    console.log('PostTable - posts:', posts);
    console.log('PostTable - loading:', loading);
    console.log('PostTable - error:', error);
    console.log('PostTable - posts length:', posts?.length);

    // State for delete confirmation popup
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allPostIds = posts.map(post => post.id.toString());
            setSelectedPosts(allPostIds);
        } else {
            setSelectedPosts([]);
        }
    };

    const handleSelectPost = (postId: string) => {
        setSelectedPosts(prevSelected =>
            prevSelected.includes(postId)
                ? prevSelected.filter(id => id !== postId)
                : [...prevSelected, postId]
        );
    };

    const isPostSelected = (postId: string) => selectedPosts.includes(postId);

    const handleDeleteSelected = () => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa (${selectedPosts.length}) bài viết đã chọn?`)) {
            // In a real app, you would call a bulk delete API here
            console.log('Deleting selectedPosts:', selectedPosts);
            // Deleting one by one for fake data and to trigger re-fetch in context
            selectedPosts.forEach(postId => deletePost(postId));
            // We clear selectedPosts in the deletePost logic within the context
        }
    };

    // Determine if header checkbox should be checked or indeterminate
    const isAllSelected = useMemo(() => posts.length > 0 && selectedPosts.length === posts.length, [posts, selectedPosts]);
    const isIndeterminate = useMemo(() => selectedPosts.length > 0 && selectedPosts.length < posts.length, [posts, selectedPosts]);

    const handleEditClick = (postId: string) => {
        navigate(`/postManagement/edit/${postId}`);
    };

    // Handlers for the custom delete confirmation popup
    const handleShowDeleteConfirm = (postId: string) => {
        setPostToDeleteId(postId);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setPostToDeleteId(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (postToDeleteId) {
            console.log('Confirmed deleting post:', postToDeleteId);
            deletePost(postToDeleteId); // Call the actual delete function
            setPostToDeleteId(null); // Clear state
            setShowDeleteConfirm(false); // Close popup
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <i className="fas fa-exclamation-circle"></i>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            {selectedPosts.length > 0 && (
                <div className={styles.bulkActions}>
                    <span className={styles.selectedCount}>Đã chọn {selectedPosts.length} bài viết</span>
                    <button className={styles.deleteSelectedBtn} onClick={handleDeleteSelected}>
                        <i className="fas fa-trash"></i>
                        Xóa đã chọn
                    </button>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox" 
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                                ref={input => {
                                    if (input) {
                                        input.indeterminate = isIndeterminate;
                                    }
                                }}
                            />
                        </th>
                        <th>Bài viết</th>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Tags</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={isPostSelected(post.id.toString())}
                                    onChange={() => handleSelectPost(post.id.toString())}
                                />
                            </td>
                            <td>
                                <div className={styles.postInfo}>
                                    <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
                                </div>
                            </td>
                            <td>
                                <span className={styles.postId}>{post.id}</span>
                            </td>
                            <td>
                                <span className={styles.postTitleText}>{post.title}</span>
                            </td>
                            <td>{post.author}</td>
                            <td>
                                <span className={styles.postTags}>{post.tags?.join(', ')}</span>
                            </td>
                            <td>
                                <span className={`${styles.status} ${styles[post.status]}`}>
                                    {post.status === 'published' ? 'Đã duyệt' :
                                     post.status === 'draft' ? 'Bản nháp' :
                                     post.status === 'pending' ? 'Đang chờ' :
                                     'Từ chối'}
                                </span>
                            </td>
                            <td>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button 
                                        className={styles.editBtn}
                                        onClick={() => handleEditClick(post.id.toString())}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className={styles.viewBtn}
                                        onClick={() => {
                                            // Implement view functionality
                                            console.log('View post:', post.id);
                                        }}
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button 
                                        className={styles.deleteBtn}
                                        onClick={() => handleShowDeleteConfirm(post.id.toString())}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {posts.length === 0 && !loading && !error && (
                        <tr>
                            <td colSpan={9} className={styles.noData}>Không có bài viết nào được tìm thấy.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Custom Delete Confirmation Popup */}
            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Xóa bài viết?</h3>
                        <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
                        <div className={styles.modalActions}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancelDelete}>Hủy</button>
                            <button className={`${styles.button} ${styles.primaryButton} ${styles.deleteButton}`} onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
