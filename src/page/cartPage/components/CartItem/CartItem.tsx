import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../data/mockData';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  const subtotal = item.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div 
        className={styles.removeButton} 
        onClick={handleRemove}
        aria-label="Remove item"
      />
      
      <div className={styles.productImage}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain' 
          }} 
        />
      </div>
      
      <span className={styles.productName}>{item.name}</span>
      <span className={styles.productPrice}>{formatCurrency(item.price)}</span>
      
      <div className={styles.quantityControl}>
        <span className={styles.quantityText}>
          {item.quantity.toString().padStart(2, '0')}
        </span>
        
        <div className={styles.quantityControls}>
          <button 
            className={styles.quantityButton} 
            onClick={handleIncreaseQuantity}
            aria-label="Increase quantity"
          >
            <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L5 1L9 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className={styles.quantityButton} 
            onClick={handleDecreaseQuantity}
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
          >
            <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <span className={styles.subtotal}>{formatCurrency(subtotal)}</span>
    </div>
  );
};

export default CartItem;
