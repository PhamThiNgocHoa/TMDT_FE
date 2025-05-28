import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import imglogin from '../../assets/image/imagelogin.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useCustomer from "../../hooks/useCustomer";

const MySwal = withReactContent(Swal);

const ForgotPass: React.FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const { fetchInitPasswordReset } = useCustomer();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputValue) return;

        try {
            const response = await fetchInitPasswordReset(inputValue);

            if (response?.code === 200) {
                MySwal.fire({
                    title: 'Thành công!',
                    text: response.message || 'Mã xác nhận đã được gửi. Kiểm tra email/SĐT để tiếp tục.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => navigate(`/resetpass/${inputValue}`));
            }
        } catch (err) {
            console.error(err);
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
