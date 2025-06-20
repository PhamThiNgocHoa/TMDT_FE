import React from 'react';
import styles from './styles.module.css';
import formatToVND from "../../../../hooks/formatToVND";
import {CartResponse} from "../../../../models/response/CartResponse";

interface CartItemsProps {
    items: CartResponse | null;
}

const CartItems: React.FC<CartItemsProps> = ({items}) => {
    return (
        <section className={styles.cartItemsSection}>
            {items?.cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                    <div className={styles.productImage}>
                        <div
                            className={styles.imageContainer}
                            style={{backgroundImage: `url(${item.product.img})`}}
                        />
                    </div>
                    <div className={styles.productDetails}>
                        <span className={styles.productName}>{item.product.name}</span>
                        <span className={styles.productPrice}>
              {formatToVND(item.product.price)}
            </span>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CartItems;
