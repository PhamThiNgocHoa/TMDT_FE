import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import GoogleIcon from '../../assets/image/iconGoogle.png';
import imglogin from '../../assets/image/imagelogin.png';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        if (!fullname || !username || !email || !phone || !password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, username, email, password, phone }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công!',
                    text: 'Bạn có thể đăng nhập ngay bây giờ.',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                const data = await response.json();
                setError(data.message || 'Đăng ký thất bại');
            }
        } catch (err: any) {
            console.error('Lỗi kết nối:', err);
            setError('Không thể kết nối đến máy chủ');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src={imglogin} alt="Login Illustration" />
                </div>
                <div className="login-right">
                    <h2>Tạo tài khoản</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input
                                type="text"
                                placeholder="Nhập họ tên"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên đăng nhập</label>
                            <input
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <button type="submit">Tạo tài khoản</button>



                        <div className="forgot-password">
                            Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
