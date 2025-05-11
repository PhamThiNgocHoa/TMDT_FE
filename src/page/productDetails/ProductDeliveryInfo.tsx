import React from 'react';
import styles from './ProductDetailsPage.module.css';

export const ProductDeliveryInfo = () => {
    return (
        <section className={styles.deliveryInfo}>
            <div className={styles.shippingInfo}>
                <div className={styles.infoRow}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/24f3c50c14966596b638bd5ef5a563ae4d44d667?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" alt="Shipping" className={styles.infoIcon} />
                    <div className={styles.infoContent}>
                        <h3 className={styles.infoTitle}>Giao hàng miễn phí</h3>
                        <p className={styles.infoText}>
                            Nhập mã bưu điện của bạn để kiểm tra khả năng giao hàng
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.returnInfo}>
                <div className={styles.infoRow}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4620684ef076fc76531661470d5fc2dcebee7e3?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29" alt="Returns" className={styles.infoIcon} />
                    <div className={styles.infoContent}>
                        <h3 className={styles.infoTitle}>Trả hàng</h3>
                        <p className={styles.infoText}>
                            Miễn phí trả hàng trong 30 ngày. <span className={styles.underline}>Chi tiết.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
