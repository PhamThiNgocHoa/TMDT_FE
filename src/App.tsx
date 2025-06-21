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
import ShopPage from "./page/shopPage/ShopPage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoginAd from "./page/admin/LoginAd";
import Register from "./page/loginpage/Register";
import ForgotPass from "./page/loginpage/ForgotPass";
import Resetpass from "./page/loginpage/Resetpass";
import Home from "./page/Home";
import AdminDashboard from "./page/admin/AdminDashboard";
import AccountManagement from "./page/account/AccountManagement";
import CartMain from "./page/cartPage/page";
import CheckoutPage from "./page/checkOutPage/page";
import PostManagement from "./page/Management/postManagement/PostManagement";
import { AddPost } from "./page/Management/postManagement/AddPost";
import { PostProvider } from "./page/Management/postManagement/context/PostContext";
import { EditPost } from "./page/Management/postManagement/EditPost";
import WishlistPage from "./page/WishlistPage";
import { WishlistProvider } from "./context/WishlistContext";
import CategoryManagement from "./page/Management/categoryManagement/CategoryManagement";
import AddCategory from "./page/Management/categoryManagement/AddCategory";
import EditCategory from "./page/Management/categoryManagement/EditCategory";
import { CategoryProvider } from "./page/Management/categoryManagement/context/CategoryContext";
import CustomerManagement from "./page/Management/customerManagement/CustomerManagement";
import { AddCustomer } from "./page/Management/customerManagement/AddCustomer";
import { EditCustomer } from "./page/Management/customerManagement/EditCustomer";
import { CustomerProvider } from "./page/Management/customerManagement/context/CustomerContext";
import OrderManagement from "./page/Management/orderManagement/OrderManagement";
import { AddOrder } from "./page/Management/orderManagement/AddOrder";
import { EditOrder } from "./page/Management/orderManagement/EditOrder";
import { OrderProvider } from "./page/Management/orderManagement/context/OrderContext";
import CustomProductServicePage from "./page/custom/CustomProductServicePage";
import OrderManagementPage from "./page/account/OrderManagementPage/OrderManagementPage";
import CustomProductDetailPage from "./page/custom/CustomProductDetailPage";

import RevenusManagement from "./page/Management/revenueManagement/RevenusManagement";
import { RevenueProvider } from "./page/Management/revenueManagement/context/RevenueContext";
import PaymentReturn from "./page/checkOutPage/page/PaymentReturn";



const App = () => {
  return (
    <PostProvider>
      <WishlistProvider>
        <CategoryProvider>
          <CustomerProvider>
            <OrderProvider>
              <RevenueProvider>
                <Router>
                  <HeaderFooterControl />
                </Router>
              </RevenueProvider>
            </OrderProvider>
          </CustomerProvider>
        </CategoryProvider>
      </WishlistProvider>
    </PostProvider>
  );
};

const HeaderFooterControl = () => {
  const location = useLocation();
  const adminPaths = [
    "/admin",
    "/loginAd",
    "/postManagement",
    "/management/category",
    "/management/customer",
    "/management/customerManagement",
    "/management/orderManagement",
    "/management/orders",
    "/management/revenue",
  ];
  return (
    <>
      {!adminPaths.some((path) => location.pathname.startsWith(path)) && (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/resetpass/:username" element={<Resetpass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/cart" element={<CartMain />} />
        <Route path="/loginad" element={<LoginAd />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlistPage" element={<WishlistPage />} />
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/management/category" element={<CategoryManagement />} />
        <Route path="/management/category/add" element={<AddCategory />} />
        <Route
          path="/management/category/edit/:categoryId"
          element={<EditCategory />}
        />
        <Route path="/payment-return" element={<PaymentReturn/>}/>
        <Route path="/postManagement" element={<PostManagement />} />
        <Route path="/postManagement/add" element={<AddPost />} />
        <Route path="/postManagement/edit/:postId" element={<EditPost />} />
        
        {/* Customer Management Routes */}
        <Route path="/management/customer" element={<CustomerManagement />} />
        <Route
          path="/management/customerManagement/add"
          element={<AddCustomer />}
        />
        <Route 
          path="/management/customerManagement/edit/:Id" 
          element={<EditCustomer />} 
        />
        
        {/* Order Management Routes */}
        <Route path="/management/orderManagement" element={<OrderManagement />} />
        <Route 
          path="/management/orderManagement/add" 
          element={<AddOrder />}
        />
        <Route 
          path="/management/orderManagement/edit/:Id" 
          element={<EditOrder />}
        />
        
        {/* Legacy Order Routes (for backward compatibility) */}
        <Route path="/management/orders" element={<OrderManagement />} />
        
        {/* Revenue Management Routes */}
        <Route path="/management/revenue" element={<RevenusManagement />} />
        
        {/* Các route custom từ nhánh khải */}
        <Route path="/custom" element={<CustomProductServicePage />} />
        <Route path="/orders" element={<OrderManagementPage />} />
        <Route
          path="/custom-product/:slug"
          element={<CustomProductDetailPage />}
        />
      </Routes>
      {!adminPaths.some((path) => location.pathname.startsWith(path)) && (
        <Footer />
      )}
    </>
  );
};

export default App;
