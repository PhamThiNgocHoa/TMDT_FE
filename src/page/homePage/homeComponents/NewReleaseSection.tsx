import React from 'react';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/newReleaseSection.css';

const NewReleaseSection: React.FC = () => {
    return (
        <section className="section new-release-section">
            <SectionHeader
                label="Đề xuất"
                title="Mới ra mắt"
            />

            <div className="new-release-grid">
                <div className="featured-item large">
                    <div className="featured-image">
                        <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/kVtpu0p7pk.png" alt="PlayStation 5" />
                    </div>
                    <div className="featured-content">
                        <h3 className="featured-title">PlayStation 5</h3>
                        <p className="featured-description">Phiên bản đen trắng của PS5 sắp được bán.</p>
                        <a href="#" className="featured-link">
                            <span>Xem ngay</span>
                            <div className="underline"></div>
                        </a>
                    </div>
                </div>

                <div className="featured-column">
                    <div className="featured-item medium">
                        <div className="featured-image">
                            <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/ae289249-b746-4217-a29e-45b30d0f1a28.png" alt="Bàn Phím Cơ" />
                        </div>
                        <div className="featured-content">
                            <h3 className="featured-title">Bàn Phím Cơ</h3>
                            <p className="featured-description">Bộ sưu tập bàn phím cơ</p>
                            <a href="#" className="featured-link">
                                <span>Xem ngay</span>
                                <div className="underline"></div>
                            </a>
                        </div>
                    </div>

                    <div className="featured-row">
                        <div className="featured-item small">
                            <div className="featured-image">
                                <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/V5O7M4Fc3m.png" alt="Loa Bluetooth" />
                            </div>
                            <div className="featured-content">
                                <h3 className="featured-title">Loa Bluetooth</h3>
                                <p className="featured-description">Loa không dây Amazon</p>
                                <a href="#" className="featured-link">
                                    <span>Xem ngay</span>
                                    <div className="underline"></div>
                                </a>
                            </div>
                        </div>

                        <div className="featured-item small">
                            <div className="featured-image">
                                <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/wubmsKhhdh.png" alt="Tai Nghe" />
                            </div>
                            <div className="featured-content">
                                <h3 className="featured-title">Tai Nghe</h3>
                                <p className="featured-description">Tai nghe Blaster</p>
                                <a href="#" className="featured-link">
                                    <span>Xem ngay</span>
                                    <div className="underline"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewReleaseSection;
