import React from 'react';
import CartContainer from '../components/CartContainer/CartContainer';
import styles from './index.module.css';
import FlashSaleSection from "../../homePage/homeComponents/FlashSaleSection";
import useCart from "../../../hooks/useCart";
import useCustomer from "../../../hooks/useCustomer";
import useCartItem from "../../../hooks/useCartItem";

export default function CartMain() {
    const { user } = useCustomer();
    const userId = React.useMemo(() => user?.id ?? 0, [user?.id]);

    const { cartData, fetchCart } = useCart(userId);
    const { fetchUpdateCartItem, fetchDeleteCartItem } = useCartItem();

    const handleUpdateCartItem = async (itemId: number, quantity: number) => {
        await fetchUpdateCartItem(itemId, quantity);
        await fetchCart();
    };

    const handleDeleteCartItem = async (itemId: number) => {
        await fetchDeleteCartItem(itemId);
        await fetchCart();
    };

    return (
        <div className={styles.mainContainer}>
            <CartContainer
                cartData={cartData}
                onUpdateCartItem={handleUpdateCartItem}
                onDeleteCartItem={handleDeleteCartItem}
            />
            <FlashSaleSection />
        </div>
    );
}

