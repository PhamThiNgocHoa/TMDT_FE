import React, { useState, useEffect } from "react";
import "../page/admin/ProductPage/ProductsPage.css";

interface Product {
  id?: string;
  name: string;
  sku: string;
  category: string;
  remain: number;
  price: string;
  status: string;
  created?: string;
  img?: string;
  [key: string]: any;
}

export interface AddOrEditProductModalProps {
  mode: "add" | "edit";
  product?: Product;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

const defaultProduct: Product = {
  name: "",
  sku: "",
  category: "",
  remain: 0,
  price: "",
  status: "Bản nháp",
  img: "",
};

const statusOptions = ["Còn hàng", "Số lượng ít", "Bản nháp", "Hết hàng"];

const AddOrEditProductModal: React.FC<AddOrEditProductModalProps> = ({
  mode,
  product,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<Product>(defaultProduct);

  useEffect(() => {
    if (mode === "edit" && product) {
      setForm(product);
    } else {
      setForm(defaultProduct);
    }
  }, [mode, product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-product-modal-bg">
      <div className="add-product-modal">
        <div className="add-product-header">
          <div>
            <div className="add-product-breadcrumb">
              Trang chủ &gt; Quản lý sản phẩm &gt;{" "}
              {mode === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </div>
            <div className="add-product-title">
              {mode === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </div>
          </div>
          <div className="add-product-header-actions">
            <button className="add-btn cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button className="add-btn confirm">
              {mode === "add" ? "Thêm mới" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
        <div className="add-product-content">
          <div className="add-product-main">
            <div className="add-block">
              <div className="add-block-title">Thông tin chung</div>
              <input
                className="add-input"
                placeholder="Tên sản phẩm"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <textarea
                className="add-textarea"
                placeholder="Mô tả sản phẩm"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
              />
            </div>
            <div className="add-block">
              <div className="add-block-title">Hình ảnh sản phẩm</div>
              <div className="add-image-upload">
                <div className="add-image-dropzone">
                  <i className="fas fa-image add-image-icon"></i>
                  <div>Kéo thả ảnh vào đây, hoặc bấm vào nút "Thêm ảnh"</div>
                  <button className="add-btn image">Thêm ảnh</button>
                  {form.img && (
                    <div style={{ marginTop: 12 }}>
                      <img
                        src={form.img}
                        alt="preview"
                        style={{ width: 80, borderRadius: 8 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="add-block">
              <div className="add-block-title">Giá sản phẩm</div>
              <div className="add-row">
                <input
                  className="add-input"
                  placeholder="Giá niêm yết"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  style={{ flex: 1 }}
                />
                <select className="add-input" style={{ flex: 1 }}>
                  <option>Chọn loại giảm giá</option>
                  <option>Giảm giá cơ bản</option>
                </select>
                <input
                  className="add-input"
                  placeholder="Phần trăm giảm giá (%)"
                  style={{ flex: 1 }}
                />
              </div>
              <div className="add-row">
                <select className="add-input" style={{ flex: 1 }}>
                  <option>Chọn loại thuế</option>
                  <option>Miễn thuế</option>
                </select>
                <input
                  className="add-input"
                  placeholder="VAT (%)"
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            <div className="add-block">
              <div className="add-block-title">Kho hàng</div>
              <div className="add-row">
                <input
                  className="add-input"
                  placeholder="SKU"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  style={{ flex: 1 }}
                />
                <input
                  className="add-input"
                  placeholder="Mã vạch"
                  style={{ flex: 1 }}
                />
                <input
                  className="add-input"
                  placeholder="Số lượng"
                  name="remain"
                  value={form.remain}
                  onChange={handleChange}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
          <div className="add-product-side">
            <div className="add-block">
              <div className="add-block-title">Danh mục sản phẩm</div>
              <select
                className="add-input"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Lựa chọn danh mục</option>
                <option value="Bàn phím">Bàn phím</option>
                <option value="Chuột">Chuột</option>
                <option value="Tai nghe">Tai nghe</option>
              </select>
              <select className="add-input">
                <option>Lựa chọn thẻ</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="add-block">
              <div className="add-block-title">Trạng thái</div>
              <select
                className="add-input"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { Product };
export default AddOrEditProductModal;
