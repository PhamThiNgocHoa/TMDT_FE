import React, { useCallback } from "react";
import styles from "../PostManagement.module.css";
import { usePosts } from "../context/PostContext";

export const Header: React.FC = () => {
  const { filters, setFilters, fetchPosts } = usePosts();

  // Debounce search để tránh gọi API quá nhiều
  const debouncedFetch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchValue: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          setFilters({ ...filters, search: searchValue });
          await fetchPosts();
        }, 500); // Delay 500ms
      };
    })(),
    [filters, setFilters, fetchPosts]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedFetch(value);
  };

  return (
    <header className={styles.adminHeader}>
      <div className={styles.headerRight}>
        <div className={styles.headerSearchBox}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={styles.headerSearchInput}
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.notificationIcon}>
          <i className="fas fa-bell"></i>
          <span className={styles.notificationCount}>3</span>{" "}
          {/* Example notification count */}
        </div>
        <div className={styles.userProfile}>
          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="User Avatar"
            className={styles.userAvatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Thanh Dao</span>
            <span className={styles.userRole}>Admin</span>
          </div>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </header>
  );
};
