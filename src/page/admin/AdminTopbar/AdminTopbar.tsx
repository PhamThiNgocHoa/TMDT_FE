import React from "react";
import "./AdminTopbar.css";

const AdminTopbar = () => {
  return (
    <div className="admin-topbar">
      <div className="admin-search">
        <input className="admin-search-input" placeholder="Tìm kiếm..." />
        <i className="fas fa-search admin-search-icon"></i>
      </div>
      <div className="admin-topbar-right">
        <div className="admin-notify">
          <i className="fas fa-bell"></i>
          <span className="admin-notify-badge">2</span>
        </div>
        <div className="admin-user">
          <img
            className="admin-avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="admin"
          />
          <div className="admin-user-info">
            <div className="admin-user-name">Dung Pham</div>
            <div className="admin-user-role">Admin</div>
          </div>
          <i className="fas fa-chevron-down admin-user-menu"></i>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
