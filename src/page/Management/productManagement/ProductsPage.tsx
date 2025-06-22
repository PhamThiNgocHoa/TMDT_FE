import React, { useEffect, useState } from "react";
import "./ProductsPage.css";
import AddOrEditProductModal from "../../../component/AddOrEditProductModal";
import type { AddOrEditProductModalProps, Product } from "../../../component/AddOrEditProductModal";
import { AdminSidebar } from "../AdminSidebar";
import useProduct from "../../../hooks/useProduct";
import { ProductResponse } from "../../../models/response/ProductResponse";
import { addProduct as apiAddProduct } from "../../../server/api/product/product.post";
import { updateProduct as apiUpdateProduct } from "../../../server/api/product/product.put";
import { deleteProduct as apiDeleteProduct } from "../../../server/api/product/product.delete";
import { getListCategory } from '../../../server/api/category/category.get';
import { CategoryResponseDTO } from '../../../models/response/CategoryResponseDTO';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const tabs = [
  "Tất cả sản phẩm",
  "Còn hàng",
  "Hot",
  "Nổi bật",
  "Sản phẩm mới",
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

// Hardcode map category name <-> id (bạn nên lấy từ API thực tế)
const categoryMap: Record<string, number> = {
  "Bàn phím": 1,
  "Chuột": 2,
  "Tai nghe": 3,
};
const categoryIdToName = (id?: number) => {
  if (!id) return "";
  return Object.keys(categoryMap).find((k) => categoryMap[k] === id) || "";
};
const getCategoryIdByName = (name: string) => categoryMap[name] || 0;

// Mapping ProductResponse (API) -> Product (modal)
function mapProductResponseToModal(product: ProductResponse): Product {
  return {
    id: product.id?.toString(),
    name: product.name,
    img: product.img || (product.productImages && product.productImages[0]?.url) || "",
    price: product.price?.toString() || "",
    originalPrice: product.originalPrice?.toString() || "",
    discount: String(product.discount ?? ''),
    description: product.description || "",
    categoryId: product.categoryId ?? 0,
    type: product.type || "",
    inStock: !!product.inStock,
    productNew: !!product.productNew,
    hot: !!product.hot,
    featured: !!product.featured,
    productColors: product.productColors?.map(c => ({ color: c.color })) || [],
    productSizes: product.productSizes?.map(s => ({ size: s.size })) || [],
    productImages: product.productImages?.map(i => ({ url: i.url, alt: '' })) || [],
    productSpecifications: product.productSpecifications?.map(s => ({
      specificationName: s.specificationName,
      value: s.value
    })) || [],
  };
}
// Mapping Product (modal) -> ProductRequestDTO (API)
function mapModalToProductRequest(product: Product): any {
  // Tạo alt mặc định cho ảnh phụ nếu chưa có
  const productImages = Array.isArray(product.productImages)
    ? product.productImages
        .filter(i => !!i.url)
        .map((i, idx) => ({
          url: i.url,
          alt: `${product.name} - ảnh ${idx + 1}`
        }))
    : [];

  return {
    name: product.name,
    img: product.img,
    price: Number(product.price) || 0,
    originalPrice: Number(product.originalPrice) || 0,
    discount: product.discount || "",
    description: product.description || "",
    categoryId: Number(product.categoryId) || 0,
    type: product.type || "",
    inStock: !!product.inStock,
    productNew: !!product.productNew,
    hot: !!product.hot,
    featured: !!product.featured,
    productColors: Array.isArray(product.productColors) ? product.productColors.filter(c => c.color && c.color.trim()).map(c => ({ color: c.color })) : [],
    productSizes: Array.isArray(product.productSizes) ? product.productSizes.filter(s => s.size && s.size.trim()).map(s => ({ size: s.size })) : [],
    productImages,
    productSpecifications: Array.isArray(product.productSpecifications)
      ? product.productSpecifications
          .filter(s => s.specificationName && s.value)
          .map(s => ({ specificationName: s.specificationName, value: s.value }))
      : [],
  };
}

const ProductsPage = () => {
  const {
    products,
    setProducts,
    loading,
    error,
  } = useProduct();
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<number[]>([0, 3, 4]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
  const [deleteProduct, setDeleteProduct] = useState<ProductResponse | null>(null);
  const [search, setSearch] = useState("");
  const pageSize = 10;
  const navigate = useNavigate();

  // Fetch categories on mount
  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await getListCategory();
      // Map về đúng type CategoryResponseDTO
      const mapped = data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        img: cat.img,
        active: !!cat.active,
        description: cat.description,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      }));
      setCategories(mapped);
    };
    fetchCategories();
  }, []);

  // Tab filter logic: only use ProductResponse fields
  const filteredProducts = products.filter((p) => {
    if (activeTab === 1 && !p.inStock) return false; // Còn hàng
    if (activeTab === 2 && !p.hot) return false; // Hot
    if (activeTab === 3 && !p.featured) return false; // Nổi bật
    if (activeTab === 4 && !p.productNew) return false; // Sản phẩm mới
    if (selectedDate) return false; // Không có trường ngày tạo
    if (categoryFilter && p.categoryName !== categoryFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Tính lại số trang dựa trên filteredProducts
  const totalPage = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  // Tính chỉ số bắt đầu và kết thúc cho trang hiện tại
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  // Reset currentPage về 1 khi filter thay đổi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, activeTab]);

  // Add product
  const handleAddProduct = async (product: Product) => {
    try {
      const newProduct: ProductResponse = await apiAddProduct(mapModalToProductRequest(product));
      setProducts((prev: ProductResponse[]): ProductResponse[] => [newProduct, ...prev]);
      setShowAddModal(false);
      await Swal.fire({
        icon: 'success',
        title: 'Thêm sản phẩm thành công!',
        timer: 1200,
        showConfirmButton: false
      });
      navigate("/management/product");
    } catch (e) {
      alert("Thêm sản phẩm thất bại");
    }
  };

  // Edit product
  const handleEditProduct = async (product: Product) => {
    try {
      const updated: ProductResponse = await apiUpdateProduct(Number(product.id), mapModalToProductRequest(product));
      setProducts((prev: ProductResponse[]): ProductResponse[] => prev.map((p) => (p.id === updated.id ? updated : p)));
      setShowEditModal(false);
      await Swal.fire({
        icon: 'success',
        title: 'Cập nhật sản phẩm thành công!',
        timer: 1200,
        showConfirmButton: false
      });
      navigate("/management/product");
    } catch (e) {
      alert("Cập nhật sản phẩm thất bại");
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    if (deleteProduct) {
      try {
        await apiDeleteProduct(deleteProduct.id);
        setProducts((prev: ProductResponse[]): ProductResponse[] => prev.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
      } catch (e) {
        alert("Xoá sản phẩm thất bại");
      }
    }
  };

  const handleSelect = (idx: number) => {
    setSelected(
      selected.includes(idx)
        ? selected.filter((i) => i !== idx)
        : [...selected, idx]
    );
  };

  return (
    <div className="postManagement">
      <AdminSidebar />
      <div className="body" style={{ marginLeft: '17.5rem', padding: '0 1.5rem 1.5rem 1.5rem', minHeight: '100vh', background: '#f7f8fa' }}>
        <header className="products-header-row" style={{marginBottom: 20, maxWidth: 950, marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 60}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8, flex: 1}}>
            <div className="products-header-title" style={{fontSize: 24, fontWeight: 700, color: '#222'}}>Quản lý sản phẩm</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 4}}>
              <div style={{position: 'relative', width: 320, maxWidth: '100%'}}>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  style={{
                    width: '100%',
                    maxWidth: 350,
                    padding: '10px 38px 10px 14px',
                    borderRadius: 8,
                    border: '1.5px solid #e4e7ec',
                    fontSize: 16,
                    background: '#fff',
                    color: '#222',
                    outline: 'none',
                    boxShadow: '0 1px 4px #0001',
                    transition: 'border 0.2s',
                  }}
                />
                <i className="fas fa-search" style={{position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#b0b0b0', fontSize: 18}}></i>
              </div>
            </div>
          </div>
          <div className="products-header-actions" style={{marginLeft: 24}}>
          <button className="products-btn purple">Xuất file</button>
          <button
            className="products-btn blue"
            onClick={() => setShowAddModal(true)}
          >
            + Thêm sản phẩm
          </button>
        </div>
        </header>
        {loading && <div>Đang tải sản phẩm...</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
        <nav className="products-breadcrumb" style={{marginBottom: 16, maxWidth: 950, marginLeft: 'auto', marginRight: 'auto', minHeight: 28}}>
          <a href="/admin" style={{color: '#2563eb', textDecoration: 'none'}}>Trang chủ</a>
          <span style={{margin: '0 8px'}}>/</span>
          <span>Quản lý sản phẩm</span>
        </nav>
        <div className="products-tabs-row" style={{maxWidth: 950, marginLeft: 'auto', marginRight: 'auto', marginBottom: 14}}>
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
        <div className="products-filter-row" style={{maxWidth: 950, marginLeft: 'auto', marginRight: 'auto', marginBottom: 18}}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="products-btn light"
          style={{ width: 160 }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="products-btn light"
        >
          <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
        </select>
        <button className="products-btn light">
          <i className="fas fa-sliders-h"></i> Bộ lọc
        </button>
      </div>
      <div className="products-table-wrap">
        <table className="products-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá gốc</th>
              <th>Giá tiền</th>
              <th>Giảm giá</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
              {paginatedProducts.map((product: ProductResponse, idx: number) => (
              <tr key={`${product.id ?? idx}-${idx}`}>
                <td>
                  <input
                    type="checkbox"
                      checked={!!product.inStock}
                      onChange={async (e) => {
                        const newInStock = e.target.checked;
                        try {
                          await apiUpdateProduct(product.id, { ...product, inStock: newInStock });
                          setProducts((prev: ProductResponse[]) => prev.map((p) => p.id === product.id ? { ...p, inStock: newInStock } : p));
                        } catch (err) {
                          alert("Cập nhật trạng thái thất bại");
                        }
                      }}
                      title={product.inStock ? "Đánh dấu hết hàng" : "Đánh dấu còn hàng"}
                  />
                </td>
                <td className="product-info-cell">
                  <img
                      src={product.img || (product.productImages && product.productImages[0]?.url) || ''}
                    alt={product.name}
                    className="product-img"
                  />
                  {product.name}
                </td>
                  <td>{product.categoryName}</td>
                  <td>{product.originalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>{product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>{product.discount || '-'}</td>
                  <td>
                    <span className={`product-badge ${statusClass[product.inStock ? 'Còn hàng' : 'Hết hàng'] || ''}`}>
                      {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </td>
                <td>
                    <div className="actions">
                  <button
                        className="editBtn"
                    title="Sửa"
                    onClick={() => {
                          const modalProduct = mapProductResponseToModal(product);
                          setEditingProduct(modalProduct);
                      setShowEditModal(true);
                    }}
                  >
                        <i className="fas fa-edit"></i>
                  </button>
                      <button className="viewBtn" title="Xem">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                        className="deleteBtn"
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
      <div className="products-pagination">
          <div className="products-pagination-info">
            Showing {filteredProducts.length === 0 ? 0 : startIdx + 1}-{Math.min(endIdx, filteredProducts.length)} from {filteredProducts.length}
          </div>
        <div className="products-pagination-pages">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((i) => (
            <button
              key={i}
              className={currentPage === i ? "active" : ""}
              onClick={() => setCurrentPage(i)}
            >
              {String(i).padStart(2, "0")}
            </button>
          ))}
          <button
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
            categories={categories}
        />
      )}
      {showEditModal && editingProduct && (
        <AddOrEditProductModal
          mode="edit"
            product={editingProduct || undefined}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditProduct}
            categories={categories}
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
              <button className="add-btn confirm" onClick={handleDeleteProduct}>
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductsPage;
