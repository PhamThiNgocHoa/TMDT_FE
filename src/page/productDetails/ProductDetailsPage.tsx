import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import styles from "./ProductDetailsPage.module.css";
import {ProductGallery} from "./ProductGallery";
import {ProductInfo} from "./ProductInfo";
import ProductReviewsSection from "./ProductReviewsSection";
import {RelatedProducts} from "./RelatedProducts";
import useCustomer from "../../hooks/useCustomer";

export default function ProductDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const {fetchGetProductById, product, products, setProduct} = useProduct();
    const {user} = useCustomer()

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                setProduct(data);
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
    if (!product) return <div>Không tìm thấy sản phẩm</div>;


    return (
        <main className={styles.productDetailspage}>
            <section className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.mainContent}>
                        <article className={styles.productColumn}>
                            <div className={styles.productContent}>
                                <ProductGallery images={product.productImages}/>
                            </div>
                        </article>
                        <aside className={styles.infoColumn}>
                            <ProductInfo product={product}/>
                        </aside>
                    </div>
                </div>
                {user?.id !== 0 &&(
                    <ProductReviewsSection
                        productId={product.id}
                        customerId={user?.id ?? 0}
                        customerName={user?.fullname ?? ""}
                    />
                )}
                <RelatedProducts products={products}/>
            </section>
        </main>
    );
}
