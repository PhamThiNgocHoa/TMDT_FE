import React, { useState, useEffect } from "react";
import { uploadImage } from '../server/api/imageUpload/image.post';

export interface Product {
  id?: string;
  name: string;
  img?: string;
  price: string;
  originalPrice: string;
  discount?: string;
  description?: string;
  categoryId: number;
  type?: string;
  inStock: boolean;
  productNew: boolean;
  hot: boolean;
  featured: boolean;
  productColors: { color: string }[];
  productSizes: { size: string }[];
  productImages: { url: string }[];
  productSpecifications: { specificationName: string; value: string }[];
}

export interface AddOrEditProductModalProps {
  mode: "add" | "edit";
  product?: Product;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  categories?: { id: number; name: string }[];
}

const defaultProduct: Product = {
  name: "",
  img: "",
  price: "",
  originalPrice: "",
  discount: "",
  description: "",
  categoryId: 0,
  type: "",
  inStock: true,
  productNew: false,
  hot: false,
  featured: false,
  productColors: [],
  productSizes: [],
  productImages: [],
  productSpecifications: [],
};

const AddOrEditProductModal: React.FC<AddOrEditProductModalProps> = ({
  mode,
  product,
  onClose,
  onSubmit,
  categories,
}) => {
  const [form, setForm] = useState<Product>(defaultProduct);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && product) {
      setForm({ ...defaultProduct, ...product });
    } else {
      setForm(defaultProduct);
    }
  }, [mode, product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;
    if (type === 'checkbox' && 'checked' in e.target) {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, img: res.url || res.data?.url || '' }));
    } catch (err) {
      alert('Lỗi khi tải lên hình ảnh!');
    } finally {
      setUploading(false);
    }
  };

  // Dynamic fields handlers
  const handleAddField = (field: keyof Product, value: any) => {
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] as any[]), value] }));
  };
  const handleRemoveField = (field: keyof Product, idx: number) => {
    setForm((prev) => ({ ...prev, [field]: (prev[field] as any[]).filter((_: any, i: number) => i !== idx) }));
  };
  const handleFieldChange = (field: keyof Product, idx: number, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item: any, i: number) => i === idx ? { ...item, [key]: value } : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: form.price ? String(form.price) : "0",
      originalPrice: form.originalPrice ? String(form.originalPrice) : "0",
      inStock: !!form.inStock,
      productNew: !!form.productNew,
      hot: !!form.hot,
      featured: !!form.featured,
    });
  };

  return (
    <div className="add-product-modal-bg" style={{ zIndex: 1000, position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form className="add-product-modal" style={{ width: 700, background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0002', padding: 0, maxWidth: '98vw', maxHeight: '98vh', overflow: 'auto' }} onSubmit={handleSubmit}>
        <div className="add-product-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px 12px 32px', borderBottom: '1.5px solid #f0f0f0' }}>
          <div>
            <div className="add-product-breadcrumb" style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>
              Trang chủ &gt; Quản lý sản phẩm &gt; {mode === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </div>
            <div className="add-product-title" style={{ fontSize: 26, fontWeight: 700, color: '#222' }}>
              {mode === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </div>
          </div>
          <div className="add-product-header-actions" style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="add-btn cancel" style={{ padding: '8px 20px', fontSize: 16, borderRadius: 8, background: '#f3f4f6', color: '#222', border: 'none', fontWeight: 500 }} onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="add-btn confirm" style={{ padding: '8px 24px', fontSize: 16, borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600 }}>
              {mode === "add" ? "Thêm mới" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
        <div className="add-product-content" style={{ display: 'flex', gap: 32, padding: 32, minHeight: 420 }}>
          <div className="add-product-main" style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Thông tin chung</div>
              <input className="add-input" placeholder="Tên sản phẩm" name="name" value={form.name} onChange={handleChange} style={{ fontSize: 16, padding: '10px 14px', width: '100%', marginBottom: 10, borderRadius: 8, border: '1.5px solid #e4e7ec' }} />
              <textarea className="add-textarea" placeholder="Mô tả sản phẩm" name="description" value={form.description || ""} onChange={handleChange} style={{ fontSize: 16, padding: '10px 14px', width: '100%', minHeight: 80, borderRadius: 8, border: '1.5px solid #e4e7ec' }} />
            </div>
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Hình ảnh sản phẩm</div>
              <div className="add-image-upload">
                <div className="add-image-dropzone" style={{ border: '1.5px dashed #b0b0b0', borderRadius: 10, padding: 18, textAlign: 'center', background: '#fafbfc' }}>
                  <i className="fas fa-image add-image-icon" style={{ fontSize: 32, color: '#b0b0b0', marginBottom: 8 }}></i>
                  <div style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>Kéo thả ảnh vào đây, hoặc bấm vào nút "Thêm ảnh"</div>
                  <label className="add-btn image" style={{ padding: '6px 18px', fontSize: 15, borderRadius: 7, background: '#f3f4f6', color: '#222', border: 'none', fontWeight: 500, cursor: 'pointer', display: 'inline-block' }}>
                    {uploading ? 'Đang tải...' : 'Thêm ảnh'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                  </label>
                  {form.img && (
                    <div style={{ marginTop: 12 }}>
                      <img src={form.img} alt="preview" style={{ width: 100, borderRadius: 8 }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Giá sản phẩm</div>
              <div className="add-row" style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                <input className="add-input" placeholder="Giá bán (price)" name="price" type="number" value={form.price} onChange={handleChange} style={{ flex: 1, fontSize: 16, padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e4e7ec' }} />
                <input className="add-input" placeholder="Giá gốc (originalPrice)" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} style={{ flex: 1, fontSize: 16, padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e4e7ec' }} />
                <input className="add-input" placeholder="Giảm giá (discount)" name="discount" value={form.discount || ""} onChange={handleChange} style={{ flex: 1, fontSize: 16, padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e4e7ec' }} />
              </div>
            </div>
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Loại sản phẩm & Tùy chọn</div>
              <input className="add-input" placeholder="Loại sản phẩm (type)" name="type" value={form.type} onChange={handleChange} style={{ fontSize: 16, padding: '10px 14px', width: '100%', marginBottom: 10, borderRadius: 8, border: '1.5px solid #e4e7ec' }} />
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <label><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} /> Còn hàng</label>
                <label><input type="checkbox" name="productNew" checked={form.productNew} onChange={handleChange} /> Sản phẩm mới</label>
                <label><input type="checkbox" name="hot" checked={form.hot} onChange={handleChange} /> Hot</label>
                <label><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Nổi bật</label>
              </div>
            </div>
            {/* Dynamic fields: Colors */}
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Màu sắc</div>
              {form.productColors.length === 0 && <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Chưa có màu nào</div>}
              {form.productColors.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <input className="add-input" placeholder="Nhập màu sắc (ví dụ: Đỏ, Xanh...)" value={item.color} onChange={e => handleFieldChange('productColors', idx, 'color', e.target.value)} style={{ flex: 1, minWidth: 0 }} />
                  <button type="button" onClick={() => handleRemoveField('productColors', idx)} style={{ color: 'red', border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', padding: 0, width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Xóa màu">
                    <span aria-hidden>×</span>
                  </button>
                </div>
              ))}
              <button type="button" className="add-btn" style={{ marginTop: 4, background: '#e0e7ff', color: '#222', borderRadius: 8, fontWeight: 500 }} onClick={() => handleAddField('productColors', { color: '' })}>+ Thêm màu</button>
            </div>
            {/* Dynamic fields: Sizes */}
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Kích thước</div>
              {form.productSizes.length === 0 && <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Chưa có kích thước nào</div>}
              {form.productSizes.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <input className="add-input" placeholder="Nhập kích thước (ví dụ: S, M, L, XL...)" value={item.size} onChange={e => handleFieldChange('productSizes', idx, 'size', e.target.value)} style={{ flex: 1, minWidth: 0 }} />
                  <button type="button" onClick={() => handleRemoveField('productSizes', idx)} style={{ color: 'red', border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', padding: 0, width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Xóa size">
                    <span aria-hidden>×</span>
                  </button>
                </div>
              ))}
              <button type="button" className="add-btn" style={{ marginTop: 4, background: '#e0e7ff', color: '#222', borderRadius: 8, fontWeight: 500 }} onClick={() => handleAddField('productSizes', { size: '' })}>+ Thêm size</button>
            </div>
            {/* Dynamic fields: Ảnh phụ */}
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Ảnh phụ</div>
              {form.productImages.length === 0 && <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Chưa có ảnh phụ nào</div>}
              {form.productImages.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <input
                    type="file"
                    accept="image/*"
                    style={{ flex: 2, minWidth: 0 }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      try {
                        const res = await uploadImage(file);
                        handleFieldChange('productImages', idx, 'url', res.url || res.data?.url || '');
                      } catch (err) {
                        alert('Lỗi khi tải lên ảnh phụ!');
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                  {item.url && (
                    <img src={item.url} alt="preview" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
                  )}
                  <button type="button" onClick={() => handleRemoveField('productImages', idx)} style={{ color: 'red', border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', padding: 0, width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Xóa ảnh">
                    <span aria-hidden>×</span>
                  </button>
              </div>
              ))}
              <button type="button" className="add-btn" style={{ marginTop: 4, background: '#e0e7ff', color: '#222', borderRadius: 8, fontWeight: 500 }} onClick={() => handleAddField('productImages', { url: '', alt: form.name || 'Ảnh phụ' })}>+ Thêm ảnh phụ</button>
            </div>
            {/* Dynamic fields: Thông số kỹ thuật */}
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Thông số kỹ thuật</div>
              {form.productSpecifications.length === 0 && <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Chưa có thông số nào</div>}
              {form.productSpecifications.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <input className="add-input" placeholder="Tên thông số (ví dụ: CPU, RAM...)" value={item.specificationName} onChange={e => handleFieldChange('productSpecifications', idx, 'specificationName', e.target.value)} style={{ flex: 1, minWidth: 0 }} />
                  <input className="add-input" placeholder="Giá trị (ví dụ: Intel i7, 16GB...)" value={item.value} onChange={e => handleFieldChange('productSpecifications', idx, 'value', e.target.value)} style={{ flex: 1, minWidth: 0 }} />
                  <button type="button" onClick={() => handleRemoveField('productSpecifications', idx)} style={{ color: 'red', border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', padding: 0, width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Xóa thông số">
                    <span aria-hidden>×</span>
                  </button>
          </div>
              ))}
              <button type="button" className="add-btn" style={{ marginTop: 4, background: '#e0e7ff', color: '#222', borderRadius: 8, fontWeight: 500 }} onClick={() => handleAddField('productSpecifications', { specificationName: '', value: '' })}>+ Thêm thông số</button>
            </div>
          </div>
          <div className="add-product-side" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="add-block" style={{ marginBottom: 0 }}>
              <div className="add-block-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Danh mục sản phẩm</div>
              <select className="add-input" name="categoryId" value={form.categoryId} onChange={handleChange} style={{ fontSize: 16, padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e4e7ec', width: '100%' }}>
                <option value={0}>Lựa chọn danh mục</option>
                {categories && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .add-product-content { flex-direction: column !important; gap: 0 !important; padding: 16px !important; }
            .add-product-main, .add-product-side { width: 100% !important; min-width: 0 !important; }
          }
        `}</style>
      </form>
    </div>
  );
};

export default AddOrEditProductModal;
