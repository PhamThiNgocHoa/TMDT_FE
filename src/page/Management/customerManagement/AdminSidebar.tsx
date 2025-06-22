import React from 'react';
import styles from './CustomerManagement.module.css';
// import { usePathname } from 'next/navigation'; // Assuming you are using Next.js for routing

export function AdminSidebar() {
    // const pathname = usePathname(); // Get current path
     const pathname = '/admin/posts'; // Fake pathname for demonstration

    const menuItems = [
        { section: 'DANH MỤC', items: [
            { name: 'Trang chủ', icon: 'fas fa-home', path: '/management/homepage' },
            { name: 'Sản phẩm', icon: 'fas fa-box-open', path: '/admin/products' },
            { name: 'Danh mục', icon: 'fas fa-tags', path: '/management/category' },
            { name: 'Đơn hàng', icon: 'fas fa-shopping-cart', path: '/management/orders' },
            { name: 'Voucher', icon: 'fas fa-ticket-alt', path: '/admin/vouchers' },
            { name: 'Bài viết', icon: 'fas fa-pencil-alt', path: '/postManagement' },
            { name: 'Doanh thu', icon: 'fas fa-chart-line', path: '/management/revenue' },
        ]},
        { section: 'NGƯỜI DÙNG', items: [
            { name: 'Phân quyền', icon: 'fas fa-user-shield', path: '/admin/roles' },
            { name: 'Khách hàng', icon: 'fas fa-users', path: '/management/customer' },
        ]},
        { section: 'KHÁC', items: [
            { name: 'Cài đặt', icon: 'fas fa-cogs', path: '/admin/settings' },
            { name: 'Hỗ trợ', icon: 'fas fa-question-circle', path: '/admin/support' },
            { name: 'Đăng xuất', icon: 'fas fa-sign-out-alt', path: '/logout' },
        ]},
    ];

    return (
        <aside className={styles.adminSidebar}>
            <header className={styles.sidebarLogo}>
                 <i className={`fas fa-rocket ${styles.logoIcon}`}></i> {/* Example icon */} 
                <h1 className={styles.sidebarBrand}>OrangeTech</h1>
            </header>
            <nav className={styles.sidebarNav}>
                {menuItems.map((section, index) => (
                    <section key={index} className={styles.sidebarSection}>
                        <h2 className={styles.sidebarSectionTitle}>{section.section}</h2>
                        <ul className={styles.sidebarMenuList}>
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className={styles.sidebarMenuItem}>
                                    <a 
                                        href={item.path} 
                                        className={
                                            `${styles.sidebarLink} ${pathname === item.path ? styles.active : ''}`
                                        }
                                    >
                                        <i className={`${item.icon} ${styles.sidebarIcon}`}></i>
                                        <span className={styles.sidebarLinkText}>{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </nav>
        </aside>
    );
}
