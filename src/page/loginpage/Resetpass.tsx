import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/css/ResetPass.css';

const ResetPass: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Bắt đầu submit form');

        if (!username || !resetCode || !newPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            console.warn('Thông tin bị thiếu:', { username, resetCode, newPassword });
            return;
        }

        try {
            console.log('Gửi yêu cầu đặt lại mật khẩu với:', {
                username,
                resetCode,
                newPassword,
            });

            const response = await fetch(
                `/api/customer/resetPassword/${encodeURIComponent(username)}?resetCode=${encodeURIComponent(resetCode)}&newPassword=${encodeURIComponent(newPassword)}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                }
            );

            console.log('Phản hồi từ server:', response);

            if (response.ok) {
                console.log('Đặt lại mật khẩu thành công');
                Swal.fire({
                    icon: 'success',
                    title: 'Đặt lại mật khẩu thành công!',
                    text: 'Bạn có thể đăng nhập lại với mật khẩu mới.',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                const data = await response.json();
                console.error('Lỗi từ server:', data);
                setError(data.message || 'Mã xác nhận không đúng hoặc hết hạn.');
            }
        } catch (error: any) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            setError('Lỗi kết nối máy chủ.');
        }
    };

    return (
        <div className="reset-container">
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit} className="reset-form">
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
