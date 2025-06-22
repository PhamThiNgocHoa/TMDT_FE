import React, { useState } from "react";
import "./ProductsPage.css";
import AddOrEditProductModal, {
  Product,
  AddOrEditProductModalProps,
} from "../../../component/AddOrEditProductModal";
import { Header } from "../../Management/postManagement/components/Header";
import styles from "../../Management/postManagement/PostManagement.module.css";
import useCustomer from "../../../hooks/useCustomer";
import {AdminSidebar} from "../../Management/AdminSidebar";

const initialProducts = [
  {
    id: "302012",
    name: "Bàn phím cơ Weikav D75",
    sku: "302012",
    category: "Bàn phím",
    remain: 15,
    price: "₫59000",
    status: "Bản nháp",
    created: "24/3/2025",
    img: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "302012",
    name: "Bàn phím cơ Weikav D75",
    sku: "302012",
    category: "Bàn phím",
    remain: 0,
    price: "₫59000",
    status: "Hết hàng",
    created: "24/3/2025",
    img: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "302012",
    name: "Bàn phím cơ Weikav D75",
    sku: "302012",
    category: "Bàn phím",
    remain: 2,
    price: "₫59000",
    status: "Số lượng ít",
    created: "24/3/2025",
    img: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "302012",
    name: "Bàn phím cơ Weikav D75",
    sku: "302012",
    category: "Bàn phím",
    remain: 10,
    price: "₫59000",
    status: "Còn hàng",
    created: "24/3/2025",
    img: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "302012",
    name: "Bàn phím cơ Weikav D75",
    sku: "302012",
    category: "Bàn phím",
    remain: 10,
    price: "₫59000",
    status: "Còn hàng",
    created: "24/3/2025",
    img: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "302012",
    name: "Bàn phím cơ Weikav D75",
    sku: "302012",
    category: "Bàn phím",
    remain: 10,
    price: "₫59000",
    status: "Còn hàng",
    created: "24/3/2025",
    img: "https://i.imgur.com/1Q9Z1Zm.png",
  },
];

const tabs = [
  "Tất cả sản phẩm",
  "Còn hàng",
  "Số lượng ít",
  "Bản nháp",
  "Hết hàng",
];

const statusClass: Record<string, string> = {
  "Bản nháp": "draft",
  "Hết hàng": "out",
  "Số lượng ít": "low",
  "Còn hàng": "in",
};

const tabStatusMap = [
  null, // Tất cả sản phẩm
  "Còn hàng", // Còn hàng
  "Số lượng ít", // Số lượng ít
  "Bản nháp", // Bản nháp
  "Hết hàng", // Hết hàng
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState(0);
  const {user} = useCustomer();
  const [selected, setSelected] = useState([0, 3, 4]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const pageSize = 10;
  const totalPage = 5;

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [
      {
        ...product,
        id: Date.now().toString(),
        created: new Date().toLocaleDateString("en-CA"),
      },
      ...prev,
    ]);
  };

  const handleEditProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, ...product } : p))
    );
  };

  const handleDeleteProduct = () => {
    if (deleteProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    }
  };

  const handleSelect = (idx: number) => {
    setSelected(
      selected.includes(idx)
        ? selected.filter((i) => i !== idx)
        : [...selected, idx]
    );
  };

  const filteredProducts = products.filter((p) => {
    if (activeTab !== 0 && p.status !== tabStatusMap[activeTab]) return false;
    if (selectedDate && p.created !== selectedDate) return false;
    if (categoryFilter && p.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className={styles.postManagement}>
      <AdminSidebar user={user} />
      <div className={styles.body}>
        <Header />
        <header className={styles.adminTitle}>
          <div className={styles.title}>
            <h1 className={styles.text}>Quản lý sản phẩm</h1>
            <nav className={styles.adminBreadcrumbs}>
              <a href="/admin">Trang chủ</a>
              <span>/</span>
              <span>Quản lý sản phẩm</span>
            </nav>
          </div>
          <div className={styles.right2}>
            <button className={styles.adminButtonWithIcon}>Xuất file</button>
            <button
              className={styles.adminButtonWithIcon2}
              onClick={() => setShowAddModal(true)}
            >
              + Thêm sản phẩm
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
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles.adminButtonWithIcon}
              style={{ width: 160 }}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.adminButtonWithIcon}
            >
              <option value="">Tất cả danh mục</option>
              <option value="Bàn phím">Bàn phím</option>
              <option value="Chuột">Chuột</option>
              <option value="Tai nghe">Tai nghe</option>
            </select>
            <button className={styles.adminButtonWithIcon}>
              <i className="fas fa-sliders-h"></i> Bộ lọc
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Sản phẩm</th>
                  <th>SKU</th>
                  <th>Danh mục</th>
                  <th>Còn lại</th>
                  <th>Giá tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, idx) => (
                  <tr key={`${product.id ?? idx}-${idx}`}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(idx)}
                        onChange={() => handleSelect(idx)}
                      />
                    </td>
                    <td className={styles.postInfo}>
                      <img
                        src={product.img}
                        alt={product.name}
                        className={styles.thumbnail}
                      />
                      <span className={styles.postTitleText}>
                        {product.name}
                      </span>
                    </td>
                    <td className={styles.postId}>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>{product.remain}</td>
                    <td>{product.price}</td>
                    <td>
                      <span
                        className={
                          product.status === "Còn hàng"
                            ? `${styles.status} ${styles.published}`
                            : product.status === "Số lượng ít"
                            ? `${styles.status} ${styles.pending}`
                            : product.status === "Bản nháp"
                            ? `${styles.status} ${styles.draft}`
                            : `${styles.status} ${styles.rejected}`
                        }
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>{product.created}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editBtn}
                          title="Sửa"
                          onClick={() => {
                            setEditingProduct(product);
                            setShowEditModal(true);
                          }}
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className={styles.viewBtn} title="Xem">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className={styles.deleteBtn}
                          title="Xoá"
                          onClick={() => setDeleteProduct(product)}
                        >
                          <i className="fas fa-trash"></i>
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
              {Math.min(currentPage * pageSize, filteredProducts.length)} trên{" "}
              {filteredProducts.length}
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
          {showAddModal && (
            <AddOrEditProductModal
              mode="add"
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddProduct}
            />
          )}
          {showEditModal && editingProduct && (
            <AddOrEditProductModal
              mode="edit"
              product={editingProduct}
              onClose={() => setShowEditModal(false)}
              onSubmit={handleEditProduct}
            />
          )}
          {deleteProduct && (
            <div className="modal-bg">
              <div className="modal">
                <p>
                  Bạn có chắc muốn xoá sản phẩm <b>{deleteProduct.name}</b>?
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <button
                    className="add-btn cancel"
                    onClick={() => setDeleteProduct(null)}
                  >
                    Huỷ
                  </button>
                  <button
                    className="add-btn confirm"
                    onClick={handleDeleteProduct}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
