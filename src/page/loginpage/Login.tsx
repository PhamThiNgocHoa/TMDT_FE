import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../assets/css/login.css';
import imglogin from '../../assets/image/imagelogin.png';
import useCustomer from "../../hooks/useCustomer";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {handleLogin} = useCustomer();
    const navigate = useNavigate();

    // Handle login and navigate to home if success
    const handleLogins = async (e: React.FormEvent) => {
        e.preventDefault();  // Ngừng hành động mặc định của form

        setError('');
        try {
            await handleLogin(username, password);
            // Điều hướng tới trang home sau khi đăng nhập thành công
            navigate('/home');
        } catch (err: any) {
            setError('Đăng nhập thất bại!');
            console.error("Error:", err);  // Log lỗi chi tiết để debug
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src={imglogin} alt="Login Illustration"/>
                </div>
                <div className="login-right">
                    <h2>Đăng nhập</h2>
                    <form onSubmit={handleLogins}>
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
                        <button type="submit">Đăng nhập</button>
                        {error && <div className="error">{error}</div>}
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
