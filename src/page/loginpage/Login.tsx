import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay useHistory thành useNavigate
import '../../assets/css/login.css';
import imglogin from '../../assets/image/imagelogin.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === '12345') {
            navigate('/home');
        } else {
            alert('Thông tin đăng nhập sai');
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
                        <button type="submit" onClick={handleLogin}>Đăng nhập</button>
                        <div className="forgot-password">
                            <a href="/forgotpass">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;