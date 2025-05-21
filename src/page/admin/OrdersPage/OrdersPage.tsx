import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_LIST = [
  { label: "Tất cả", value: "all" },
  { label: "Đang xử lý", value: "processing" },
  { label: "Đã giao", value: "shipped" },
  { label: "Đã nhận", value: "delivered" },
  { label: "Đã hủy", value: "cancelled" },
];

const STATUS_COLOR: Record<string, string> = {
  processing: "#ffb200",
  shipped: "#bfc9d8",
  delivered: "#4ad991",
  cancelled: "#ff6b6b",
  "in progress": "#ffb200",
};
const STATUS_BG: Record<string, string> = {
  processing: "#fff7e0",
  shipped: "#f3f6fa",
  delivered: "#e6f9f2",
  cancelled: "#fff0f0",
  "in progress": "#fff7e0",
};

const MOCK_ORDERS = Array.from({ length: 37 }).map((_, i) => ({
  id: `30${2012 + i}`,
  product: {
    name: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    more: 3,
  },
  date: `2023-06-${((i % 28) + 1).toString().padStart(2, "0")}`,
  customer: `Nguyễn Văn ${String.fromCharCode(65 + (i % 5))}`,
  total: `${59 + i}.000.000₫`,
  payment: `2023-06-${((i % 28) + 1).toString().padStart(2, "0")}`,
  status: ["processing", "cancelled", "shipped", "delivered"][i % 4],
}));

function FilterBar({
  search,
  setSearch,
  date,
  setDate,
}: {
  search: string;
  setSearch: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
      <input
        type="text"
        placeholder="Tìm kiếm theo mã đơn, khách hàng, sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 8,
          border: "1.5px solid #e0e0e0",
          minWidth: 260,
        }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1.5px solid #e0e0e0" }}
      />
    </div>
  );
}

function StatusTabs({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {STATUS_LIST.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setStatus(tab.value)}
          style={{
            background: status === tab.value ? "#fff" : "#f3f6fa",
            color: status === tab.value ? "#3d5af1" : "#222",
            border:
              status === tab.value
                ? "1.5px solid #3d5af1"
                : "1.5px solid #e0e0e0",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            minWidth: 110,
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
}: {
  page: number;
  setPage: (v: number | ((prev: number) => number)) => void;
  pageSize: number;
  setPageSize: (v: number | ((prev: number) => number)) => void;
  total: number;
}) {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ color: "#bfc9d8", fontSize: 14 }}>
        Hiển thị {Math.min((page - 1) * pageSize + 1, total)}-
        {Math.min(page * pageSize, total)} trên {total}
      </span>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        style={{
          borderRadius: 6,
          border: "1.5px solid #e0e0e0",
          padding: "4px 8px",
          fontSize: 15,
        }}
      >
        {[10, 20, 30, 50].map((size) => (
          <option key={size} value={size}>
            {size}/trang
          </option>
        ))}
      </select>
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        style={{
          background: "#fff",
          border: "1.5px solid #e0e0e0",
          borderRadius: "50%",
          width: 36,
          height: 36,
          color: "#3d5af1",
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
          opacity: page === 1 ? 0.5 : 1,
        }}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages })
        .slice(0, 5)
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            style={{
              background: page === i + 1 ? "#3d5af1" : "#fff",
              color: page === i + 1 ? "#fff" : "#3d5af1",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {(i + 1).toString().padStart(2, "0")}
          </button>
        ))}
      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        style={{
          background: "#fff",
          border: "1.5px solid #e0e0e0",
          borderRadius: "50%",
          width: 36,
          height: 36,
          color: "#3d5af1",
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
          opacity: page === totalPages ? 0.5 : 1,
        }}
      >
        {">"}
      </button>
    </div>
  );
}

function OrdersTable({ orders }: { orders: typeof MOCK_ORDERS }) {
  const navigate = useNavigate();

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
      <thead style={{ background: "#f7f8fa" }}>
        <tr style={{ color: "#bfc9d8", fontWeight: 600, textAlign: "left" }}>
          <th style={{ padding: "14px 12px" }}>
            <input type="checkbox" />
          </th>
          <th style={{ padding: "14px 12px" }}>Mã đơn</th>
          <th style={{ padding: "14px 12px" }}>Sản phẩm</th>
          <th style={{ padding: "14px 12px" }}>Ngày</th>
          <th style={{ padding: "14px 12px" }}>Khách hàng</th>
          <th style={{ padding: "14px 12px" }}>Tổng tiền</th>
          <th style={{ padding: "14px 12px" }}>Thanh toán</th>
          <th style={{ padding: "14px 12px" }}>Trạng thái</th>
          <th style={{ padding: "14px 12px" }}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, idx) => (
          <tr
            key={order.id}
            style={{
              borderBottom: "1.5px solid #f3f6fa",
              background: idx % 2 === 0 ? "#fff" : "#f7f8fa",
            }}
          >
            <td style={{ padding: "12px" }}>
              <input type="checkbox" />
            </td>
            <td
              style={{
                padding: "12px",
                color: "#3d5af1",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/admin/orders/${order.id}`)}
            >
              {order.id}
            </td>
            <td
              style={{
                padding: "12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <img
                src={order.product.img}
                alt="product"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  objectFit: "cover",
                  marginRight: 8,
                }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>{order.product.name}</div>
                <div style={{ color: "#bfc9d8", fontSize: 13 }}>
                  +{order.product.more} sản phẩm
                </div>
              </div>
            </td>
            <td style={{ padding: "12px" }}>
              {order.date.split("-").reverse().join("/")}
            </td>
            <td style={{ padding: "12px" }}>{order.customer}</td>
            <td style={{ padding: "12px" }}>{order.total}</td>
            <td style={{ padding: "12px" }}>
              {order.payment.split("-").reverse().join("/")}
            </td>
            <td style={{ padding: "12px" }}>
              <span
                style={{
                  background: STATUS_BG[order.status] || "#eee",
                  color: STATUS_COLOR[order.status] || "#222",
                  borderRadius: 8,
                  padding: "6px 16px",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {order.status === "processing"
                  ? "Đang xử lý"
                  : order.status === "shipped"
                  ? "Đã giao"
                  : order.status === "delivered"
                  ? "Đã nhận"
                  : order.status === "cancelled"
                  ? "Đã hủy"
                  : order.status}
              </span>
            </td>
            <td style={{ padding: "12px" }}>
              <span
                style={{
                  cursor: "pointer",
                  marginRight: 12,
                  color: "#bfc9d8",
                  fontSize: 18,
                }}
                title="Sửa"
              >
                ✏️
              </span>
              <span
                style={{ cursor: "pointer", color: "#bfc9d8", fontSize: 18 }}
                title="Xóa"
              >
                🗑️
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const OrdersPage = () => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter logic
  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      if (status !== "all" && order.status !== status) return false;
      if (
        search &&
        !(
          order.id.includes(search) ||
          order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.product.name.toLowerCase().includes(search.toLowerCase())
        )
      )
        return false;
      if (date && order.date !== date) return false;
      return true;
    });
  }, [status, search, date]);

  // Pagination logic
  const pagedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  return (
    <div
      style={{
        background: "#f7f8fa",
        minHeight: "100vh",
        padding: 32,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Đơn hàng
      </div>
      <div
        style={{
          color: "#bfc9d8",
          fontWeight: 500,
          marginBottom: 24,
          fontSize: 15,
        }}
      >
        Bảng điều khiển <span style={{ color: "#222" }}>&gt;</span>{" "}
        <span style={{ color: "#222" }}>Danh sách đơn hàng</span>
      </div>
      {/* Tabs + Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <StatusTabs status={status} setStatus={setStatus} />
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              background: "#f3f6fa",
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              fontWeight: 500,
              color: "#3d5af1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 15,
            }}
          >
            <span role="img" aria-label="export">
              ⬇️
            </span>{" "}
            Xuất Excel
          </button>
          <button
            style={{
              background: "#3d5af1",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 22px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            + Thêm đơn hàng
          </button>
        </div>
      </div>
      {/* Filters */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        date={date}
        setDate={setDate}
      />
      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          padding: 0,
          overflow: "hidden",
        }}
      >
        <OrdersTable orders={pagedOrders} />
        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            background: "#fff",
          }}
        >
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={filteredOrders.length}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
