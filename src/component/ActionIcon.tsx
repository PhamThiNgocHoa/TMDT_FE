"use client";
import React, { useState } from "react";
import  "../assets/css/header.css";
import { WishlistIcon } from "../assets/icons/WishListIcon";
import { CartIcon } from "../assets/icons/CartIcon";
import { UserIcon } from "../assets/icons/UserIcon";
import { useNavigate } from 'react-router-dom';
import useCustomer from "../hooks/useCustomer";


// Fake data for cart items
const fakeCartItems = [
    {
        id: 1,
        name: 'Laptop MSI Modern 15',
        quantity: 1,
        price: '10.990.000₫',
        imageUrl: 'https://via.placeholder.com/50x50', // Placeholder image
    },
     {
        id: 2,
        name: 'Tai nghe Gaming A',
        quantity: 2,
        price: '1.500.000₫',
        imageUrl: 'https://via.placeholder.com/50x50', // Placeholder image
    },
      {
        id: 3,
        name: 'Chuột không dây B',
        quantity: 1,
        price: '500.000₫',
        imageUrl: 'https://via.placeholder.com/50x50', // Placeholder image
    },

];

export const ActionIcons = () => {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false); // State for cart dropdown visibility
    const navigate = useNavigate();
    const { handleLogout } = useCustomer();

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate("/login");
    };

    const handleMouseEnterAccount = () => {
        setShowAccountDropdown(true);
    };

    const handleMouseLeaveAccount = () => {
        setShowAccountDropdown(false);
    };

    const handleMouseEnterCart = () => {
        setShowCartDropdown(true);
    };

    const handleMouseLeaveCart = () => {
        setShowCartDropdown(false);
    };

    const handleMenuItemClick = (action: string) => {
        if (action === 'manageAccount') {
            navigate('/account');
        }
        setShowAccountDropdown(false);
    };

    const handleCartItemClick = (itemId: string) => {
        console.log(`Cart item clicked: ${itemId}`);
        setShowCartDropdown(false);
    };

    const handleWishlistClick = () => {
        navigate('/wishlistPage');
    };

    return (
        <div className="iconContainer">
            <button className="iconButton" aria-label="Wishlist" onClick={handleWishlistClick}>
                <WishlistIcon />
            </button>
            
            {/* Shopping Cart Icon with Dropdown */}
            <div 
                className="iconButton cartIconWrapper" // Add cartIconWrapper class for positioning
                onMouseEnter={handleMouseEnterCart}
                onMouseLeave={handleMouseLeaveCart}
                onClick={() => window.location.href = '/cart'} // Keep navigation on click
            >
                <CartIcon />
                {/* Placeholder for cart item count, replace with actual count */} 
                <span className="cartItemCount">{fakeCartItems.length}</span>

                {showCartDropdown && (
                    <div className="cartDropdown"> {/* Cart Dropdown menu */}
                        {fakeCartItems.length > 0 ? (
                            fakeCartItems.map(item => (
                                <div 
                                    key={item.id} 
                                    className="cartDropdownItem"
                                    onClick={() => handleCartItemClick(item.id.toString())} // Add click handler
                                >
                                    <img src={item.imageUrl} alt={item.name} className="cartItemImage" />
                                    <div className="cartItemInfo">
                                        <div className="cartItemName">{item.name}</div>
                                        <div className="cartItemDetails">{item.quantity} x {item.price}</div>
                                    </div>
                                    {/* Add remove button if needed */}
                                </div>
                            ))
                        ) : (
                            <div className="cartEmptyMessage">Giỏ hàng trống</div>
                        )}
                        {/* Optional: Add a button to view full cart */}
                        {fakeCartItems.length > 0 && (
                             <div className="viewCartButtonContainer">
                                <button className="viewCartButton" onClick={() => { handleCartItemClick('view-all'); window.location.href = '/cart'; }}>Xem giỏ hàng</button>
                             </div>
                        )}
                    </div>
                )}
            </div>

            {/* User Account Icon with Dropdown */}
            <div 
                className="iconButton accountIconWrapper" 
                onMouseEnter={handleMouseEnterAccount}
                onMouseLeave={handleMouseLeaveAccount}
            >
                <UserIcon />
                {showAccountDropdown && (
                    <div className="accountDropdown">
                        <div className="dropdownItem" onClick={() => handleMenuItemClick('manageAccount')}>
                            <i className="fas fa-user"></i>
                            <span>Manage My Account</span>
                        </div>
                        <div className="dropdownItem" onClick={() => handleMenuItemClick('myOrder')}>
                             <i className="fas fa-box"></i> 
                            <span>My Order</span>
                        </div>
                        <div className="dropdownItem" onClick={() => handleMenuItemClick('myCancellations')}>
                             <i className="fas fa-times-circle"></i> 
                            <span>My Cancellations</span>
                        </div>
                         <div className="dropdownItem" onClick={() => handleMenuItemClick('myReviews')}>
                             <i className="fas fa-star"></i> 
                            <span>My Reviews</span>
                        </div>
                        <div className="dropdownItem" onClick={handleLogoutClick}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
