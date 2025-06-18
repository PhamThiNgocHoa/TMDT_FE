import React from 'react';
import styles from './ProductDetailsPage.module.css';
import {ProductImageResponse} from "../../models/response/ProductImageResponse";

interface ProductGalleryProps {
    images: ProductImageResponse[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.thumbnailColumn}>
                {images.map((image, index) => (
                    <div className={styles.thumbnailWrapper} key={index}>
                        <img
                            src={image.url}
                            className={styles.img}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.mainImageColumn}>
                <div className={styles.mainImageWrapper}>
                    <img
                        src={images[0].url}
                        className={styles.mainImage}
                    />
                </div>
            </div>
        </div>
    );
};
