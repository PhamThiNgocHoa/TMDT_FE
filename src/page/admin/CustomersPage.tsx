import React, { useState } from "react";
import { Header } from "../Management/postManagement/components/Header";
import styles from "../Management/postManagement/PostManagement.module.css";
import {AdminSidebar} from "../Management/AdminSidebar";
import useCustomer from "../../hooks/useCustomer";

type Customer = {
  id: string;
  name: string;
  avatar: string;
  interaction: string;
  orders: number;
  total: string;
  status: string;
  created: string;
};

const initialCustomers = [
  {
    id: "302012",
    name: "Customer 1",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 15,
    total: "₫59000",
    status: "Hoạt động",
    created: "2025-03-24",
  },
  {
    id: "302012",
    name: "Customer 2",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 0,
    total: "₫59000",
    status: "Bị khoá",
    created: "2025-03-24",
  },
  {
    id: "302012",
    name: "Customer 3",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 10,
    total: "₫59000",
    status: "Hoạt động",
    created: "2025-03-24",
  },
  {
    id: "302012",
    name: "Customer 4",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 10,
    total: "₫59000",
    status: "Hoạt động",
    created: "2025-03-24",
  },
  {
    id: "302012",
    name: "Customer 5",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 10,
    total: "₫59000",
    status: "Hoạt động",
    created: "2025-03-24",
  },
  {
    id: "302012",
    name: "Customer 6",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 10,
    total: "₫59000",
    status: "Hoạt động",
    created: "2025-03-24",
  },
  {
    id: "302012",
    name: "Customer 7",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    interaction: "Bàn phím",
    orders: 10,
    total: "₫59000",
    status: "Hoạt động",
    created: "2025-03-24",
  },
];

const tabs = ["Tất cả khách hàng", "Hoạt động", "Bị khoá"];

const CustomersPage = () => {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const {user} = useCustomer();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredCustomers = customers.filter((c) => {
    if (activeTab === 1) return c.status === "Hoạt động";
    if (activeTab === 2) return c.status === "Bị khoá";
    return true;
  });
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPage = Math.ceil(filteredCustomers.length / pageSize);

  const handleSelect = (idx: number) => {
    setSelected(
      selected.includes(idx)
        ? selected.filter((i) => i !== idx)
        : [...selected, idx]
    );
  };

  return (
    <div className={styles.postManagement}>
      <AdminSidebar user={user} />
      <div className={styles.body}>
        <Header />
        <header className={styles.adminTitle}>
          <div className={styles.title}>
            <h1 className={styles.text}>Quản lý khách hàng</h1>
            <nav className={styles.adminBreadcrumbs}>
              <a href="/admin">Trang chủ</a>
              <span>/</span>
              <span>Quản lý khách hàng</span>
            </nav>
          </div>
          <div className={styles.right2}>
            <button className={styles.adminButtonWithIcon}>
              <i className="fas fa-file-export"></i>
              <span>Xuất file khách hàng</span>
            </button>
            <button className={styles.adminButtonWithIcon2}>
              <i className="fas fa-bullhorn"></i>
              <span>Gửi thông báo khuyến mãi</span>
            </button>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.tabsFilter}>
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={activeTab === idx ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ margin: "18px 0", display: "flex", gap: 12 }}>
            <button className={styles.adminButtonWithIcon}>
              <i className="fas fa-calendar-alt"></i>
              <span>Chọn ngày</span>
            </button>
            <button className={styles.adminButtonWithIcon}>
              <i className="fas fa-filter"></i>
              <span>Bộ lọc</span>
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Khách hàng</th>
                  <th>ID</th>
                  <th>Tương tác</th>
                  <th>Đơn mua</th>
                  <th>Tiền mua</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer, idx) => (
                  <tr key={customer.id + idx}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(idx)}
                        onChange={() => handleSelect(idx)}
                      />
                    </td>
                    <td
                      className={styles.postInfo}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className={styles.thumbnail}
                      />
                      <span className={styles.postTitleText}>
                        {customer.name}
                      </span>
                    </td>
                    <td className={styles.postId}>{customer.id}</td>
                    <td>{customer.interaction}</td>
                    <td>{customer.orders}</td>
                    <td>{customer.total}</td>
                    <td>
                      <span
                        className={
                          customer.status === "Hoạt động"
                            ? `${styles.status} ${styles.published}`
                            : `${styles.status} ${styles.rejected}`
                        }
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td>{customer.created}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} title="Gửi email">
                          <i className="fas fa-envelope"></i>
                        </button>
                        <button className={styles.deleteBtn} title="Gọi điện">
                          <i className="fas fa-phone"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              Hiển thị {1 + (currentPage - 1) * pageSize}-
              {Math.min(currentPage * pageSize, filteredCustomers.length)} trên{" "}
              {filteredCustomers.length}
            </div>
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>
              {Array.from({ length: totalPage }, (_, i) => i + 1).map((i) => (
                <button
                  key={i}
                  className={
                    currentPage === i
                      ? `${styles.paginationPageButton} ${styles.active}`
                      : styles.paginationPageButton
                  }
                  onClick={() => setCurrentPage(i)}
                >
                  {String(i).padStart(2, "0")}
                </button>
              ))}
              <button
                className={styles.paginationButton}
                disabled={currentPage === totalPage}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
          {selectedCustomer && (
            <div className="add-product-modal-bg">
              <div className="add-product-modal" style={{ maxWidth: 500 }}>
                <div className="add-product-header">
                  <div>
                    <div className="add-product-breadcrumb">
                      Trang chủ &gt; Quản lý khách hàng &gt; Chi tiết khách hàng
                    </div>
                    <div className="add-product-title">Chi tiết khách hàng</div>
                  </div>
                  <div className="add-product-header-actions">
                    <button
                      className="add-btn cancel"
                      onClick={() => setSelectedCustomer(null)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
                <div
                  className="add-product-content"
                  style={{ flexDirection: "column", gap: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      marginBottom: 18,
                    }}
                  >
                    <img
                      src={selectedCustomer.avatar}
                      alt={selectedCustomer.name}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        border: "2px solid #eee",
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 20 }}>
                        {selectedCustomer.name}
                      </div>
                      <div style={{ color: "#2563eb", fontWeight: 600 }}>
                        {selectedCustomer.id}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <span
                          className={
                            selectedCustomer.status === "Hoạt động"
                              ? `${styles.status} ${styles.published}`
                              : `${styles.status} ${styles.rejected}`
                          }
                        >
                          {selectedCustomer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <b>Tương tác:</b> {selectedCustomer.interaction}
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <b>Đơn mua:</b> {selectedCustomer.orders}
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <b>Tiền mua:</b> {selectedCustomer.total}
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <b>Ngày tạo:</b> {selectedCustomer.created}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
