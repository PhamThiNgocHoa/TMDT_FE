"use client";

import React, { useRef } from 'react';
import styles from './ProductDetailsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductResponse } from "../../models/response/ProductResponse";
import ProductCard from "../homePage/homeComponents/ProductCard";

interface RelatedProductsProps {
    products: ProductResponse[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const currentId = parseInt(id ?? '', 10);

    const currentProduct = products.find(p => p.id === currentId);

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollPosition = scrollContainerRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const related = currentProduct
        ? products.filter(p => p.categoryId === currentProduct.categoryId && p.id !== currentId)
        : [];

    return (
        <section className={styles.relatedProducts}>
            <header className={styles.sectionHeader}>
                <div className={styles.categoryIndicator}>
                    <div className={styles.indicator} />
                </div>
                <h2 className={styles.sectionTitle}>Sản phẩm liên quan</h2>
                <div className={styles.scrollButtons}>
                    <button
                        onClick={() => handleScroll('left')}
                        className={styles.scrollButton}
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        className={styles.scrollButton}
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                </div>
            </header>
            <div
                ref={scrollContainerRef}
                className={styles.productsScroll}
            >
                {related.length > 0 ? (
                    related.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={handleProductClick}
                        />
                    ))
                ) : (
                    <p style={{ paddingLeft: '1rem' }}>Không có sản phẩm liên quan.</p>
                )}
            </div>
        </section>
    );
};
