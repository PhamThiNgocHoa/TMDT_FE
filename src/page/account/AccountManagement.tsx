import React, {useEffect, useState} from "react";
import "../../assets/css/accountManagement.css";
import useCustomer from "../../hooks/useCustomer";
import Swal from 'sweetalert2';
import OrderManagementPage from "./OrderManagementPage/OrderManagementPage";

const AccountManagement = () => {
    const [activeTab, setActiveTab] = useState("ho-so-cua-toi");
    const {user, fetchUser, fetchUpdateCustomer} = useCustomer();

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [formErrors, setFormErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.fullname || "",
                username: user.username || "",
                email: user.email || "",
                password: "",
                confirmPassword: "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        if (formData.password && formData.password !== formData.confirmPassword) {
            setFormErrors({
                ...formErrors,
                confirmPassword: "Mật khẩu nhập lại không khớp.",
            });
            return;
        }

        try {
            const {confirmPassword, ...dataToSend} = formData;

            await fetchUpdateCustomer(user.id, dataToSend);

            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Cập nhật thông tin thành công!',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!',
                confirmButtonText: 'Đóng',
            });
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "ho-so-cua-toi":
                return (
                    <div>
                        <h2>Chỉnh sửa hồ sơ của bạn</h2>
                        <form className="form-body" onSubmit={handleSubmit}>
                            <div className="form-row1">
                                <div className="form-group">
                                    <label>Họ và Tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        placeholder="Nhập họ tên"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên đăng nhập</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Tên đăng nhập"
                                    />
                                </div>
                            </div>
                            <div className="form-row1">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Nhập email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu mới</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu mới (nếu muốn đổi)"
                                    autoComplete="new-password"
                                />
                                {formErrors.password && (
                                    <div className="error-text">{formErrors.password}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Nhập lại mật khẩu mới</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                                {formErrors.confirmPassword && (
                                    <div className="error-text">{formErrors.confirmPassword}</div>
                                )}
                            </div>
                            <div className="buttons">
                                <button type="button" className="cancel-btn">Hủy</button>
                                <button type="submit" className="save-btn">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                );
            case "phuong-thuc-thanh-toan":
                return <div><h2>Các phương thức thanh toán</h2><p>Thông tin phương thức thanh toán ở đây.</p></div>;
            case "don-hang-cua-toi":
                return <div><h2>Đơn hàng của tôi</h2>
                    <OrderManagementPage/>
                </div>;
            case "don-hang-da-huy":
                return <div><h2>Đơn hàng đã hủy</h2><p>Thông tin đơn hàng đã hủy ở đây.</p></div>;
            case "danh-sach-yeu-thich":
                return <div><h2>Danh sách yêu thích</h2><p>Danh sách sản phẩm yêu thích của bạn ở đây.</p></div>;
            default:
                return null;
        }
    };

    return (
        <div className="account-management-container">
            <div className="account-management-container topbody">
                <div className="breadcrumb-container">
                    <a href="/#" className="breadcrumb-item">Home</a> / <span className="breadcrumb-item">Tài Khoản Của Tôi</span>
                </div>
                <div className="account-name-container">
                    <span>Welcome! <strong>{user?.username || "..."}</strong></span>
                </div>
            </div>

            <div className="content-container">
                <div className="tab-container">
                    <h4>Quản lí tài khoản của tôi</h4>
                    <ul className="tab-account">
                        <li className={activeTab === "ho-so-cua-toi" ? "active" : ""}
                            onClick={() => setActiveTab("ho-so-cua-toi")}>Hồ sơ của tôi
                        </li>
                        <li className={activeTab === "phuong-thuc-thanh-toan" ? "active" : ""}
                            onClick={() => setActiveTab("phuong-thuc-thanh-toan")}>Phương thức thanh toán
                        </li>
                    </ul>
                    <h4>Đơn hàng</h4>
                    <ul className="tab-account">
                        <li className={activeTab === "don-hang-cua-toi" ? "active" : ""}
                            onClick={() => setActiveTab("don-hang-cua-toi")}>Đơn hàng của tôi
                        </li>
                        <li className={activeTab === "don-hang-da-huy" ? "active" : ""}
                            onClick={() => setActiveTab("don-hang-da-huy")}>Đơn hàng đã hủy
                        </li>
                    </ul>
                    <h4>Yêu thích</h4>
                    <ul className="tab-account">
                        <li className={activeTab === "danh-sach-yeu-thich" ? "active" : ""}
                            onClick={() => setActiveTab("danh-sach-yeu-thich")}>Danh sách yêu thích
                        </li>
                    </ul>
                </div>

                <div
                    className="content-section"
                    style={{marginLeft: "-180px"}} // hoặc -10px tùy mức độ
                >
                    {renderContent()}
                </div>

            </div>
        </div>
    );
};

export default AccountManagement;
