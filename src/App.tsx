// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoginAd from './page/admin/LoginAd';
import Login from './page/Login';
import Register from './page/Register';
import ForgotPass from './page/ForgotPass';
import Home from './page/Home';
import Header from './component/Header';
import Footer from './component/Footer';

import AccountManagement from './page/account/AccountManagement';
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
            {location.pathname !== '/loginAd' && <Header />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/account" element={<AccountManagement />} />

                <Route path="/admin" element={<LoginAd />} />
            </Routes>

            {location.pathname !== '/loginAd' && <Footer />}
        </>
    );
};

export default App;
