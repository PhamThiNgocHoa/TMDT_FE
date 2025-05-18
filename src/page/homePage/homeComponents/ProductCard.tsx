import React, { useState } from 'react';
import '../../../assets/css/homeStyles/productCard.css';
import { Product } from "../types/product";
import { useWishlist } from '../../../context/WishlistContext';

interface ProductCardProps {
    product: Product;
    onProductClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addOrRemoveFromWishlist, isInWishlist } = useWishlist();

    const isFavorited = isInWishlist(product.id);

    const handleWishlistClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        addOrRemoveFromWishlist(product.id);
    };

    return (
        <article
            className={`product-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onProductClick(product.id)}
        >
            <div className="product-image-container">
                {product.discountPercentage && product.discountPercentage > 0 && (
                    <div className="discount-badge">
                        -{product.discountPercentage}%
                    </div>
                )}

                {product.isNew && (
                    <div className="new-badge">
                        NEW
                    </div>
                )}

                <div className="product-actions">
                    <button
                        className={`action-btn wishlist-btn ${isFavorited ? 'favorited' : ''}`}
                        onClick={handleWishlistClick}
                    >
                        <span className="icon">❤️</span>
                    </button>
                    <button className="action-btn quickview-btn">
                        <span className="icon">👁️</span>
                    </button>
                </div>

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                />

                {isHovered && (
                    <div className="add-to-cart-container">
                        <button className="add-to-cart-btn">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price">
          <span className="current-price">
            {product.formattedPrice}
          </span>

                    {product.formattedOriginalPrice && (
                        <span className="original-price">
              {product.formattedOriginalPrice}
            </span>
                    )}
                </div>

                <div className="product-rating">
                    <div className={`stars stars-${Math.floor(product.rating)}`}>
                        {product.rating >= 1 && <span className="star">★</span>}
                        {product.rating >= 2 && <span className="star">★</span>}
                        {product.rating >= 3 && <span className="star">★</span>}
                        {product.rating >= 4 && <span className="star">★</span>}
                        {product.rating >= 5 && <span className="star">★</span>}
                    </div>
                    <span className="rating-count">({product.reviewCount})</span>
                </div>

                {product.colors && product.colors.length > 0 && (
                    <div className="product-colors">
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                className="color-option"
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default ProductCard;
