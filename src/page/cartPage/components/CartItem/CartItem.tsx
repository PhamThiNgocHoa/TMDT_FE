import React from 'react';
import styles from './CartItem.module.css';
import { CartItemResponse } from '../../../../models/response/CartItemResponse';
import formatToVND from "../../../../hooks/formatToVND";

interface CartItemProps {
    item: CartItemResponse;
    onUpdateCartItem: (cartItemId: number, quantity: number) => void;
    onDeleteCartItem: (cartItemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateCartItem, onDeleteCartItem }) => {
    const handleIncreaseQuantity = () => {
        onUpdateCartItem(item.id, item.quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            onUpdateCartItem(item.id, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        onDeleteCartItem(item.id);
    };

    const subtotal = item.product.price * item.quantity;

    return (
        <div className={styles.cartItem}>
            <div className={styles.removeButton} onClick={handleRemove} />

            <div className={styles.productImage}>
                <img
                    src={item.product.img}
                    alt={item.product.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
            </div>

            <span className={styles.productName}>{item.product.name}</span>
            <span className={styles.productPrice}>{formatToVND(item.product.price)}</span>

            <div className={styles.quantityControl}>
                <span className={styles.quantityText}>
                    {item.quantity.toString().padStart(2, '0')}
                </span>

                <div className={styles.quantityControls}>
                    <button className={styles.quantityButton} onClick={handleIncreaseQuantity}>
                        <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 1L9 5" stroke="black" strokeWidth="1.5" />
                        </svg>
                    </button>

                    <button
                        className={styles.quantityButton}
                        onClick={handleDecreaseQuantity}
                        disabled={item.quantity <= 1}
                    >
                        <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <span className={styles.subtotal}>{formatToVND(subtotal)}</span>
        </div>
    );
};

export default CartItem;
