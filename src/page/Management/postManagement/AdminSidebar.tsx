import React from 'react';
import styles from './PostManagement.module.css';

export function AdminSidebar() {
    return (
        <aside className={styles.adminSidebar}>
            <header className={styles.logoText}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/78e40715cb190a0415476e26f4801fe3a9b03a24?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img} alt="Logo" />
                <h1 className={styles.exiphones}>OrangeTech</h1>
            </header>
            <nav className={styles.menu}>
                <section className={styles.main}>
                    <h2 className={styles.menu2}>DANH MỤC</h2>
                    <a href="#" className={styles.dashboardButton}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/738b225bd11d70b2bdd1abbfb218dca102ce9ded?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img2} alt="" />
                        <span className={styles.dashboard}>Trang chủ</span>
                    </a>
                    <a href="#" className={styles.products}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fd9cf5514eb7f2302ff981ab91780234a67ce85?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img3} alt="" />
                        <span className={styles.dashboard2}>Sản phẩm</span>
                    </a>
                    <a href="#" className={styles.category}>Danh mục</a>
                    <a href="#" className={styles.orders}>Đơn hàng</a>
                    <a href="#" className={styles.coupon}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c01d2f5efafb9325deee091dc77631a4c426585c?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img4} alt="" />
                        <span className={styles.dashboard}>Voucher</span>
                    </a>
                    <a href="#" className={styles.banner}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/586084768546c432ea0a7c38f636849c869b09aa?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img5} alt="" />
                        <span className={styles.dashboard3}>Bài viết</span>
                    </a>
                    <a href="#" className={styles.transaction}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f4b752ae0f64bceb27cc7e137a15841d36cceb4?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img6} alt="" />
                        <span className={styles.dashboard}>Doanh thu</span>
                    </a>
                </section>

                <section className={styles.user}>
                    <h2 className={styles.usermanagement}>NGƯỜI DÙNG</h2>
                    <a href="#" className={styles.admins}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d95b36e2ab98bb1d12b75ce1eec449fe5d325aa?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img7} alt="" />
                        <span className={styles.dashboard}>Phân quyền</span>
                    </a>
                    <a href="#" className={styles.customer}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb5a227870c15ece820e8464415af40a3478f70?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img8} alt="" />
                        <span className={styles.dashboard}>Khách hàng</span>
                    </a>
                </section>

                <section className={styles.others}>
                    <h2 className={styles.others2}>KHÁC</h2>
                    <a href="#" className={styles.admins2}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0da05e58d29f2fc291883892d651689b037d17fb?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img9} alt="" />
                        <span className={styles.dashboard}>Cài đặt</span>
                    </a>
                    <a href="#" className={styles.help}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2dbc87bd48c5e9eddd64ef49e0a28f787f075ff?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img10} alt="" />
                        <span className={styles.dashboard}>Hỗ trợ</span>
                    </a>
                    <button className={styles.logout}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4750e2960f9d35103464ad22d420d2f2f87f50b8?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" className={styles.img11} alt="" />
                        <span className={styles.dashboard}>Đăng xuất</span>
                    </button>
                </section>
            </nav>
        </aside>
    );
}
