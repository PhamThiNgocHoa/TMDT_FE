import React from 'react';
import styles from './CartSummary.module.css';
import formatToVND from "../../../../hooks/formatToVND";
import {CartResponse} from "../../../../models/response/CartResponse";

interface CartSummaryProps {
    cartData: CartResponse;
}
const CartSummary: React.FC<CartSummaryProps> = ({ cartData }) => {
    const subtotal = cartData?.cartItems?.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
    }, 0) || 0;

    const shipping = subtotal > 500000 ? 0 : 30000;

    const appliedCoupon = false;
    const discount = appliedCoupon ? subtotal * 0.1 : 0;

    const total = subtotal + shipping - discount;

    return (
        <div className={styles.summaryContainer}>

            <h2 className={styles.summaryTitle}>Tổng giỏ hàng</h2>

            <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tổng tiền:</span>
                <span className={styles.summaryValue}>
                    {formatToVND(subtotal)}
                </span>
            </div>

            <div className={styles.divider}/>

            <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Phí Ship:</span>
                <span className={styles.summaryValue}>
                    {shipping > 0 ? formatToVND(shipping) : 'Miễn phí'}
                </span>
            </div>

            <div className={styles.divider}/>

            {appliedCoupon ? (
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Giảm giá:</span>
                    <span className={styles.summaryValue}>
                        -{formatToVND(discount)}
                    </span>
                </div>
            ) : (
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Mã giảm giá:</span>
                    <span className={styles.summaryValue}>Chưa áp dụng</span>
                </div>
            )}

            <div className={styles.divider}/>

            <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tổng cộng:</span>
                <span className={styles.summaryValue}>
                    {formatToVND(total)}
                </span>
            </div>

            <button
                className={styles.checkoutButton}
                onClick={() => window.location.href = '/checkout'}
            >
                <span className={styles.checkoutButtonText}>Tiến hành thanh toán</span>
            </button>
        </div>
    );
};

export default CartSummary;
