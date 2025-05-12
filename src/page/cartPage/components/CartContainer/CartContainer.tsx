import React from 'react';
import { useCart } from '../../context/CartContext';
import CartHeader from '../CartHeader/CartHeader';
import CartItem from '../CartItem/CartItem';
import CartActions from '../CartActions/CartActions';
import CouponForm from '../CouponForm/CouponForm';
import CartSummary from '../CartSummary/CartSummary';
import EmptyCart from '../EmptyCart/EmptyCart';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './CartContainer.module.css';

const CartContainer: React.FC = () => {
  const { items, isLoading } = useCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <CartHeader />
          
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <CartActions />
      </div>
      
      <div className={styles.cartSummarySection}>
        <CouponForm />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartContainer;
