import React, {useEffect} from 'react';
import '../../../assets/css/homeStyles/sideNavigation.css';
import useCategory from "../../../hooks/useCategory";

const SideNavigation: React.FC = () => {
    const {categories} = useCategory();

    return (
        <aside className="side-navigation">
            <div className="container">
                <nav className="side-nav">
                    <ul className="side-nav-list">
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <li key={category.id} className="side-nav-item">
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
        </aside>
    );
};

export default SideNavigation;
