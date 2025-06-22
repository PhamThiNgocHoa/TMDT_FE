import React, { useState } from "react";
import "../../../assets/css/homeStyles/sideNavigation.css";
import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";
import useProduct from "../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";

/**
 * Mega menu data mẫu, bạn có thể thay đổi hoặc lấy từ API nếu muốn dynamic.
 */
const megaMenuData = [
    {
        title: "Thương hiệu",
        items: ["ASUS", "DELL", "LENOVO"],
        highlight: 0 // index của item cần tô đỏ
    },
    {
        title: "Giá bán",
        items: ["Dưới 15 triệu", "Từ 15 đến 20 triệu", "Trên 20 triệu"]
    },
    {
        title: "Linh phụ kiện",
        items: ["RAM", "SSD", "Ổ cứng"]
    },
    {
        title: "CPU Intel-AMD",
        items: ["Intel Core i3", "Intel Core i5", "Intel Core i7"]
    },
    {
        title: "Nhu cầu sử dụng",
        items: ["Đồ họa", "Mỏng nhẹ cao cấp", "Học sinh - sinh viên"]
    }
];

interface ProductSpecification {
  id: number;
  value: string;
  specificationId: number;
  specificationName: string;
}

interface ProductLike {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  categoryId: number;
  categoryName: string;
  productSpecifications?: ProductSpecification[];
}

interface MegaMenuBoxProps {
  isVisible: boolean;
  position: { x: number; y: number };
  categoryId: number | null;
  products: ProductLike[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Component hiển thị sản phẩm khi hover category
const CategoryHoverBox: React.FC<{
    categoryId: number;
    products: any[];
    isVisible: boolean;
    position: { x: number; y: number };
}> = ({ categoryId, products, isVisible, position }) => {
    const navigate = useNavigate();
    
    if (!isVisible) return null;

    const filteredProducts = products.filter(product => product.categoryId === categoryId).slice(0, 4);

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div 
            className="category-hover-box"
            style={{
                left: position.x,
                top: position.y
            }}
        >
            <div className="hover-box-header">
                <h4>Sản phẩm trong danh mục</h4>
            </div>
            <div className="hover-box-content">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div 
                            key={product.id} 
                            className="hover-product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="hover-product-image">
                                <img 
                                    src={product.img} 
                                    alt={product.name}
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/default-product.png';
                                    }}
                                />
                            </div>
                            <div className="hover-product-info">
                                <h5 className="hover-product-name">{product.name}</h5>
                                <p className="hover-product-price">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(product.price)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-products">
                        <p>Chưa có sản phẩm trong danh mục này</p>
                    </div>
                )}
            </div>
            {filteredProducts.length > 0 && (
                <div className="hover-box-footer">
                    <button 
                        className="view-all-btn"
                        onClick={() => navigate(`/shop?category=${categoryId}`)}
                    >
                        Xem tất cả sản phẩm
                    </button>
                </div>
            )}
        </div>
    );
};

const staticNavigationItems = [
    { label: "Laptop", path: "/laptop" },
    { label: "Laptop Gaming", path: "/laptop-gaming" },
    { label: "PC GVN", path: "/pc-gvn" },
    { label: "Main, CPU, VGA", path: "/components" },
    { label: "Ổ cứng", path: "/storage" },
    { label: "Màn hình", path: "/monitors" },
    { label: "Chuột", path: "/mice" },
    { label: "Bàn phím", path: "/keyboards" },
    { label: "Sản phẩm/dịch vụ custom", path: "/custom" },
];

const MAX_COLUMNS = 7; // Số cột tối đa hiển thị

/**
 * MegaMenuBox: Hiển thị các specification (dòng đỏ) và các value của productSpecifications bên dưới,
 * dựa trên dữ liệu products đã có khi hover vào category.
 */
const MegaMenuBox: React.FC<MegaMenuBoxProps> = ({ isVisible, position, categoryId, products, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  if (!isVisible || !categoryId) return null;

  // Lọc tất cả products thuộc category này
  const productsInCategory = products.filter((p: ProductLike) => p.categoryId === categoryId);

  // Gom tất cả productSpecifications lại thành 1 mảng
  const allProductSpecs: ProductSpecification[] = productsInCategory.flatMap((p: ProductLike) => (p.productSpecifications || []));

  // Lấy tất cả specificationName duy nhất
  const uniqueSpecs = Array.from(
    new Map(
      allProductSpecs.map((ps: ProductSpecification) => [ps.specificationId, { id: ps.specificationId, name: ps.specificationName }])
    ).values()
  );

  // Group value duy nhất cho mỗi specification
  const getUniqueValues = (specId: number) => {
    const values = allProductSpecs.filter(ps => ps.specificationId === specId).map(ps => ps.value);
    return Array.from(new Set(values));
  };

  if (uniqueSpecs.length === 0) return null;

  const visibleSpecs = uniqueSpecs.slice(0, MAX_COLUMNS);
  const hiddenSpecs = uniqueSpecs.slice(MAX_COLUMNS);

  return (
    <div
      className="mega-menu-box"
      style={{ left: position.x, top: position.y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mega-menu-content">
        {visibleSpecs.map((spec) => (
          <div className="mega-menu-col" key={spec.id}>
            <div className="mega-menu-title" title={spec.name}>{spec.name}</div>
            <div className="mega-menu-items-scroll">
              {getUniqueValues(spec.id).map((val, idx) => (
                <div
                  className="mega-menu-item"
                  key={idx}
                  title={val}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/shop?category=${categoryId}&spec=${spec.id}&value=${encodeURIComponent(val)}`)}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        ))}
        {hiddenSpecs.length > 0 && (
          <div className="mega-menu-col">
            <div className="mega-menu-title">...</div>
            <div
              className="mega-menu-item mega-menu-more"
              style={{ color: '#1976d2', cursor: 'pointer' }}
              onClick={() => navigate(`/shop?category=${categoryId}`)}
            >
              Xem thêm
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SideNavigation: React.FC = () => {
    const { categories, loading, error } = useCategory();
    const { products } = useProduct();
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

    // Debug logging
    console.log('SideNavigation - Categories from API:', categories);
    console.log('SideNavigation - Loading:', loading);
    console.log('SideNavigation - Error:', error);
    console.log('SideNavigation - Products from API:', products);

    const navItems =
        categories && categories.length > 0
            ? categories.map((cat: any) => ({
                label: cat.name,
                path: cat.path || `#category-${cat.id}`,
                id: cat.id
            }))
            : staticNavigationItems.map((item, index) => ({
                ...item,
                id: index + 1000 // Fake ID cho static items
            }));

    console.log('SideNavigation - Nav items:', navItems);

    const handleCategoryHover = (categoryId: number, event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoverPosition({ x: rect.right + 10, y: rect.top });
      setHoveredCategory(categoryId);
    };
    const handleCategoryLeave = () => {
      setTimeout(() => {
        if (!isMenuHovered) setHoveredCategory(null);
      }, 100);
    };
    const handleMenuEnter = () => setIsMenuHovered(true);
    const handleMenuLeave = () => {
      setIsMenuHovered(false);
      setHoveredCategory(null);
    };

    return (
        <aside className="side-navigation">
            <div className="container">
                <nav className="side-nav">
                    <ul className="side-nav-list">
                        {navItems.map((item, index) => (
                            <li 
                                key={index} 
                                className="side-nav-item"
                                onMouseEnter={e => handleCategoryHover(item.id, e)}
                                onMouseLeave={handleCategoryLeave}
                            >
                                <Link to={item.path} className="side-nav-link">
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <MegaMenuBox
                isVisible={hoveredCategory !== null}
                position={hoverPosition}
                categoryId={hoveredCategory}
                products={products as ProductLike[]}
                onMouseEnter={handleMenuEnter}
                onMouseLeave={handleMenuLeave}
            />
        </aside>
    );
};

export default SideNavigation;
