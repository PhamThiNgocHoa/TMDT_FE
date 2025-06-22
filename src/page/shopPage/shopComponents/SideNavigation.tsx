import React, { useState } from 'react';
import '../../../assets/css/homeStyles/sideNavigation.css';
import useCategory from "../../../hooks/useCategory";
import useProduct from "../../../hooks/useProduct";

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
}

const MegaMenuBox: React.FC<MegaMenuBoxProps> = ({ isVisible, position, categoryId, products }) => {
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

  return (
    <div className="mega-menu-box" style={{ left: position.x, top: position.y }}>
      <div className="mega-menu-content">
        {uniqueSpecs.map((spec) => (
          <div className="mega-menu-col" key={spec.id}>
            <div className="mega-menu-title">{spec.name}</div>
            {getUniqueValues(spec.id).map((val, idx) => (
              <div className="mega-menu-item" key={idx}>{val}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SideNavigation: React.FC = () => {
  const { categories, loading, error } = useCategory();
  const { products } = useProduct();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleCategoryHover = (categoryId: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPosition({ x: rect.right + 10, y: rect.top });
    setHoveredCategory(categoryId);
  };
  const handleCategoryLeave = () => setHoveredCategory(null);

  return (
    <aside className="side-navigation">
      <div className="container">
        <nav className="side-nav">
          <ul className="side-nav-list">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category.id}
                  className="side-nav-item"
                  onMouseEnter={e => handleCategoryHover(category.id, e)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <span>{category.name}</span>
                </li>
              ))
            ) : (
              <li className="side-nav-item">
                <span>Không có danh mục</span>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <MegaMenuBox
        isVisible={hoveredCategory !== null}
        position={hoverPosition}
        categoryId={hoveredCategory}
        products={products as ProductLike[]}
      />
    </aside>
  );
};

export default SideNavigation;
