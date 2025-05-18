"use client";

import React from 'react';
import styles from './ProductDetailsPage.module.css';
import { ProductBreadcrumb } from './ProductBreadcrumb';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import ProductReviewsSection from './ProductReviewsSection';
// import { RelatedProducts } from './RelatedProducts';
import { relatedProducts } from './mockData';
import { RelatedProducts } from "./RelatedProducts";
import { useParams } from "react-router-dom";
import { Product } from "../homePage/types/product";



export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const getCurrentProduct = (): Product | undefined => {
        return relatedProducts.find(product => product.id === id);
    };

    const product = getCurrentProduct();

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: product!.category, path: `/${product!.category.toLowerCase()}` },
        { label: product!.name, path: '' }
    ];

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <main className={styles.productDetailspage}>
            <section className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.mainContent}>
                        <article className={styles.productColumn}>
                            <div className={styles.productContent}>
                                <ProductBreadcrumb items={breadcrumbItems} />
                                <ProductGallery images={product.images} />
                            </div>
                        </article>
                        <aside className={styles.infoColumn}>
                            <ProductInfo product={product} />
                        </aside>
                    </div>
                </div>

                <ProductReviewsSection />

                <RelatedProducts products={relatedProducts}/>
            </section>
        </main>
    );
}
