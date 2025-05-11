import React from 'react';
import '../../../assets/css/homeStyles/sideNavigation.css';

const SideNavigation: React.FC = () => {
    return (
        <aside className="side-navigation">
            <div className="container">
                <nav className="side-nav">
                    <ul className="side-nav-list">
                        <li className="side-nav-item">
                            <span>Laptop</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Laptop Gaming</span>
                        </li>
                        <li className="side-nav-item">
                            <span>PC GVN</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Main, CPU, VGA</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Ổ cứng</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Màn hình</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Chuột</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Bàn phím</span>
                        </li>
                        <li className="side-nav-item">
                            <span>Sản phẩm/dịch vụ custom</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default SideNavigation;
