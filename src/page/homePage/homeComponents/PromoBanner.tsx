import React, { useState, useEffect } from 'react';
import '../../../assets/css/homeStyles/promoBanner.css';

// Fake data for multiple banners
const promoBannersData = [
    {
        id: 1,
        brandLogo: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/Jjrb5Zp7RW.png',
        brandName: 'Steelseries',
        title: 'Up to 10% off Voucher',
        link: '#',
        imageUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/0b020a61-8cd4-4b78-9075-58395e125516.png',
    },
    {
        id: 2,
        brandLogo: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/Jjrb5Zp7RW.png',
        brandName: 'Logitech',
        title: 'New Arrivals - 15% off',
        link: '#',
        imageUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/0b020a61-8cd4-4b78-9075-58395e125516.png', // Use a different image if available
    },
    {
        id: 3,
        brandLogo: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/Jjrb5Zp7RW.png',
        brandName: 'Razer',
        title: 'Gaming Gear Sale!',
        link: '#',
        imageUrl: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-10/0b020a61-8cd4-4b78-9075-58395e125516.png', // Use a different image if available
    },
];

const PromoBanner: React.FC = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const intervalTime = 5000; // 5 seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex(prevIndex =>
                (prevIndex + 1) % promoBannersData.length
            );
        }, intervalTime);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [promoBannersData.length, intervalTime]);

    const currentBanner = promoBannersData[currentBannerIndex];

    return (
        <div className="promo-banner">
            <div className="container">
                <div className="promo-slider-container">
                    {promoBannersData.map((banner, index) => (
                        <div
                            key={banner.id}
                            className="promo-content"
                            style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
                        >
                            <div className="promo-left">
                                <div className="brand-logo">
                                    <img src={banner.brandLogo} alt={banner.brandName} />
                                    <span className="brand-name">{banner.brandName}</span>
                                </div>
                                <h2 className="promo-title">{banner.title}</h2>
                                <a href={banner.link} className="promo-link">
                                    <span>Mua ngay</span>
                                    <span className="arrow-icon">→</span>
                                </a>
                            </div>
                            <div className="promo-right">
                                <img
                                    src={banner.imageUrl}
                                    alt="Promo product"
                                    className="promo-image"
                                />
                                <div className="promo-indicators">
                                    {promoBannersData.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={`indicator ${idx === currentBannerIndex ? 'active' : ''}`}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;
