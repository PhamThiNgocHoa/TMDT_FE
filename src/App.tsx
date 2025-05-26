// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Login from './page/loginpage/Login';

import {RelatedProducts} from "./page/productDetails/RelatedProducts";
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
import PostManagement from "./page/Management/postManagement/PostManagement";
import {AddPost} from "./page/Management/postManagement/AddPost";
import {PostProvider} from "./page/Management/postManagement/context/PostContext";
import {EditPost} from "./page/Management/postManagement/EditPost";
import WishlistPage from "./page/WishlistPage";
import { WishlistProvider } from './context/WishlistContext';

// Import Category Management components and context
import CategoryManagement from './page/Management/categoryManagement/CategoryManagement';
import AddCategory from './page/Management/categoryManagement/AddCategory';
import EditCategory from './page/Management/categoryManagement/EditCategory';
import { CategoryProvider } from './page/Management/categoryManagement/context/CategoryContext';

const App = () => {
    return (
        <PostProvider>
            <WishlistProvider>
                <CategoryProvider>
                    <Router>
                        <HeaderFooterControl />
                    </Router>
                </CategoryProvider>
            </WishlistProvider>
        </PostProvider>
    );
};

const HeaderFooterControl = () => {
    const location = useLocation();

    // Add category management paths to the exclusion list for Header/Footer
    const adminPaths = ['/admin', '/loginAd', '/postManagement', '/management/category'];

    return (
        <>
            {!adminPaths.some(path => location.pathname.startsWith(path)) && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<AccountManagement />} />
                <Route path="/cart" element={<CartMain />} />
                {/*<Route path="/admin" element={<AdminDashboard />} />*/}
                <Route path="/loginad" element={<LoginAd />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* Post Management Routes */}
                <Route path="/postManagement" element={<PostManagement />} />
                <Route path="/postManagement/add" element={<AddPost />} />
                <Route path="/postManagement/edit/:postId" element={<EditPost />} />

                {/* Wishlist Route */}
                <Route path="/wishlistPage" element={<WishlistPage />} />

                {/* Category Management Routes */}
                <Route path="/management/category" element={<CategoryManagement />} />
                <Route path="/management/category/add" element={<AddCategory />} />
                <Route path="/management/category/edit/:categoryId" element={<EditCategory />} />


            </Routes>
            {!adminPaths.some(path => location.pathname.startsWith(path)) && <Footer />}
        </>
    );
};

export default App;
