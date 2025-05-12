import React from 'react';
import { CartProvider } from '../context/CartContext';
import CartContainer from '../components/CartContainer/CartContainer';
import styles from './index.module.css';
import FlashSaleSection from "../../homePage/homeComponents/FlashSaleSection";

export default function CartMain() {
  return (
    <CartProvider>
      <div className={styles.mainContainer}>
        <CartContainer />
          <FlashSaleSection />
      </div>
    </CartProvider>
  );
}
