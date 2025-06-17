import React, { useState } from "react";
import "./CustomProductServicePage.css";
import PromoBanner from "../../page/homePage/homeComponents/PromoBanner";
import SectionHeader from "../../page/homePage/homeComponents/SectionHeader";
import { topProducts } from "../../page/homePage/data/products";
import { Link } from "react-router-dom";
import formatToVND from "../../hooks/formatToVND";
import useCategory from "../../hooks/useCategory";
import useProduct from "../../hooks/useProduct";

const sidebarMenu = [
  { label: "Bàn phím", active: false },
  { label: "Chuột", active: false },
  { label: "Tai nghe", active: false },
  { label: "Loa, micro, webcam", active: false },
  { label: "Phụ kiện công nghệ", active: false },
  { label: "Sản phẩm/dịch vụ custom", active: true },
];

const customCategories = [
  { icon: "keyboard", label: "Bàn phím cơ" },
  { icon: "mouse", label: "Chuột" },
  { icon: "keycap", label: "Keycap" },
  { icon: "switch", label: "Switch" },
  { icon: "headphone", label: "Tai nghe" },
  { icon: "custom", label: "Dịch vụ custom" },
];


const iconMap: Record<string, React.ReactNode> = {
  keyboard: (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="24" height="12" rx="2" />
      <rect x="7" y="13" width="2" height="2" />
      <rect x="11" y="13" width="2" height="2" />
      <rect x="15" y="13" width="2" height="2" />
      <rect x="19" y="13" width="2" height="2" />
      <rect x="23" y="13" width="2" height="2" />
      <rect x="7" y="17" width="2" height="2" />
      <rect x="11" y="17" width="2" height="2" />
      <rect x="15" y="17" width="10" height="2" />
    </svg>
  ),
  mouse: (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="6" width="12" height="20" rx="6" />
      <line x1="16" y1="6" x2="16" y2="26" />
    </svg>
  ),
  keycap: (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="7" y="13" width="18" height="10" rx="2" />
      <rect x="11" y="9" width="10" height="4" rx="1" />
    </svg>
  ),
  switch: (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="12" width="16" height="8" rx="2" />
      <rect x="12" y="8" width="8" height="4" rx="1" />
    </svg>
  ),
  headphone: (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="20" r="3" />
      <circle cx="22" cy="20" r="3" />
      <path d="M10 20v-3a6 6 0 0 1 12 0v3" />
    </svg>
  ),
  custom: (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="8" width="16" height="16" rx="4" />
      <path d="M12 12h8v8h-8z" />
    </svg>
  ),
};

const CustomSidebar = () => (
  <aside className="custom-sidebar-menu">
    <ul>
      {sidebarMenu.map((item, idx) => (
        <li
          key={idx}
          className={
            item.active ? "sidebar-menu-item active" : "sidebar-menu-item"
          }
        >
          {item.label}
          {item.label !== "Sản phẩm/dịch vụ custom" && (
            <span className="sidebar-menu-arrow">&gt;</span>
          )}
        </li>
      ))}
    </ul>
  </aside>
);

const CustomCategorySection = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) => (
  <section className="custom-category-section">
    <SectionHeader
      label="Sản phẩm xách tay/custom"
      title="Chọn Theo Danh Mục Custom"
    />
    <div className="custom-category-header">
      <div className="custom-category-nav">
        <button className="custom-category-arrow">
          <span>&larr;</span>
        </button>
        <button className="custom-category-arrow">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
    <div className="custom-category-list">
      {customCategories.map((cat, idx) => (
        <div
          className={`custom-category-item${
            selectedCategory === cat.label ? " active" : ""
          }`}
          key={idx}
          onClick={() => setSelectedCategory(cat.label)}
        >
          <div className="custom-category-icon">{iconMap[cat.icon]}</div>
          <div className="custom-category-label">{cat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

const FilterBox = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;
  return (
    <div className={`custom-filter-dropdown${open ? " open" : ""}`}>
      <div className="custom-filter-popup">
        <div className="custom-filter-row custom-filter-popup-header">
          <div className="custom-filter-group">
            <span className="custom-filter-label">Tình trạng sản phẩm</span>
            <button className="custom-filter-btn-option active">
              Còn hàng
            </button>
          </div>
          <div className="custom-filter-group">
            <span className="custom-filter-label">Giá</span>
            <input className="custom-filter-input" placeholder="2.000đ" />
            <span style={{ margin: "0 6px" }}>-</span>
            <input className="custom-filter-input" placeholder="5.000đ" />
          </div>
          <div className="custom-filter-group">
            <span className="custom-filter-label">Hãng</span>
            <button className="custom-filter-btn-option">AKKO</button>
            <button className="custom-filter-btn-option active">HMX</button>
          </div>
          <div className="custom-filter-group">
            <span className="custom-filter-label">Loại switch</span>
            <button className="custom-filter-btn-option active">Linear</button>
            <button className="custom-filter-btn-option">Tactile</button>
            <button className="custom-filter-btn-option">Clicky</button>
          </div>
          <button className="custom-filter-close" onClick={onClose}>
            X Đóng
          </button>
        </div>
        <hr style={{ margin: "18px 0 10px 0", borderColor: "#e0e0e0" }} />
        <div className="custom-filter-selected-row">
          <span className="custom-filter-label">Tiêu chí đã chọn:</span>
          <span className="custom-filter-chip active">2.000đ - 5.000đ</span>
          <span className="custom-filter-chip">HMX</span>
          <span className="custom-filter-chip">Linear</span>
          <button className="custom-filter-clear">Xóa bộ lọc</button>
        </div>
        <div className="custom-filter-actions">
          <button className="custom-filter-cancel">Bỏ chọn</button>
          <button className="custom-filter-apply">Xem kết quả &gt;&gt;</button>
        </div>
      </div>
    </div>
  );
};

const TopHotProductsSection = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const {products} = useProduct();
  return (
      <section className="custom-top-hot-section">
        <div className="custom-filter-row" style={{position: "relative"}}>
          <button
              className="custom-filter-btn"
              onClick={() => setFilterOpen(!filterOpen)}
          >
          <span role="img" aria-label="filter">
            ⚙️
          </span>{" "}
            Bộ lọc
          </button>
          <FilterBox open={filterOpen} onClose={() => setFilterOpen(false)}/>
        </div>
        <div className="custom-top-hot-header">
          <SectionHeader label="Tháng này" title="Top Sản Phẩm Hot"/>
          <button className="custom-view-all small">Xem Tất Cả</button>
        </div>
        <div className="custom-product-list">
          {products
              .filter((p) => p.hot === true)
              .slice(0, 5)
              .map((p) => (
                  <Link
                      to={`/product/${p.id}`}
                      key={p.id}
                      className="custom-product-card"
                      style={{textDecoration: "none", color: "inherit"}}
                  >
                    <div className="custom-product-img">
                      <img src={p.img} alt={p.name}/>
                      <div className="custom-product-icons">
                        <span>♥</span>
                        <span>👁</span>
                      </div>
                    </div>
                    <div className="custom-product-name">{p.name}</div>
                    <div className="custom-product-price">{formatToVND(p.price)}</div>
                    <div className="custom-product-rating">
                      {"★".repeat(Math.round(5))}
                      <span className="custom-product-reviews">(10)</span>
                    </div>
                  </Link>
              ))}
        </div>
      </section>
  );
};

const FeaturedProductsSection = () => (
    <section className="custom-featured-section">
      <div className="custom-featured-header">
        <SectionHeader label="Sản phẩm" title="Các sản phẩm tiêu biểu"/>
        <div className="custom-featured-nav">
          <button className="custom-category-arrow">
            <span>&larr;</span>
          </button>
          <button className="custom-category-arrow">
            <span>&rarr;</span>
          </button>
        </div>
      </div>
      <div className="custom-featured-list">
        {topProducts.slice(0, 8).map((p) => (
            <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="custom-product-card"
                style={{textDecoration: "none", color: "inherit"}}
            >
              <div className="custom-product-img">
                <img src={p.img} alt={p.name}/>
                <div className="custom-product-icons">
              <span>♥</span>
              <span>👁</span>
            </div>
          </div>
          <div className="custom-product-name">{p.name}</div>
          <div className="custom-product-price">{formatToVND(p.price)}</div>
          <div className="custom-product-rating">
            {"★".repeat(Math.round(5))}
            <span className="custom-product-reviews">(10)</span>
          </div>
        </Link>
      ))}
    </div>
    <div className="custom-featured-viewall-container">
      <button className="custom-featured-viewall">Xem Tất Cả Sản Phẩm</button>
    </div>
  </section>
);

const CustomBenefitsSection = () => (
  <section className="custom-benefits-section">
    <div className="custom-benefit-item">
      <div className="custom-benefit-icon-wrap">
        <span className="custom-benefit-icon">
          {/* Truck icon */}
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#D1D1D1" />
            <circle cx="40" cy="40" r="30" fill="#111" />
            <g stroke="#fff" strokeWidth="3" fill="none">
              <rect x="26" y="44" width="20" height="10" rx="2.5" />
              <rect x="46" y="48" width="8" height="6" rx="2.5" />
              <path d="M26 50v-14a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
              <circle cx="30" cy="58" r="3" />
              <circle cx="50" cy="58" r="3" />
            </g>
          </svg>
        </span>
      </div>
      <div className="custom-benefit-title">Vận chuyển nhanh chóng</div>
      <div className="custom-benefit-desc">
        Miễn phí phí vận chuyển với đơn từ 1.5 tr
      </div>
    </div>
    <div className="custom-benefit-item">
      <div className="custom-benefit-icon-wrap">
        <span className="custom-benefit-icon">
          {/* Headphone icon */}
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#D1D1D1" />
            <circle cx="40" cy="40" r="30" fill="#111" />
            <g stroke="#fff" strokeWidth="3" fill="none">
              <path d="M26 50v-6a14 14 0 0 1 28 0v6" />
              <circle cx="30" cy="54" r="4" />
              <circle cx="50" cy="54" r="4" />
            </g>
          </svg>
        </span>
      </div>
      <div className="custom-benefit-title">Bảo hành tận tâm</div>
      <div className="custom-benefit-desc">Chính sách bảo hành phù hợp</div>
    </div>
    <div className="custom-benefit-item">
      <div className="custom-benefit-icon-wrap">
        <span className="custom-benefit-icon">
          {/* Shield check icon */}
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#D1D1D1" />
            <circle cx="40" cy="40" r="30" fill="#111" />
            <g stroke="#fff" strokeWidth="3" fill="none">
              <path d="M40 26l14 6v10c0 10-14 16-14 16s-14-6-14-16V32l14-6z" />
              <path d="M36 44l4 4 8-8" />
            </g>
          </svg>
        </span>
      </div>
      <div className="custom-benefit-title">Đổi trả phù hợp</div>
      <div className="custom-benefit-desc">
        Đổi trả nếu sản phẩm lỗi từ nsx/do chúng tôi
      </div>
    </div>
  </section>
);

const CustomServiceList = () => (
  <section className="custom-service-list-section">
    <SectionHeader label="Dịch vụ custom" title="Custom phím cơ" />
    <div style={{ textAlign: "right", marginBottom: 16 }}>
      <a
        href="#"
        style={{ color: "#d7263d", fontWeight: 500, fontSize: "1rem" }}
      >
        Xem chính sách cho Custom bàn phím cơ
      </a>
    </div>
    <div className="custom-product-list">
      {/* Thay bằng dữ liệu thực tế nếu có */}
      <div className="custom-product-card">
        <img src="https://i.imgur.com/1.jpg" alt="Lót foam phím cơ" />
        <div className="custom-product-name">Lót foam phím cơ</div>
        <div className="custom-product-price">30.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/2.jpg" alt="PE mod" />
        <div className="custom-product-name">PE mod</div>
        <div className="custom-product-price">20.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/3.jpg" alt="Tape mod" />
        <div className="custom-product-name">Tape mod</div>
        <div className="custom-product-price">15.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/4.jpg" alt="Stab mod" />
        <div className="custom-product-name">Stab mod</div>
        <div className="custom-product-price">90.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/5.jpg" alt="Lube switch" />
        <div className="custom-product-name">Lube switch</div>
        <div className="custom-product-price">3.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/6.jpg" alt="Recoat/Resonade sơn" />
        <div className="custom-product-name">Recoat/Resonade sơn</div>
        <div className="custom-product-price">400.000₫ - 1.200.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <Link
        to="/custom-product/khac-ten-chu-ky"
        className="custom-product-card"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src="https://i.imgur.com/7.jpg" alt="Khắc tên/chữ ký" />
        <div className="custom-product-name">Khắc tên/chữ ký</div>
        <div className="custom-product-price">300.000₫ - 650.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </Link>
    </div>
  </section>
);

const CustomMouseServiceList = () => (
  <section className="custom-service-list-section">
    <SectionHeader label="Dịch vụ custom" title="Custom chuột" />
    <div style={{ textAlign: "right", marginBottom: 16 }}>
      <a
        href="#"
        style={{ color: "#d7263d", fontWeight: 500, fontSize: "1rem" }}
      >
        Xem chính sách cho Custom chuột
      </a>
    </div>
    <div className="custom-product-list">
      <div className="custom-product-card">
        <img src="https://i.imgur.com/8.jpg" alt="Thay switch chuột" />
        <div className="custom-product-name">Thay switch chuột</div>
        <div className="custom-product-price">100.000₫ - 350.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/9.jpg" alt="Thay feet chuột" />
        <div className="custom-product-name">Thay feet chuột</div>
        <div className="custom-product-price">35.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/10.jpg" alt="Coating chuột" />
        <div className="custom-product-name">Coating chuột</div>
        <div className="custom-product-price">250.000₫ - 750.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
      <div className="custom-product-card">
        <img src="https://i.imgur.com/11.jpg" alt="Vẽ hình custom lên chuột" />
        <div className="custom-product-name">Vẽ hình custom lên chuột</div>
        <div className="custom-product-price">450.000₫ - 950.000₫</div>
        <div className="custom-product-rating">
          ★★★★★ <span className="custom-product-reviews">(65)</span>
        </div>
      </div>
    </div>
  </section>
);

const CustomProductServicePage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Bàn phím cơ");

  return (
    <div className="custom-page-layout">
      <CustomSidebar />
      <main className="custom-main-content">
        <PromoBanner />
        <CustomCategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory !== "Dịch vụ custom" && <TopHotProductsSection />}
        {selectedCategory !== "Dịch vụ custom" && <FeaturedProductsSection />}
        {selectedCategory === "Dịch vụ custom" && (
          <>
            <CustomServiceList />
            <CustomMouseServiceList />
          </>
        )}
        <CustomBenefitsSection />
      </main>
    </div>
  );
};

export default CustomProductServicePage;
