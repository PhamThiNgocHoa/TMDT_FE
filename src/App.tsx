// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./page/loginpage/Login";
import ProductDetailsPage from "./page/productDetails/ProductDetailsPage";
import HomePage from "./page/homePage/HomePage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoginAd from "./page/admin/LoginAd";
import Register from "./page/Register";
import ForgotPass from "./page/ForgotPass";
import AccountManagement from "./page/account/AccountManagement";
import CartMain from "./page/cartPage/page";
import CheckoutPage from "./page/checkOutPage/page";
import CustomProductServicePage from "./page/custom/CustomProductServicePage";
import OrderManagementPage from "./page/account/OrderManagementPage/OrderManagementPage";
import CustomProductDetailPage from "./page/custom/CustomProductDetailPage";
import AdminDashboard from "./page/admin/AdminDashboard";

const App = () => {
  return (
    <Router>
      <HeaderFooterControl />
    </Router>
  );
};

const HeaderFooterControl = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && location.pathname !== "/loginAd" && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/cart" element={<CartMain />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/loginad" element={<LoginAd />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/custom" element={<CustomProductServicePage />} />
        <Route path="/orders" element={<OrderManagementPage />} />
        <Route
          path="/custom-product/:slug"
          element={<CustomProductDetailPage />}
        />
      </Routes>
      {!isAdmin && location.pathname !== "/loginAd" && <Footer />}
    </>
  );
};

export default App;
