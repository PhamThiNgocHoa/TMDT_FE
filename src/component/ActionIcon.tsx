"use client";
import React from "react";
import  "../assets/css/header.css";
import { WishlistIcon } from "../assets/icons/WishListIcon";
import { CartIcon } from "../assets/icons/CartIcon";
import { UserIcon } from "../assets/icons/UserIcon";

export const ActionIcons = () => {
    return (
        <div className="iconContainer">
            <button className="iconButton" aria-label="Wishlist">
                <WishlistIcon />
            </button>
            <button className="iconButton" aria-label="Shopping Cart">
                <CartIcon />
            </button>
            <button className="iconButton" aria-label="User Account">
                <UserIcon />
            </button>
        </div>
    );
};
