import React from "react";
import styles from "../CustomerManagement.module.css";
import { useCustomers } from "../context/CustomerContext";

export const Header: React.FC = () => {
  const { filters, setFilters } = useCustomers();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
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
