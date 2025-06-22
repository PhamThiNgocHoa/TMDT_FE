"use client";
import React, { useState } from "react";
import  "../assets/css/header.css";
import { WishlistIcon } from "../assets/icons/WishListIcon";
import { CartIcon } from "../assets/icons/CartIcon";
import { UserIcon } from "../assets/icons/UserIcon";
import { useNavigate } from 'react-router-dom';
import useCustomer from "../hooks/useCustomer";
import {CartResponse} from "../models/response/CartResponse";
import {CustomerResponse} from "../models/response/CustomerResponse";

interface Props {
    cartItems : CartResponse | null;
    user: CustomerResponse | null;

}

export const ActionIcons: React.FC<Props> = ({cartItems,user}) => {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const {handleLogout} = useCustomer();
    const navigate = useNavigate();
    const allCartItems = cartItems?.cartItems ?? [];
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
            window.location.reload();
        }
        else if(action === 'manage') {
            if(user?.role === 'ADMIN'){
                navigate('/management/revenue');
            }else {
                navigate('/management/customer');
            }
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
                className="iconButton cartIconWrapper"
                onMouseEnter={handleMouseEnterCart}
                onMouseLeave={handleMouseLeaveCart}
                onClick={() => window.location.href = '/cart'}
            >
                <CartIcon />
                <span className="cartItemCount">{allCartItems.length}</span>

                {showCartDropdown && (
                    <div className="cartDropdown">
                        {allCartItems.length > 0 ? (
                            allCartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="cartDropdownItem"
                                    onClick={() => handleCartItemClick(item.id.toString())}
                                >
                                    <img src={item.product.img} alt={item.product.name} className="cartItemImage" />
                                    <div className="cartItemInfo">
                                        <div className="cartItemName">{item.product.name}</div>
                                        <div className="cartItemDetails">{item.quantity} x {item.product.price}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="cartEmptyMessage">Giỏ hàng trống</div>
                        )}
                        {allCartItems.length > 0 && (
                            <div className="viewCartButtonContainer">
                                <button className="viewCartButton" onClick={() => { handleCartItemClick('view-all'); window.location.href = '/cart'; }}>Xem giỏ hàng</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

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
                            <span>Tài khoản</span>
                        </div>
                        <div className="dropdownItem" onClick={() => handleMenuItemClick('myOrder')}>
                            <i className="fas fa-box"></i>
                            <span>Đơn hàng của tôi</span>
                        </div>
                        {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
                            <div className="dropdownItem" onClick={() => handleMenuItemClick('manage')}>
                                <i className="fas fa-star"></i>
                                <span>Quản trị</span>
                            </div>
                        )}
                        <div className="dropdownItem" onClick={handleLogoutClick}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Đăng xất</span>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};