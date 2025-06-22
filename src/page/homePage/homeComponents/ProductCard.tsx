import Swal from "sweetalert2"; // import Swal
import React, { useState } from "react";
import "../../../assets/css/homeStyles/productCard.css";
import { useWishlist } from "../../../context/WishlistContext";
import formatToVND from "../../../hooks/formatToVND";
import { ProductResponse } from "../../../models/response/ProductResponse";
import useCartItem from "../../../hooks/useCartItem";
import useCustomer from "../../../hooks/useCustomer";

interface ProductCardProps {
    product: ProductResponse;
    onProductClick: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addOrRemoveFromWishlist, isInWishlist } = useWishlist();
    const { fetchSaveCartItem } = useCartItem();
    const { user } = useCustomer();

    const isFavorited = isInWishlist(product.id);

    const handleWishlistClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        addOrRemoveFromWishlist(product.id);
    };

    const handleAddToCart = async (event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            await fetchSaveCartItem({
                cartId: user?.cartId ?? 0,
                productId: product.id,
                quantity: 1,
                color: "",
            });

            // ✅ Dùng Swal thay vì alert
            Swal.fire({
                icon: "success",
                title: "Thành công!",
                text: "Sản phẩm đã được thêm vào giỏ hàng.",
                timer: 2000,
                showConfirmButton: false,
            });

        } catch (err) {
            console.error("Thêm vào giỏ hàng thất bại:", err);
            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Thêm vào giỏ hàng thất bại.",
            });
        }
    };

    return (
        <article
            className={`product-card ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onProductClick(product.id)}
        >
            <div className="product-image-container">
                {product.discount && parseFloat(product.discount) > 0 && (
                    <div className="discount-badge">-{product.discount}</div>
                )}

                {product.productNew && <div className="new-badge">NEW</div>}

                <div className="product-actions">
                    <button
                        className={`action-btn wishlist-btn ${isFavorited ? "favorited" : ""}`}
                        onClick={handleWishlistClick}
                    >
                        <span className="icon">❤️</span>
                    </button>
                    <button className="action-btn quickview-btn">
                        <span className="icon">👁️</span>
                    </button>
                </div>

                <img src={product.img} alt={product.name} className="product-image" />

                {isHovered && (
                    <div className="add-to-cart-container">
                        <button onClick={handleAddToCart} className="add-to-cart-btn">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price">
                    <span className="current-price">{formatToVND(product.price)}</span>
                    {formatToVND(product.originalPrice ?? 0) && (
                        <span className="original-price">{formatToVND(product.originalPrice ?? 0)}</span>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
