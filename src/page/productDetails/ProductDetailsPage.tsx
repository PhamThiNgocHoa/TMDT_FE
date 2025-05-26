import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import styles from './ProductDetailsPage.module.css';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import ProductReviewsSection from './ProductReviewsSection';
import { RelatedProducts } from './RelatedProducts';
import { relatedProducts } from './mockData';

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { fetchGetProductById, products, setProducts} = useProduct();

<<<<<<< HEAD
    const getCurrentProduct = (): Product | undefined => {
        return relatedProducts.find(product => product.id === Number(id));
    };
    const product = getCurrentProduct();
=======
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

>>>>>>> 2a63fcf381949e5cf14217beecd7905fc1fc1a96


    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                setError("ID không hợp lệ");
                return;
            }
            setLoading(true);
            setError("");
            try {
                const data = await fetchGetProductById(idNum);
                setProducts(data ? [data] : []);
            } catch (err) {
                setError("Không tìm thấy sản phẩm");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);



    if (loading) return <div>Đang tải sản phẩm...</div>;
    if (error) return <div>{error}</div>;
    if (!products) return <div>Không tìm thấy sản phẩm</div>;

    // const breadcrumbItems = [
    //     { label: 'Home', path: '/' },
    //     { label: product.category, path: `/${product.category.toLowerCase()}` },
    //     { label: product.name, path: '' },
    // ];

    return (
        <main className={styles.productDetailspage}>
            <section className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.mainContent}>
                        <article className={styles.productColumn}>
                            <div className={styles.productContent}>
<<<<<<< HEAD
                                <ProductGallery images={product.images} />
=======
                                {/*<ProductBreadcrumb items={breadcrumbItems} />*/}
                                <ProductGallery images={products[0].productImages} />
>>>>>>> 2a63fcf381949e5cf14217beecd7905fc1fc1a96
                            </div>
                        </article>
                        <aside className={styles.infoColumn}>
                            <ProductInfo product={products[0]} />
                        </aside>
                    </div>
                </div>

                <ProductReviewsSection />
<<<<<<< HEAD

                {/*<RelatedProducts products={relatedProducts}/>*/}
=======
                <RelatedProducts products={relatedProducts} />
>>>>>>> 2a63fcf381949e5cf14217beecd7905fc1fc1a96
            </section>
        </main>
    );
}
