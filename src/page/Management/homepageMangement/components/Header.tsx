import React from 'react';
import styles from '../HomepageManagment.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.adminHeader}>
            <div className={styles.headerLeft}>
                <h2 className={styles.pageTitle}>Dashboard Trang Chủ</h2>
            </div>
            <div className={styles.headerRight}>
                <div className={styles.notificationIcon}>
                    <i className="fas fa-bell"></i>
                    <span className={styles.notificationCount}>3</span>
                </div>
                <div className={styles.userProfile}>
                    <img src="https://i.pravatar.cc/150?img=68" alt="User Avatar" className={styles.userAvatar} />
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