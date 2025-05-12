// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Login from './page/loginpage/Login';

import {RelatedProducts} from "./page/productDetails/RelatedProducts";
import {relatedProducts} from "./page/productDetails/mockData";
import ProductDetailsPage from "./page/productDetails/ProductDetailsPage";
import HomePage from "./page/homePage/HomePage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoginAd from './page/admin/LoginAd';
import Register from './page/Register';
import ForgotPass from './page/ForgotPass';
import Home from './page/Home';


import AdminDashboard from './page/admin/AdminDashboard';

import AccountManagement from './page/account/AccountManagement';
import CartMain from "./page/cartPage/page";
import CheckoutPage from "./page/checkOutPage/page";
const App = () => {
    return (
        <Router>
            <HeaderFooterControl />
        </Router>
    );
};

const HeaderFooterControl = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/admin' && location.pathname !== '/loginAd' && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/account" element={<AccountManagement />} />
                <Route path="/cart" element={<CartMain />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/loginad" element={<LoginAd />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            {location.pathname !== '/admin' && location.pathname !== '/loginAd' && <Footer />}
        </>
    );
};

export default App;
