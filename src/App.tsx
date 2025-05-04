// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Login from './page/Login';
import Home from './page/Home';
import Header from './component/Header';
import Footer from './component/Footer';

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
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>

            {location.pathname !== '/login' && <Footer />}
        </>
    );
};

export default App;
