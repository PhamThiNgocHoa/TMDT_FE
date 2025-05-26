"use client";

import React, { useRef } from 'react';
import styles from './ProductDetailsPage.module.css';
import { ProductCard } from './ProductCard';
import { useNavigate } from 'react-router-dom';
import {Product} from "../homePage/types/product";

interface RelatedProductsProps {
    products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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


    return (
        <section className={styles.relatedProducts}>
            <header className={styles.sectionHeader}>
                <div className={styles.categoryIndicator}>
                    <div className={styles.indicator} />
                </div>
                <h2 className={styles.sectionTitle}>Sản phẩm liên quan</h2>
                {/*<div className={styles.scrollButtons}>*/}
                {/*    <button*/}
                {/*        onClick={() => handleScroll('left')}*/}
                {/*        className={styles.scrollButton}*/}
                {/*        aria-label="Scroll left"*/}
                {/*    >*/}
                {/*        ←*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        onClick={() => handleScroll('right')}*/}
                {/*        className={styles.scrollButton}*/}
                {/*        aria-label="Scroll right"*/}
                {/*    >*/}
                {/*        →*/}
                {/*    </button>*/}
                {/*</div>*/}
            </header>
            <div
                ref={scrollContainerRef}
                className={styles.productsScroll}
            >
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={handleProductClick}
                    />
                ))}
            </div>
        </section>
    );
};
