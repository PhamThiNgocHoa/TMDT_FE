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
            {location.pathname !== '/login' && <Header />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                {/* Add other routes here */}
            </Routes>

            {location.pathname !== '/login' && <Footer />}
        </>
    );
};

export default App;
