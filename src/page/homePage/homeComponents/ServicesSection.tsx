import React from 'react';
import '../../../assets/css/homeStyles/servicesSection.css';

const ServicesSection: React.FC = () => {
    return (
        <section className="section services-section">
            <div className="services-grid">
                <div className="service-card">
                    <div className="service-icon">
                        <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/Kuu1Y30WnH.png" alt="Delivery" />
                    </div>
                    <h3 className="service-title">GIAO HÀNG MIỄN PHÍ VÀ NHANH CHÓNG</h3>
                    <p className="service-description">Giao hàng miễn phí cho tất cả các đơn hàng trên $140</p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/3bR5kyQOpT.png" alt="Customer Service" />
                    </div>
                    <h3 className="service-title">DỊCH VỤ KHÁCH HÀNG 24/7</h3>
                    <p className="service-description">Hỗ trợ khách hàng thân thiện 24/7</p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/FsrwH4Bgzz.png" alt="Money Back" />
                    </div>
                    <h3 className="service-title">ĐẢM BẢO HOÀN TIỀN</h3>
                    <p className="service-description">Chúng tôi hoàn lại tiền trong vòng 30 ngày</p>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
