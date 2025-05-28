import React, { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import "../../assets/css/admin.css";
import UserPermissionPage from "./UserPermissionPage/UserPermissionPage";
import ProductsPage from "./ProductPage/ProductsPage";
import CustomersPage from "./CustomersPage";
import AdminTopbar from "./AdminTopbar/AdminTopbar";
import OrdersPage from "./OrdersPage/OrdersPage";
import OrderDetailPage from "./OrdersPage/OrderDetailPage";

const getTabFromPath = (pathname: string) => {
  const match = pathname.match(/^\/admin\/(\w+)/);
  return match ? match[1] : "dashboard";
};

const AdminDashboard = () => {
  const location = useLocation();
  const currentTab = getTabFromPath(location.pathname);

  return (
    <>
      <AdminTopbar />
      <div className="dashboard-container">
        <Sidebar currentTab={currentTab} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Dashboard Content</div>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/category" element={<div>Category Content</div>} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/coupon" element={<div>Orders Content</div>} />
            <Route path="/banner" element={<div>Orders Content</div>} />
            <Route path="/transaction" element={<div>Orders Content</div>} />
            <Route path="/setting" element={<div>Orders Content</div>} />
            <Route path="/help" element={<div>Orders Content</div>} />
            <Route path="/logout" element={<div>Orders Content</div>} />
            <Route path="/user-permission" element={<UserPermissionPage />} />
            <Route path="/customer" element={<CustomersPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
