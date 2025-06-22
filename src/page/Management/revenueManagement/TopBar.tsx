"use client";
import React from 'react';
import styles from './RevenusManagement.module.css';

export function TopBar() {
    return (
        <header className={styles.adminTopBar}>
            <div className={styles.headerLeft}>
                <h2 className={styles.pageTitle}>Dashboard Doanh Thu</h2>
            </div>
            <div className={styles.right}>
                <div className={styles.menu3}>
                    <button
                        className={styles.iconImgMenu}
                        onClick={() => {
                            console.log('Notifications clicked');
                        }}
                    >
                        <div className={styles.icon}>
                            <span className={styles.notificationBadge}>3</span>
                        </div>
                    </button>
                </div>
                <hr className={styles.img13} />
                <div className={styles.user2}>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9489724afda4db4c0fcd3345c257e93cd0abccb?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                        className={styles.img14}
                        alt="User avatar"
                    />
                    <div className={styles.name}>
                        <span className={styles.feyzIbrahim}>Thanh Dao</span>
                        <span className={styles.admin}>Admin</span>
                    </div>
                    <button
                        className={styles.icon2}
                        onClick={() => {
                            console.log('User menu clicked');
                        }}
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c63b74e0f6c688e116ffd6984b3e08572c39ffb?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            className={styles.img15}
                            alt="Menu"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
