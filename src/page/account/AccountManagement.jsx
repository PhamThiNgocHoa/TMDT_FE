import React, { useState } from 'react';
import '../../assets/css/accountManagement.css';

const AccountManagement = () => {
    const [activeTab, setActiveTab] = useState("ho-so-cua-toi");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "ho-so-cua-toi":
                return (
                    <div>
                        <h2>Chỉnh sửa hồ sơ của bạn</h2>
                        <form className="form-body">
                            <div className="form-row1">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" placeholder="Nhập tên" />
                                </div>
                                <div className="form-group">
                                    <label>Họ</label>
                                    <input type="text" placeholder="Nhập họ" />
                                </div>
                            </div>
                            <div className="form-row1">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Nhập email" />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <input type="text" placeholder="Nhập địa chỉ" />
                            </div>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu cũ</label>
                                <input type="password" placeholder="Nhập mật khẩu cũ" />
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu mới</label>
                                <input type="password" placeholder="Nhập mật khẩu mới" />
                            </div>
                            <div className="form-group">
                                <label>Xác nhận mật khẩu mới</label>
                                <input type="password" placeholder="Xác nhận mật khẩu mới" />
                            </div>
                            <div className="buttons">
                                <button type="button" className="cancel-btn">Hủy</button>
                                <button type="submit" className="save-btn">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                );
            case "phuong-thuc-thanh-toan":
                return (
                    <div>
                        <h2>Các phương thức thanh toán</h2>
                        <p>Thông tin về các phương thức thanh toán sẽ được hiển thị tại đây.</p>
                    </div>
                );
            case "don-hang-cua-toi":
                return (
                    <div>
                        <h2>Đơn hàng của tôi</h2>
                        <p>Thông tin về đơn hàng của bạn sẽ được hiển thị tại đây.</p>
                    </div>
                );
            case "don-hang-da-huy":
                return (
                    <div>
                        <h2>Đơn hàng của tôi</h2>
                        <p>Thông tin về đơn hàng của bạn sẽ được hiển thị tại đây.</p>
                    </div>
                );
            case "danh-sach-yeu-thich":
                return (
                    <div>
                        <h2>Danh sách yêu thích của tôi</h2>
                        <p>Danh sách các sản phẩm yêu thích của bạn sẽ được hiển thị tại đây.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="account-management-container">
            {/* Breadcrumb */}
            <div className="account-management-container topbody">
                <div className="breadcrumb-container">
                    <a href="/#" className="breadcrumb-item">Home</a> / <span className="breadcrumb-item">Tài Khoản Của Tôi</span>
                </div>

                <div className="account-name-container">
                    <span>Welcome! <strong>fin</strong></span>
                </div>
            </div>

            {/* Body layout */}
            <div className="content-container">
                {/* Left Tab Section */}
                <div className="tab-container">
                    <h4>Quản lí tài khoản của tôi</h4>
                    <ul class="tab-account">
                        <li
                            className={activeTab === "ho-so-cua-toi" ? "active" : ""}
                            onClick={() => handleTabClick("ho-so-cua-toi")}
                        >
                            Hồ sơ của tôi
                        </li>
                        <li
                            className={activeTab === "phuong-thuc-thanh-toan" ? "active" : ""}
                            onClick={() => handleTabClick("phuong-thuc-thanh-toan")}
                        >
                            Các phương thức thanh toán
                        </li>
                    </ul>
                    <h4>Đơn hàng của tôi</h4>
                    <ul class="tab-account">
                        <li
                            className={activeTab === "don-hang-cua-toi" ? "active" : ""}
                            onClick={() => handleTabClick("don-hang-cua-toi")}
                        >
                            Đơn hàng của tôi
                        </li>
                        <li
                            className={activeTab === "don-hang-da-huy" ? "active" : ""}
                            onClick={() => handleTabClick("don-hang-da-huy")}
                        >
                            Đơn hàng đã hủy
                        </li>
                    </ul>
                    <h4>Danh sách yêu thích</h4>
                    <ul class="tab-account">
                        <li
                            className={activeTab === "danh-sach-yeu-thich" ? "active" : ""}
                            onClick={() => handleTabClick("danh-sach-yeu-thich")}
                        >
                            Danh sách yêu thích  của tôi
                        </li>
                    </ul>
                </div>

                {/* Right Content Section */}
                <div className="content-section">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AccountManagement;
