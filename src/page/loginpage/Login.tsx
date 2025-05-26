import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/css/login.css';
import imglogin from '../../assets/image/imagelogin.png';
import useCustomer from "../../hooks/useCustomer";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useCustomer();
    const navigate = useNavigate();

    const handleLogins = async () => {
        // Kiểm tra thông tin đầu vào
        if (!username || !password) {
            return Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu.',
            });
        }

        try {
            // Gọi hàm login từ hook useCustomer
            const response = await handleLogin(username, password);

            // Kiểm tra mã trạng thái từ response (axios trả về status, không phải ok)
            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => navigate('/home'));
            } else {
                // Nếu không thành công, hiển thị thông báo lỗi
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại',
                    text: response.message || 'Sai tên đăng nhập hoặc mật khẩu.',
                });
            }
        } catch (error) {
            // Xử lý lỗi nếu có sự cố với kết nối
            console.error('Lỗi kết nối:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi kết nối',
                text: 'Không thể kết nối tới máy chủ.',
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src={imglogin} alt="Login Illustration" />
                </div>
                <div className="login-right">
                    <h2>Đăng nhập</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Email hoặc Số Điện Thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập email hoặc số điện thoại"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={handleLogins}>
                            Đăng nhập
                        </button>
                        <div className="forgot-password">
                            <a href="/forgotPass">Quên mật khẩu?</a>
                        </div>
                        <div className="forgot-password">
                            Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
