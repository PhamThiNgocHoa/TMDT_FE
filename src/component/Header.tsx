

"use client";
import * as React from "react";
import   '../assets/css/header.css';
import { HeaderLogo } from "../assets/icons/HeaderLogo";
import { NavigationLinks } from "./NavigationLinks";
import { SearchBar } from "./SearchBar";
import { ActionIcons } from "./ActionIcon";
import useCart from "../hooks/useCart";
import useCustomer from "../hooks/useCustomer";

function Header() {
    const { user } = useCustomer();
    const userId = React.useMemo(() => user?.id ?? 0, [user?.id]);
    const { cartData } = useCart(userId);
    return (
        <div className="headerWrapper">
            <div className="headerBanner">
                <div className="bannerTextWrapper">
                    <p className="bannerText">
                        Giảm giá mùa hè cho tất cả sản phẩm và giao hàng nhanh miễn phí - Giảm 50%!
                    </p>
                </div>
            </div>
    <header className="header">
        <div className="headerContent">
            <HeaderLogo/>
            <NavigationLinks/>
            <SearchBar/>
            <ActionIcons cartItems={cartData}/>
        </div>
    </header>
</div>
)
    ;
}

export default Header;
