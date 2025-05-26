"use client";

import React, { useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import {Product} from "../homePage/types/product";

interface ProductCardProps {
    product: Product;
    onProductClick: (productId: string) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={styles.productCard}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onProductClick(product.id.toString())}
        >
            <div className={styles.cardContent}>
                {product.discount && (
                    <div className={styles.discountTag}>
                        {product.discount}
                    </div>
                )}
                <img
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className={styles.productImage}
                />
                <div className={styles.cardActions}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b454eea02b6717abd64a9fdef3b6cefb599a8e37?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" alt="View" className={styles.actionIcon} />
                    <div className={styles.eyeIcon}>
                        <div className={styles.iconBackground} />
                    </div>
                </div>
                {isHovered && (
                    <button className={styles.addToCartButton}>
                        Thêm vào giỏ hàng
                    </button>
                )}
            </div>
            <div className={styles.productDetails}>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <div className={styles.priceContainer}>
                    <span className={styles.currentPrice}>{product.price}</span>
                    <span className={styles.originalPrice}>{product.originalPrice}</span>
                </div>
                <div className={styles.ratingContainer}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cda283d174f19b5b1547fe96a68a3e9596ab80e?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" alt="Rating" className={styles.ratingStars} />
                    <span className={styles.reviewCount}>({product.reviews})</span>
                </div>
            </div>
        </article>
    );
};
