import React, { useState } from "react";
import "./OrderManagementPage.css";
// Giả sử bạn đã có các component Header, Footer
// import Header from "../../component/Header";

const sidebarMenu = [
  { label: "Lịch sử đơn hàng", active: true },
  { label: "Đơn hàng đã huỷ", active: false },
  { label: "Theo dõi chi tiết vận chuyển", active: false },
];
const policyMenu = [
  { label: "Chính sách huỷ đơn hàng" },
  { label: "Chính sách hoàn trả" },
];
const tabs = [
  "Tất cả",
  "Xác nhận",
  "Chờ vận chuyển",
  "Đang vận chuyển",
  "Thành công",
  "Chờ huỷ đơn",
  "Đã huỷ",
];
const orders = [
  // Dữ liệu mẫu, bạn có thể thay bằng fetch thực tế
  {
    id: "302012",
    product: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    note: "Không có",
    total: "12.000.000đ",
    date: "24/3/2025",
    status: "Chờ vận chuyển",
    statusType: "pending",
    products: 3,
  },
  {
    id: "302013",
    product: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    note: "Không có",
    total: "12.000.000đ",
    date: "24/3/2025",
    status: "Đã huỷ",
    statusType: "cancel",
    products: 3,
  },
  {
    id: "302014",
    product: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    note: "Không có",
    total: "12.000.000đ",
    date: "24/3/2025",
    status: "Đang vận chuyển",
    statusType: "shipping",
    products: 3,
  },
  // ... thêm các đơn hàng khác tương tự
];

const statusColor: { [key: string]: string } = {
  "Chờ vận chuyển": "pending",
  "Đã huỷ": "cancel",
  "Đang vận chuyển": "shipping",
  "Thành công": "success",
  "Chờ huỷ đơn": "waiting",
};

// Thêm type cho props của OrderTabs
interface OrderTabsProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}
const OrderTabs = ({ activeTab, setActiveTab }: OrderTabsProps) => (
  <div className="order-tabs-wrapper">
    <div className="order-tabs-list">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          className={activeTab === idx ? "active" : ""}
          onClick={() => setActiveTab(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const OrderManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="order-page-bg">
      <div className="order-container">
        <aside className="order-sidebar">
          <div className="order-sidebar-title">Quản lý đơn hàng cá nhân</div>
          <ul className="order-sidebar-menu">
            {sidebarMenu.map((item, idx) => (
              <li key={idx} className={item.active ? "active" : ""}>
                {item.label}
              </li>
            ))}
          </ul>
          <div className="order-sidebar-title" style={{ marginTop: 32 }}>
            Chính sách hoàn trả & huỷ đơn
          </div>
          <ul className="order-sidebar-menu">
            {policyMenu.map((item, idx) => (
              <li key={idx}>{item.label}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default OrderManagementPage;
