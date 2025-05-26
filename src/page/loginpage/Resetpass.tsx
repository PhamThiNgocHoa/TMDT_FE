import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/css/ResetPass.css';
import useCustomer from "../../hooks/useCustomer";

const ResetPass: React.FC = () => {
    const navigate = useNavigate();
    const { username } = useParams(); // Lấy username từ URL params

    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const { fetchResetPassword } = useCustomer();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !resetCode || !newPassword) return setError('Vui lòng điền đầy đủ thông tin.');

        try {
            const response = await fetchResetPassword(username, resetCode, newPassword);

            if (response?.code === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đặt lại mật khẩu thành công!',
                    text: 'Bạn có thể đăng nhập lại với mật khẩu mới.',
                }).then(() => navigate('/login'));
            } else {
                setError(response?.message || 'Mã xác nhận không đúng hoặc hết hạn.');
            }
        } catch (error) {
            setError('Lỗi kết nối máy chủ.');
        }
    };

    useEffect(() => {
        // Kiểm tra nếu username không có thì điều hướng về trang khác, ví dụ trang đăng nhập
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    return (
        <div className="reset-container">
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit} className="reset-form">
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username || ''}
                        disabled // Không cho phép người dùng sửa tên đăng nhập
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="resetCode">Mã xác nhận</label>
                    <input
                        id="resetCode"
                        type="text"
                        placeholder="Nhập mã xác nhận"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Đặt lại mật khẩu</button>
            </form>
        </div>
    );
};

export default ResetPass;
