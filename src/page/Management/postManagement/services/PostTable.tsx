"use client";
import React, { useEffect } from 'react';
import styles from '../PostManagement.module.css';
import { StatusBadge } from './StatusBadge';
import { Pagination } from '../Pagination';
import { usePosts } from '../context/PostContext';

export function PostTable() {
    const { posts, loading, error, fetchPosts, deletePost } = usePosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await deletePost(id);
        }
    };

    const handleView = (id: string) => {
        console.log('View post:', id);
        // Implement view functionality
    };

    const handleEdit = (id: string) => {
        console.log('Edit post:', id);
        // Implement edit functionality
    };

    return (
        <div className={styles.table}>
            <table className={styles.table2}>
                <thead className={styles.tableTitle}>
                <tr>
                    <th className={styles.headerCell}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/90fcf847466d4f9e795bf75e261862fb6a23e56d?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img19} alt="" />
                        <span className={styles.product}>Bài viết</span>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/22c73e4df7d7076f8467808d1671316166fa5b32?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img20} alt="" />
                    </th>
                    <th className={styles.headerCell2}>ID</th>
                    <th className={styles.headerCell3}>Tiêu đề</th>
                    <th className={styles.headerCell4}>Tác giả</th>
                    <th className={styles.headerCell5}>
                        <span className={styles.price}>Tags</span>
                        <span className={styles.fiSrCaretDown} />
                    </th>
                    <th className={styles.headerCell6}>
                        <span className={styles.status}>Trạng thái</span>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/22c73e4df7d7076f8467808d1671316166fa5b32?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img21} alt="" />
                    </th>
                    <th className={styles.headerCell7}>
                        <span className={styles.added}>Ngày tạo</span>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/22c73e4df7d7076f8467808d1671316166fa5b32?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img22} alt="" />
                    </th>
                    <th className={styles.headerCell8}>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id} className={styles.tableRow}>
                        <td className={styles.cell}>
                            <img src={post.image} className={styles.img24} alt="" />
                            <div className={styles.container}>
                                <span className={styles.desc}>{post.title}</span>
                            </div>
                        </td>
                        <td className={styles.cell2}>
                            <span className={styles.container2}>{post.id}</span>
                        </td>
                        <td className={styles.cell3}>
                            <span className={styles.desc2}>{post.shortTitle}</span>
                        </td>
                        <td className={styles.cell4}>
                            <span className={styles.container4}>{post.author}</span>
                        </td>
                        <td className={styles.cell5}>
                            <span className={styles.container5}>{post.tags}</span>
                        </td>
                        <td>
                            <StatusBadge status={post.status} />
                        </td>
                        <td className={styles.cell6}>
                            <span className={styles.desc3}>{post.date}</span>
                        </td>
                        <td className={styles.cell7}>
                            <div className={styles.container8}>
                                <button onClick={() => handleEdit(post.id)}>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fb8d056f770158f33c2ff0d6bd26e5d3934450d?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img25} alt="Edit" />
                                </button>
                                <button
                                    className={styles.fiSrEye}
                                    aria-label="View"
                                    onClick={() => handleView(post.id)}
                                />
                                <button
                                    className={styles.fiSrTrash}
                                    aria-label="Delete"
                                    onClick={() => handleDelete(post.id)}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}
