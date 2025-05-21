import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Dữ liệu mẫu
type OrderStatus = "Đang xử lý" | "Đã giao" | "Đã nhận" | "Đã hủy";

const MOCK_ORDER = {
  id: "302012",
  status: "Đang xử lý" as OrderStatus,
  date: "29/12/2022",
  customer: {
    name: "Nguyễn Văn A",
    phone: "0987654321",
    email: "vana@gmail.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  total: "59.000.000₫",
  payment: "24/06/2023",
  note: "Giao giờ hành chính",
  products: [
    {
      name: "iPhone 11 Pro",
      img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
      qty: 1,
      price: "30.000.000₫",
    },
    {
      name: "Ốp lưng iPhone",
      img: "https://cdn.tgdd.vn/Products/Images/60/220609/op-lung-iphone-11-pro-max-nhua-trong-1-600x600.jpg",
      qty: 2,
      price: "500.000₫",
    },
  ],
  history: [
    { status: "Đang xử lý", time: "29/12/2022 09:00" },
    { status: "Đã tạo đơn", time: "29/12/2022 08:55" },
  ],
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  "Đang xử lý": "#ffb200",
  "Đã giao": "#bfc9d8",
  "Đã nhận": "#4ad991",
  "Đã hủy": "#ff6b6b",
};
const STATUS_BG: Record<OrderStatus, string> = {
  "Đang xử lý": "#fff7e0",
  "Đã giao": "#f3f6fa",
  "Đã nhận": "#e6f9f2",
  "Đã hủy": "#fff0f0",
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // TODO: fetch thực tế theo id
  const order = MOCK_ORDER;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 32,
        background: "#f7f8fa",
        minHeight: "100vh",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 18,
          background: "#fff",
          border: "1.5px solid #e0e0e0",
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 500,
          color: "#3d5af1",
          cursor: "pointer",
        }}
      >
        ← Quay lại
      </button>
      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Chi tiết đơn hàng
      </div>
      <div
        style={{
          color: "#bfc9d8",
          fontWeight: 500,
          marginBottom: 24,
          fontSize: 15,
        }}
      >
        Đơn hàng <span style={{ color: "#222" }}>{order.id}</span>
        <span
          style={{
            background: STATUS_BG[order.status as OrderStatus],
            color: STATUS_COLOR[order.status as OrderStatus],
            borderRadius: 8,
            padding: "6px 16px",
            fontWeight: 600,
            fontSize: 15,
            marginLeft: 18,
          }}
        >
          {order.status}
        </span>
      </div>
      {/* Thông tin chung */}
      <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Thông tin khách hàng
          </div>
          <div>
            <b>Họ tên:</b> {order.customer.name}
          </div>
          <div>
            <b>Điện thoại:</b> {order.customer.phone}
          </div>
          <div>
            <b>Email:</b> {order.customer.email}
          </div>
          <div>
            <b>Địa chỉ:</b> {order.customer.address}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Thông tin đơn hàng
          </div>
          <div>
            <b>Mã đơn:</b> {order.id}
          </div>
          <div>
            <b>Ngày tạo:</b> {order.date}
          </div>
          <div>
            <b>Thanh toán:</b> {order.payment}
          </div>
          <div>
            <b>Tổng tiền:</b>{" "}
            <span style={{ color: "#d7263d", fontWeight: 700 }}>
              {order.total}
            </span>
          </div>
          <div>
            <b>Ghi chú:</b> {order.note}
          </div>
        </div>
      </div>
      {/* Danh sách sản phẩm */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 16 }}>
          Sản phẩm
        </div>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}
        >
          <thead style={{ background: "#f7f8fa" }}>
            <tr
              style={{ color: "#bfc9d8", fontWeight: 600, textAlign: "left" }}
            >
              <th style={{ padding: "10px 8px" }}>Ảnh</th>
              <th style={{ padding: "10px 8px" }}>Tên sản phẩm</th>
              <th style={{ padding: "10px 8px" }}>Số lượng</th>
              <th style={{ padding: "10px 8px" }}>Giá</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: "1.5px solid #f3f6fa" }}>
                <td style={{ padding: "10px 8px" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td style={{ padding: "10px 8px" }}>{p.name}</td>
                <td style={{ padding: "10px 8px" }}>{p.qty}</td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#d7263d",
                    fontWeight: 600,
                  }}
                >
                  {p.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Lịch sử trạng thái */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 16 }}>
          Lịch sử trạng thái
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {order.history.map((h, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  background: STATUS_BG[h.status as OrderStatus],
                  color: STATUS_COLOR[h.status as OrderStatus],
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {h.status}
              </span>
              <span style={{ color: "#888", fontSize: 15 }}>{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailPage;
