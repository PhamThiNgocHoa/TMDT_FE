import React from 'react';
import '../assets/css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-left">
                    <h2>OrangeTech</h2>
                    <p>Theo dõi</p>
                    <p>Giảm 10% cho đơn hàng đầu tiên của bạn</p>
                    <div className="email-subscription">
                        <input type="email" placeholder="Nhập email của bạn" />
                        <button type="submit">→</button>
                    </div>
                </div>

                <div className="footer-center">
                    <h3>Hỗ trợ</h3>
                    <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p>exclusive@gmail.com</p>
                    <p>+88015-88888-9999</p>
                </div>

                <div className="footer-right">
                    <h3>Tài khoản</h3>
                    <p>Tài khoản của tôi</p>
                    <p>Đăng nhập / Đăng ký</p>
                    <p>Giỏ hàng</p>

                    <h3>Quick Link</h3>
                    <p>Chính sách quyền riêng tư</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Câu hỏi thường gặp</p>
                    <p>Liên hệ</p>

                    <div className="app-download">
                        <p>Tải ứng dụng</p>
                        <div className="qr-code">
                            <img src="/path/to/qr-code.png" alt="QR Code" />
                        </div>
                        <div className="download-buttons">
                            <a href="#" className="google-play">
                                <img src="/path/to/google-play.png" alt="Google Play" />
                            </a>
                            <a href="#" className="app-store">
                                <img src="/path/to/app-store.png" alt="App Store" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© Copyright Rimel 2025. All right reserved</p>
            </div>
        </footer>
    );
};

export default Footer;