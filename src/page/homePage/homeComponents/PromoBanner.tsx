import React from 'react';
import '../../../assets/css/homeStyles/promoBanner.css';

const PromoBanner: React.FC = () => {
    return (
        <div className="promo-banner">
            <div className="container">
                <div className="promo-content">
                    <div className="promo-left">
                        <div className="brand-logo">
                            <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/Jjrb5Zp7RW.png" alt="Steelseries" />
                            <span className="brand-name">Steelseries</span>
                        </div>
                        <h2 className="promo-title">Up to 10% off Voucher</h2>
                        <a href="#" className="promo-link">
                            <span>Mua ngay</span>
                            <span className="arrow-icon">→</span>
                        </a>
                    </div>
                    <div className="promo-right">
                        <img
                            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/0b020a61-8cd4-4b78-9075-58395e125516.png"
                            alt="Promo product"
                            className="promo-image"
                        />
                        <div className="promo-indicators">
                            <span className="indicator active"></span>
                            <span className="indicator"></span>
                            <span className="indicator"></span>
                            <span className="indicator"></span>
                            <span className="indicator"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;
