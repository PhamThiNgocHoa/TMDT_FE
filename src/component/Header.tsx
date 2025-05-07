// src/components/Header.tsx
import React from 'react';
import logo from '../assets/image/logo2.png';
import '../assets/css/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-top">
                <p>Giảm giá mùa hè cho tất cả sản phẩm và giao hàng nhanh miễn phí - Giảm 50%!</p>
            </div>

            <div className="header-main">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <nav className="nav-links">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/shop">Cửa hàng</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Liên hệ</a></li>
                    </ul>
                </nav>

                <div className="search-cart-language">
                    <input type="text" placeholder="Bạn muốn tìm kiếm gì?" className="search-input" />
                    <div className="cart">
                        <a href="/cart">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </div>
                    <div className="language-selector">
                        <span>English</span>
                        <select>
                            <option>English</option>
                            <option>Vietnamese</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
