import React from "react";
import "../assets/css/header.css";

export const NavigationLinks = () => {
    return (
        <nav className="navigation">
            <div className="navItem">
                <span className="navLink"> <a className="b" href="/home"> Trang chủ </a></span>
                <div className="activeIndicator"/>
            </div>
            <span className="navLink"> <a className="a" href="/custom"> Custom </a></span>
            <span className="navLink"> <a className="a" href="/shop"> Cửa hàng </a></span>
            <span className="navLink"> <a className="a" href="/home"> Về chúng tôi</a></span>
        </nav>
    );
};
