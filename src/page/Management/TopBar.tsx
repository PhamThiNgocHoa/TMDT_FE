"use client";
import React, { useState } from 'react';
import styles from './postManagement/PostManagement.module.css';
import { usePosts } from './postManagement/context/PostContext';

export function TopBar() {
    const { filters, setFilters, fetchPosts } = usePosts();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        setFilters({ ...filters, search: value });
        await fetchPosts();
    };

    return (
        <header className={styles.adminTopBar}>
            <div className={styles.inputType}>
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className={styles.content}
                        value={searchValue}
                        onChange={handleSearch}
                    />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/72bf2217ab642717dfeb75629ee9b97dda595b98?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img12} alt="Search" />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.menu3}>
                    <button
                        className={styles.iconImgMenu}
                        onClick={() => {
                            console.log('Notifications clicked');
                            // Implement notifications
                        }}
                    >
                        <div className={styles.icon}>
                            <span className={styles.notificationBadge}>3</span>
                        </div>
                    </button>
                </div>
                <hr className={styles.img13} />
                <div className={styles.user2}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9489724afda4db4c0fcd3345c257e93cd0abccb?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img14} alt="User avatar" />
                    <div className={styles.name}>
                        <span className={styles.feyzIbrahim}>Thanh Dao</span>
                        <span className={styles.admin}>Admin</span>
                    </div>
                    <button
                        className={styles.icon2}
                        onClick={() => {
                            console.log('User menu clicked');
                            // Implement user menu
                        }}
                    >
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c63b74e0f6c688e116ffd6984b3e08572c39ffb?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img15} alt="Menu" />
                    </button>
                </div>
            </div>
        </header>
    );
}
