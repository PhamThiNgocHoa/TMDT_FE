import React, { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import UserPermissionPage from "./UserPermissionPage/UserPermissionPage";
import CustomersPage from "./CustomersPage";
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
      <div className="dashboard-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Dashboard Content</div>} />
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
