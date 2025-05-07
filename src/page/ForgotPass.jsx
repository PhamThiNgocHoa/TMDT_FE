import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay useHistory thành useNavigate
import '../assets/css/login.css';
import imglogin from '../assets/image/imagelogin.png';

const ForgotPass = () => {


    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src={imglogin} alt="Login Illustration" />
                </div>
                <div className="login-right">
                    <h2>Quên mật khẩu</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Email hoặc Số Điện Thoại</label>
                            <input
                                type="text"
                                placeholder="Nhập email hoặc số điện thoại"

                            />
                        </div>
                        <button type="submit">Gửi</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;