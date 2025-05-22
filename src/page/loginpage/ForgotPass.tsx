import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import imglogin from '../../assets/image/imagelogin.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface User {
    id: number;
    email: string;
    phone: string;
}

const ForgotPass: React.FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fakeUsers: User[] = [
        { id: 1, email: 'test@example.com', phone: '0123456789' },
        { id: 2, email: 'admin@gmail.com', phone: '0987654321' },
        { id: 3, email: 'user@domain.com', phone: '0912345678' }
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userExists = fakeUsers.find(
            (user) => user.email === inputValue || user.phone === inputValue
        );

        if (!userExists) {
            setError('Tài khoản không tồn tại. Vui lòng kiểm tra lại!');
        } else {
            setError('');

            MySwal.fire({
                title: 'Thành công!',
                text: 'Đã tìm thấy tài khoản. Vui lòng kiểm tra email/SĐT để đặt lại mật khẩu.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/resetpass');
                }
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
                    <h2>Quên mật khẩu</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email hoặc Số Điện Thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập email hoặc số điện thoại"
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
