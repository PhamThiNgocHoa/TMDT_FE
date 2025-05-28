import React from "react";
import "../../../assets/css/homeStyles/sideNavigation.css";
import { Link } from "react-router-dom";
let categories: { id: number; name: string; path?: string }[] | undefined;
let useCategory: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  useCategory = require("../../../hooks/useCategory").default;
  categories = useCategory().categories;
} catch (e) {
  categories = undefined;
}

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

const SideNavigation: React.FC = () => {
  let navItems =
    categories && categories.length > 0
      ? categories.map((cat: any) => ({
          label: cat.name,
          path: cat.path || "#",
        }))
      : staticNavigationItems;
  return (
    <aside className="side-navigation">
      <div className="container">
        <nav className="side-nav">
          <ul className="side-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="side-nav-item">
                <Link to={item.path} className="side-nav-link">
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavigation;
