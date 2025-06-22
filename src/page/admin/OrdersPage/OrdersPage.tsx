import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Management/postManagement/PostManagement.module.css";
import { AdminSidebar } from "../../Management/postManagement/AdminSidebar";
import { Header } from "../../Management/postManagement/components/Header";
import { FaEye } from "react-icons/fa";

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
    <div className={styles.tabsFilter}>
      {STATUS_LIST.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setStatus(tab.value)}
          className={status === tab.value ? styles.tabActive : styles.tab}
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
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        Hiển thị {Math.min((page - 1) * pageSize + 1, total)}-
        {Math.min(page * pageSize, total)} trên {total}
      </div>
      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages })
          .slice(0, 5)
          .map((_, i) => (
            <button
              key={i + 1}
              className={
                page === i + 1
                  ? `${styles.paginationPageButton} ${styles.active}`
                  : styles.paginationPageButton
              }
              onClick={() => setPage(i + 1)}
            >
              {(i + 1).toString().padStart(2, "0")}
            </button>
          ))}
        <button
          className={styles.paginationButton}
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

function OrderDetailModal({
  open,
  order,
  onClose,
}: {
  open: boolean;
  order: any;
  onClose: () => void;
}) {
  if (!open || !order) return null;
  return (
    <div className="add-product-modal-bg">
      <div
        className="add-product-modal"
        style={{
          maxWidth: 1100,
          minWidth: 400,
          background: "#f7f8fa",
          borderRadius: 16,
          padding: 0,
        }}
      >
        <div
          style={{
            padding: 32,
            borderBottom: "1.5px solid #f0f0f0",
            background: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700 }}>
              Chi tiết đơn hàng
            </div>
            <div>
              <button className="add-btn cancel" onClick={onClose}>
                Đóng
              </button>
            </div>
          </div>
          <div
            style={{
              color: "#bfc9d8",
              fontWeight: 500,
              marginTop: 8,
              fontSize: 15,
            }}
          >
            Trang chủ / Quản lý đơn hàng / Chi tiết đơn hàng
          </div>
        </div>
        <div
          style={{ display: "flex", gap: 24, padding: 32, flexWrap: "wrap" }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 260,
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              Đơn hàng #{order.id}{" "}
              <span
                style={{
                  background: "#fff7e0",
                  color: "#ffb200",
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontWeight: 600,
                  fontSize: 14,
                  marginLeft: 8,
                }}
              >
                Đang xử lý
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <i className="fas fa-calendar-alt"></i> <span>Ngày tạo:</span>{" "}
              <b style={{ marginLeft: 4 }}>{order.date}</b>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <i className="fas fa-credit-card"></i>{" "}
              <span>Phương thức thanh toán:</span>{" "}
              <b style={{ marginLeft: 4 }}>Chuyển khoản</b>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <i className="fas fa-shipping-fast"></i> <span>Vận chuyển:</span>{" "}
              <b style={{ marginLeft: 4 }}>Giao hàng tiêu chuẩn</b>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 260,
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Khách hàng</div>
            <div>
              <b>Họ tên:</b> {order.customer}
            </div>
            <div>
              <b>Email:</b> khachhang@email.com
            </div>
            <div>
              <b>Số điện thoại:</b> 0909 999 999
            </div>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 260,
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Tài liệu</div>
            <div>
              <b>Hoá đơn:</b> INV-32011
            </div>
            <div>
              <b>Vận chuyển:</b> SHP-2011REG
            </div>
            <div>
              <b>Điểm thưởng:</b> 480 điểm
            </div>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 260,
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Địa chỉ</div>
            <div>
              <b>Địa chỉ thanh toán:</b> 1833 Bel Meadow Drive, Fontana,
              California 92335, USA
            </div>
            <div>
              <b>Địa chỉ giao hàng:</b> 1833 Bel Meadow Drive, Fontana,
              California 92335, USA
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            margin: "0 32px 32px 32px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 17,
              marginBottom: 0,
              padding: "24px 24px 0 24px",
            }}
          >
            Danh sách sản phẩm{" "}
            <span
              style={{
                background: "#e6f9f2",
                color: "#4ad991",
                borderRadius: 8,
                padding: "2px 10px",
                fontWeight: 600,
                fontSize: 14,
                marginLeft: 8,
              }}
            >
              +2 sản phẩm
            </span>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 15,
              marginTop: 12,
            }}
          >
            <thead style={{ background: "#f7f8fa" }}>
              <tr
                style={{ color: "#bfc9d8", fontWeight: 600, textAlign: "left" }}
              >
                <th style={{ padding: "10px 8px" }}>Sản phẩm</th>
                <th style={{ padding: "10px 8px" }}>SKU</th>
                <th style={{ padding: "10px 8px" }}>Số lượng</th>
                <th style={{ padding: "10px 8px" }}>Giá</th>
                <th style={{ padding: "10px 8px" }}>Tổng</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1.5px solid #f3f6fa" }}>
                <td
                  style={{
                    padding: "10px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: "#eee",
                      borderRadius: 8,
                    }}
                  ></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Logic+ Wireless Mouse</div>
                    <div style={{ color: "#bfc9d8", fontSize: 13 }}>Đen</div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#2563eb",
                    fontWeight: 600,
                  }}
                >
                  302011
                </td>
                <td style={{ padding: "10px 8px" }}>1 pcs</td>
                <td style={{ padding: "10px 8px" }}>$121.00</td>
                <td style={{ padding: "10px 8px" }}>$121.00</td>
              </tr>
              <tr style={{ borderBottom: "1.5px solid #f3f6fa" }}>
                <td
                  style={{
                    padding: "10px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: "#eee",
                      borderRadius: 8,
                    }}
                  ></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Smartwatch E2</div>
                    <div style={{ color: "#bfc9d8", fontSize: 13 }}>Đen</div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#2563eb",
                    fontWeight: 600,
                  }}
                >
                  302011
                </td>
                <td style={{ padding: "10px 8px" }}>1 pcs</td>
                <td style={{ padding: "10px 8px" }}>$590.00</td>
                <td style={{ padding: "10px 8px" }}>$590.00</td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              padding: "0 24px 24px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <div>
              Thành tiền: <b>$711.00</b>
            </div>
            <div>
              VAT(0)%: <b>$0.00</b>
            </div>
            <div>
              Phí vận chuyển: <b>$20.00</b>
            </div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>
              Tổng cộng: <span style={{ color: "#2563eb" }}>$731.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersTable({
  orders,
  onView,
}: {
  orders: typeof MOCK_ORDERS;
  onView: (order: any) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Mã đơn</th>
            <th>Sản phẩm</th>
            <th>Ngày</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td
                className={styles.postId}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
                {order.id}
              </td>
              <td className={styles.postInfo}>
                <img
                  src={order.product.img}
                  alt="product"
                  className={styles.thumbnail}
                />
                <div>
                  <div className={styles.postTitleText}>
                    {order.product.name}
                  </div>
                  <div style={{ color: "#bfc9d8", fontSize: 13 }}>
                    +{order.product.more} sản phẩm
                  </div>
                </div>
              </td>
              <td>{order.date.split("-").reverse().join("/")}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>{order.payment.split("-").reverse().join("/")}</td>
              <td>
                <span
                  className={
                    order.status === "processing"
                      ? `${styles.status} ${styles.pending}`
                      : order.status === "shipped"
                      ? `${styles.status} ${styles.draft}`
                      : order.status === "delivered"
                      ? `${styles.status} ${styles.published}`
                      : `${styles.status} ${styles.rejected}`
                  }
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
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.viewBtn}
                    title="Xem"
                    onClick={() => onView(order)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const OrdersPage = () => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
    <div className={styles.postManagement}>
      <AdminSidebar />
      <div className={styles.body}>
        <Header />
        <header className={styles.adminTitle}>
          <div className={styles.title}>
            <h1 className={styles.text}>Quản lý đơn hàng</h1>
            <nav className={styles.adminBreadcrumbs}>
              <a href="/admin">Trang chủ</a>
              <span>/</span>
              <span>Quản lý đơn hàng</span>
            </nav>
          </div>
          <div className={styles.right2}>
            <button className={styles.adminButtonWithIcon}>
              <i className="fas fa-file-export"></i>
              <span>Xuất file đơn hàng</span>
            </button>
            <button className={styles.adminButtonWithIcon2}>
              <i className="fas fa-bullhorn"></i>
              <span>Gửi thông báo</span>
            </button>
          </div>
        </header>
        <div className={styles.content}>
          <StatusTabs status={status} setStatus={setStatus} />
          <div style={{ margin: "18px 0" }}>
            <FilterBar
              search={search}
              setSearch={setSearch}
              date={date}
              setDate={setDate}
            />
          </div>
          <OrdersTable
            orders={pagedOrders}
            onView={(order) => {
              setSelectedOrder(order);
              setShowDetail(true);
            }}
          />
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={filteredOrders.length}
          />
          <OrderDetailModal
            open={showDetail}
            order={selectedOrder}
            onClose={() => setShowDetail(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
