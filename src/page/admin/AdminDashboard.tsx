import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import '../../assets/css/admin.css';

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState('dashboard');  // State để quản lý tab hiện tại

    const handleSelectTab = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <div className="dashboard-container">
            <Sidebar onSelectTab={handleSelectTab} />
            <div className="main-content">
                {selectedTab === 'dashboard' && <div>Dashboard Content</div>}
                {selectedTab === 'products' && <div>Products Content</div>}
                {selectedTab === 'category' && <div>Category Content</div>}
                {selectedTab === 'orders' && <div>Orders Content</div>}
                {selectedTab === 'coupon' && <div>Orders Content</div>}
                {selectedTab === 'banner' && <div>Orders Content</div>}
                {selectedTab === 'transaction' && <div>Orders Content</div>}
                {selectedTab === 'setting' && <div>Orders Content</div>}
                {selectedTab === 'help' && <div>Orders Content</div>}
                {selectedTab === 'logout' && <div>Orders Content</div>}
            </div>
        </div>
    );
};

export default AdminDashboard;
