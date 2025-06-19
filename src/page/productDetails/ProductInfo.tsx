import React, { useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import { ProductDeliveryInfo } from './ProductDeliveryInfo';
import { ProductResponse } from '../../models/response/ProductResponse';
import formatToVND from '../../hooks/formatToVND';

interface ProductInfoProps {
    product: ProductResponse;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedPosition, setSelectedPosition] = useState("Trên giữa");
    const [selectedHeight, setSelectedHeight] = useState("12.5");
    const [selectedSize, setSelectedSize] = useState<string>(
        product.productSizes?.[0]?.size || ''
    );
    const [selectedColor, setSelectedColor] = useState<string>(
        product.productColors?.[0]?.color || ''
    );

    return (
        <div className={styles.productInfo}>
            <h1 className={styles.productTitle} style={{marginTop: "-40px"}}>
                {product.name}
            </h1>

            {(product.type === 'Custom' || product.type === 'Handbook-custom') && (
                <>
                    <div style={{marginBottom: 18, color: '#222', fontSize: 15}}>
                        Gói khắc tên/chữ ký dành cho bàn phím cơ của bạn. Đối với bàn phím cơ được gửi từ khách hàng,
                        chính sách
                        vận chuyển/bảo hành sẽ có sự khác biệt. Vui lòng xem trong mục Vận chuyển và Bảo hành ở phía
                        dưới
                    </div>

                    <div style={{marginBottom: 16}}>
                        <div style={{fontWeight: 600, marginBottom: 8}}>Vị trí</div>
                        <div style={{display: "flex", gap: 12}}>
                            {["Trên trái", "Trên giữa", "Trên phải"].map((pos) => (
                                <button
                                    key={pos}
                                    onClick={() => setSelectedPosition(pos)}
                                    style={{
                                        padding: "8px 22px",
                                        borderRadius: 8,
                                        border: selectedPosition === pos ? "2px solid #d7263d" : "1.5px solid #ccc",
                                        background: selectedPosition === pos ? "#fff0f0" : "#fff",
                                        color: selectedPosition === pos ? "#d7263d" : "#222",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{marginBottom: 16}}>
                        <div style={{fontWeight: 600, marginBottom: 8}}>Chiều cao</div>
                        <div style={{display: "flex", gap: 12}}>
                            {["7.5", "10", "12.5", "15", "17.5"].map((h) => (
                                <button
                                    key={h}
                                    onClick={() => setSelectedHeight(h)}
                                    style={{
                                        padding: "8px 18px",
                                        borderRadius: 8,
                                        border: selectedHeight === h ? "2px solid #d7263d" : "1.5px solid #ccc",
                                        background: selectedHeight === h ? "#fff0f0" : "#fff",
                                        color: selectedHeight === h ? "#d7263d" : "#222",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{marginBottom: 16}}>
                        <div style={{fontWeight: 600, marginBottom: 8}}>Ghi chú:</div>
                        <textarea
                            placeholder=""
                            style={{
                                border: "1.5px solid #ccc",
                                borderRadius: 8,
                                padding: "10px 12px",
                                width: "100%",
                                fontSize: 15,
                                minHeight: 48,
                                resize: "vertical",
                                fontWeight: 500,
                            }}
                        />
                    </div>
                </>
            )}

            <div className={styles.ratingContainer}>
                <div className={styles.ratingWrapper}>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/55500910f7fda67e937673122aa77ab99e4599d2?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                        alt="Rating"
                        className={styles.ratingStars}
                    />
                    <span className={styles.reviewCount}>(10 Đánh giá)</span>
                </div>
                <div className={styles.stockInfo}>
                    <div className={styles.divider}/>
                    <span className={styles.inStock}>{product.inStock ? 'Còn hàng' : 'Hết hàng'}</span>
                </div>
            </div>

            <p className={styles.price}>{formatToVND(product.price)}</p>

            <p className={styles.description}>{product.description}</p>

            {product.productColors && product.productColors.length > 0 && (
                <div className={styles.colorSection}>
                    <span className={styles.sectionLabel}>Màu sắc:</span>
                    <div style={{display: 'flex', gap: 10, marginTop: 8}}>
                        {product.productColors.map(colorObj => (
                            <div
                                key={colorObj.id}
                                title={colorObj.color}
                                onClick={() => setSelectedColor(colorObj.color)}
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    backgroundColor: colorObj.color,
                                    border: selectedColor === colorObj.color ? '4px solid #007bff' : '1.5px solid #ccc',
                                    cursor: 'pointer',
                                    transition: 'border 0.3s',
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {product.productSizes && product.productSizes.length > 0 && (
                <div className={styles.sizeOptions}>
                    <span className={styles.sectionLabel}>Kích cỡ:</span>
                    <div style={{marginTop: 8}}>
                        {product.productSizes.map(sizeObj => (
                            <button
                                key={sizeObj.id}
                                onClick={() => setSelectedSize(sizeObj.size)}
                                style={{
                                    marginRight: 8,
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    borderRadius: 4,
                                    border: selectedSize === sizeObj.size ? '2px solid #007bff' : '1px solid #ccc',
                                    backgroundColor: selectedSize === sizeObj.size ? '#e6f0ff' : '#fff',
                                    fontWeight: selectedSize === sizeObj.size ? '600' : '400',
                                }}
                            >
                                {sizeObj.size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.actionSection}>
                <div className={styles.quantityControl}>
                    <button className={styles.quantityButton} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/13aeb6e8e8d72783cd5e2d97f1603539abd0b939?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            alt="Decrease"
                            className={styles.quantityIcon}
                        />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button className={styles.quantityButton} onClick={() => setQuantity(quantity + 1)}>
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
