import React from 'react';
import styles from './ProductDetailsPage.module.css';
import {ProductImage} from "../homePage/types/product";

interface ProductGalleryProps {
    images: ProductImage[];
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
                            alt={image.alt}
                            className={styles.img}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.mainImageColumn}>
                <div className={styles.mainImageWrapper}>
                    <img
                        src={images[0].url}
                        alt={images[0].alt}
                        className={styles.mainImage}
                    />
                </div>
            </div>
        </div>
    );
};
