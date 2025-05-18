import React from 'react';
import styles from '../PostManagement.module.css';
import { usePosts } from '../context/PostContext';

const TABS = [
  { key: '', label: 'Tất cả bài viết' },
  { key: 'published', label: 'Đã duyệt' },
  { key: 'pending', label: 'Đang chờ' },
  { key: 'draft', label: 'Bản nháp' },
  { key: 'rejected', label: 'Từ chối' },
];

export const TabsFilter: React.FC = () => {
  const { filters, setFilters, fetchPosts, posts } = usePosts();

  // Đếm số lượng từng loại trạng thái
  const countByStatus = (status: string) => {
    if (!status) return posts.length;
    return posts.filter(post => post.status === status).length;
  };

  const handleTab = async (status: "" | "published" | "pending" | "draft" | "rejected") => {    setFilters({ ...filters, status  });
    await fetchPosts();
  };

  return (
    <div className={styles.tabsFilter}>
      {TABS.map(tab => (
        <button
          key={tab.key}
          className={
            filters.status === tab.key || (!filters.status && tab.key === '')
              ? styles.tabActive
              : styles.tab
          }
          onClick={() => handleTab(tab.key as "" | "published" | "pending" | "draft" | "rejected")}
        >
          {tab.label}
          <span className={styles.tabCount}>{countByStatus(tab.key)}</span>
        </button>
      ))}
    </div>
  );
}; 