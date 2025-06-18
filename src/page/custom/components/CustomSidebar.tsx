import React from "react";
import useCategory from "../../../hooks/useCategory";

const CustomSidebar = () => {
    const { categories } = useCategory();

    return (
        <aside className="custom-sidebar-menu">
            <ul>
                {categories.map((item) => (
                    <li
                        key={item.id}
                        className="sidebar-menu-item"
                    >
                        {item.name}
                        {item.name !== "Sản phẩm/dịch vụ custom" && (
                            <span className="sidebar-menu-arrow">&gt;</span>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CustomSidebar;
