"use client";

import React, { useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import { ProductDeliveryInfo } from './ProductDeliveryInfo';
import {Product} from "../homePage/types/product";

interface ProductInfoProps {
    product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[2] || '');

    return (
        <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{product.name}</h1>

            <div className={styles.ratingContainer}>
                <div className={styles.ratingWrapper}>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/55500910f7fda67e937673122aa77ab99e4599d2?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                        alt="Rating"
                        className={styles.ratingStars}
                    />
                    <span className={styles.reviewCount}>({product.reviews} Đánh giá)</span>
                </div>
                <div className={styles.stockInfo}>
                    <div className={styles.divider}/>
                    <span className={styles.inStock}>{product.inStock ? 'Còn hàng' : 'Hết hàng'}</span>
                </div>
            </div>

            <p className={styles.price}>{product.price}</p>

            <p className={styles.description}>{product.description}</p>

            <hr className={styles.divider}/>

            <div className={styles.colorSection}>
                <span className={styles.sectionLabel}>Màu sắc:</span>
                {/* Kiểm tra nếu có màu sắc */}
                {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color, index) => (
                        <div
                            key={index}
                            className={styles.colorOption}
                            style={{backgroundColor: color}}
                        >
                            <div className={styles.colorCircle} style={{backgroundColor: color}}/>
                        </div>
                    ))
                ) : (
                    <p>Không có màu sắc</p>
                )}
            </div>
            <div className={styles.sizeOptions}>
                <span className={styles.sectionLabel}>Kích cỡ:</span>
                {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size) => (
                        <button
                            key={size}
                            className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))
                ) : (
                    <p>Không có kích cỡ</p>
                )}
            </div>
            <div className={styles.actionSection}>
            <div className={styles.quantityControl}>
                    <button
                        className={styles.quantityButton}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/13aeb6e8e8d72783cd5e2d97f1603539abd0b939?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            alt="Decrease"
                            className={styles.quantityIcon}
                        />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                        className={styles.quantityButton}
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f607e1a8681165da6cbf6be1c0d81ea3a6c3d392?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            alt="Increase"
                            className={styles.quantityIcon}
                        />
                    </button>
                </div>
                <div className={styles.purchaseButtons}>
                    <button className={styles.buyButton}>Mua ngay</button>
                    <button className={styles.wishlistButton}>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39cad115df8f8fac9803aafdeef0dc52c6de105b?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            alt="Add to wishlist"
                            className={styles.wishlistIcon}
                        />
                    </button>
                </div>
            </div>

            <ProductDeliveryInfo/>
        </div>
    );
};
