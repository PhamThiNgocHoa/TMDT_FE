"use client";
import styles from './PostManagement.module.css';
import { AdminSidebar } from './AdminSidebar';
import { TopBar } from './TopBar';
import { PostTable } from './services/PostTable';
import { FilterSection } from './services/FilterSection';
import { PostProvider } from './context/PostContext';

export default function PostManagement() {
    return (
        <PostProvider>
            <main className={styles.postManagement}>
                <AdminSidebar />
                <section className={styles.body}>
                    <TopBar />
                    <header className={styles.adminTitle}>
                        <div className={styles.title}>
                            <h1 className={styles.text}>Bài viết</h1>
                            <nav className={styles.adminBreadcrumbs}>
                                <a href="#" className={styles.dashboard4}>Trang chủ</a>
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b05bdcd26cc992221a94680463f0261db86cbea?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img16} alt="" />
                                <span className={styles.productList}>Quản lý bài viết</span>
                            </nav>
                        </div>
                        <div className={styles.right2}>
                            <button
                                className={styles.adminButtonWithIcon}
                                onClick={() => {
                                    console.log('Export file clicked');
                                    // Implement export functionality
                                }}
                            >
                                <span className={styles.icons} />
                                <span className={styles.text2}>Xuất file</span>
                            </button>
                            <button
                                className={styles.adminButtonWithIcon2}
                                onClick={() => {
                                    console.log('Add post clicked');
                                    // Implement add post functionality
                                }}
                            >
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/54de0dd69c0d2d582a562c969a2cd40ff8e94767?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img17} alt="" />
                                <span className={styles.text3}>Thêm bài viết</span>
                            </button>
                        </div>
                    </header>
                    <FilterSection />
                    <PostTable />
                </section>
            </main>
        </PostProvider>
    );
}
