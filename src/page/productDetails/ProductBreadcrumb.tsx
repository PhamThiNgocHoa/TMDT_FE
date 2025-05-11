import React from 'react';
import styles from './ProductDetailsPage.module.css';
import {BreadcrumbItem} from "../homePage/types/product";

interface ProductBreadcrumbProps {
    items: BreadcrumbItem[];
}

export const ProductBreadcrumb = ({ items }: ProductBreadcrumbProps) => {
    const handleNavigation = (path: string) => {
        if (path) {
            // In a real app, use your router's navigation method
            console.log('Navigating to:', path);
        }
    };

    return (
        <nav className={styles.roadmap} aria-label="breadcrumb">
            {items.map((item, index) => (
                <React.Fragment key={item.path || index}>
                    {index > 0 && <span className={styles.separator}>/</span>}
                    {item.path ? (
                        <button
                            onClick={() => handleNavigation(item.path)}
                            className={styles.breadcrumbLink}
                        >
                            {item.label}
                        </button>
                    ) : (
                        <span className={styles.current}>{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};
