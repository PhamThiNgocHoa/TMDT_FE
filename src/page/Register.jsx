import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import GoogleIcon from '../assets/image/iconGoogle.png';
import imglogin from '../assets/image/imagelogin.png';

const Register = () => {


    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src={imglogin} alt="Login Illustration" />
                </div>
                <div className="login-right">
                    <h2>Tạo tài khoản</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input
                                type="text"
                                placeholder="Nhập họ tên"

                            />
                        </div>
                        <div className="form-group">
                            <label>Email hoặc Số Điện Thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập email hoặc số điện thoại"

                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"

                            />
                        </div>
                        <button type="submit">Tạo tài khoản</button>
                        <button className="btn-google" type="submit">
                            <img
                                src={GoogleIcon}
                                alt="Google Logo"
                                style={{ width: '15px', height: '15px', marginRight: '10px' }}
                            />
                            Đăng kí bằng Google
                        </button>
                        {/*<button className="btn-google" type="submit"> Đăng kí bằng Google</button>*/}
                        <div className="forgot-password">
                            Bạn đã có tài khoản     <a href="/login">Đăng nhập</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;