import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import imglogin from '../../assets/image/imagelogin.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ForgotPass: React.FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputValue) {
            setError('Vui lòng nhập email hoặc số điện thoại.');
            return;
        }

        try {
            const response = await fetch(`/api/customer/initPasswordReset/${encodeURIComponent(inputValue)}`, {
                method: 'POST',
            });

            if (response.ok) {
                setError('');
                MySwal.fire({
                    title: 'Thành công!',
                    text: 'Mã xác nhận đã được gửi. Kiểm tra email/SĐT để tiếp tục.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/resetpass');
                });
            } else {
                const data = await response.json();
                setError(data.message || 'Không tìm thấy tài khoản.');

            }
        } catch (err) {
            console.log(err);
            setError('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src={imglogin} alt="Login Illustration" />
                </div>
                <div className="login-right">
                    <h2>Quên mật khẩu</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email hoặc Số Điện Thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập username"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Gửi</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
