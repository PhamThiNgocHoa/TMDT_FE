import React from 'react';

interface SidebarProps {
    onSelectTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectTab }) => {
    return (
        <div className="sidebar">
            <div className="logo">
                <label>OrangeTech</label>
            </div>
            <ul className="menu">
                <label>MENU</label>
                <li onClick={() => onSelectTab('dashboard')}>
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                </li>
                <li onClick={() => onSelectTab('products')}>
                    <i className="fas fa-cube"></i> Products
                </li>
                <li onClick={() => onSelectTab('category')}>
                    <i className="fas fa-cogs"></i> Category
                </li>
                <li onClick={() => onSelectTab('orders')}>
                    <i className="fas fa-box"></i> Orders
                </li>
                <li onClick={() => onSelectTab('coupon')}>
                    <i className="fas fa-tag"></i> Coupon
                </li>
                <li onClick={() => onSelectTab('banner')}>
                    <i className="fas fa-ad"></i> Banner
                </li>
                <li onClick={() => onSelectTab('transaction')}>
                    <i className="fas fa-exchange-alt"></i> Transaction
                </li>

                <label>OTHERS</label>
                <li onClick={() => onSelectTab('setting')}>
                    <i className="fas fa-cogs"></i> Setting
                </li>
                <li onClick={() => onSelectTab('help')}>
                    <i className="fas fa-question-circle"></i> Help
                </li>
                <li onClick={() => onSelectTab('logout')}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
