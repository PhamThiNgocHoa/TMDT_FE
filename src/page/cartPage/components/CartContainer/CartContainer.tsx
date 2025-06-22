import React from 'react';
import CartHeader from '../CartHeader/CartHeader';
import CartItem from '../CartItem/CartItem';
import CouponForm from '../CouponForm/CouponForm';
import CartSummary from '../CartSummary/CartSummary';
import EmptyCart from '../EmptyCart/EmptyCart';
import styles from './CartContainer.module.css';
import { CartResponse } from '../../../../models/response/CartResponse';

interface CartContainerProps {
    cartData: CartResponse | null;
    onUpdateCartItem: (cartItemId: number, quantity: number) => void;
    onDeleteCartItem: (cartItemId: number) => void;
}

const CartContainer: React.FC<CartContainerProps> = ({
                                                         cartData,
                                                         onUpdateCartItem,
                                                         onDeleteCartItem
                                                     }) => {
    if (!cartData || cartData.cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartContent}>
                <div className={styles.cartItems}>
                    <CartHeader />
                    {cartData.cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateCartItem={onUpdateCartItem}
                            onDeleteCartItem={onDeleteCartItem}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.cartSummarySection}>
                <CouponForm />
                <CartSummary cartData={cartData} />
            </div>
        </div>
    );
};

export default CartContainer;
