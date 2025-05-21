import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  currentTab: string;
}

const sidebarItems = [
  {
    label: "Trang chủ",
    icon: "fas fa-tachometer-alt",
    key: "dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Sản phẩm",
    icon: "fas fa-cube",
    key: "products",
    path: "/admin/products",
  },
  {
    label: "Danh mục",
    icon: "fas fa-cogs",
    key: "category",
    path: "/admin/category",
  },
  {
    label: "Đơn hàng",
    icon: "fas fa-box",
    key: "orders",
    path: "/admin/orders",
  },
  {
    label: "Voucher",
    icon: "fas fa-ticket-alt",
    key: "coupon",
    path: "/admin/coupon",
  },
  {
    label: "Bài viết",
    icon: "fas fa-newspaper",
    key: "banner",
    path: "/admin/banner",
  },
  {
    label: "Doanh thu",
    icon: "fas fa-chart-line",
    key: "transaction",
    path: "/admin/transaction",
  },
];
const userItems = [
  {
    label: "Phân quyền",
    icon: "fas fa-user-shield",
    key: "user-permission",
    path: "/admin/user-permission",
  },
  {
    label: "Khách hàng",
    icon: "fas fa-users",
    key: "customer",
    path: "/admin/customer",
  },
];
const otherItems = [
  {
    label: "Cài đặt",
    icon: "fas fa-cogs",
    key: "setting",
    path: "/admin/setting",
  },
  {
    label: "Hỗ trợ",
    icon: "fas fa-question-circle",
    key: "help",
    path: "/admin/help",
  },
  {
    label: "Đăng xuất",
    icon: "fas fa-sign-out-alt",
    key: "logout",
    path: "/admin/logout",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ currentTab }) => {
  const renderItems = (items: any[]) =>
    items.map((item) => (
      <li key={item.key} className={currentTab === item.key ? "active" : ""}>
        <NavLink
          to={item.path}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <i className={item.icon}></i>{" "}
          <span style={{ marginLeft: 6 }}>{item.label}</span>
        </NavLink>
      </li>
    ));

  return (
    <div className="sidebar">
      <div className="logo">
        <label>OrangeTech</label>
      </div>
      <ul className="menu">
        <label>DANH MỤC</label>
        {renderItems(sidebarItems)}
        <label>NGƯỜI DÙNG</label>
        {renderItems(userItems)}
        <label>KHÁC</label>
        {renderItems(otherItems)}
      </ul>
    </div>
  );
};

export default Sidebar;
