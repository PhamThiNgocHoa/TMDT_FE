import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import { flashSaleProducts } from '../data/products';
import '../../../assets/css/homeStyles/flashSale.css';
import { useNavigate } from 'react-router-dom';
import useProduct from "../../../hooks/useProduct";

const FlashSaleSection: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56
    });
    const navigate = useNavigate();
    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const {saleProducts} = useProduct();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { days, hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes -= 1;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours -= 1;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days -= 1;
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="section flash-sale-section">
            <div className="flash-sale-header">
                <SectionHeader
                    label="Hôm nay"
                    title="Flash Sales"
                />
                <div className="countdown-timer">
                    <div className="timer-unit">
                        <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="timer-label">Ngày</span>
                    </div>
                    <div className="timer-separator">:</div>
                    <div className="timer-unit">
                        <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="timer-label">Giờ</span>
                    </div>
                    <div className="timer-separator">:</div>
                    <div className="timer-unit">
                        <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="timer-label">Phút</span>
                    </div>
                    <div className="timer-separator">:</div>
                    <div className="timer-unit">
                        <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="timer-label">Giây</span>
                    </div>
                </div>

                <div className="navigation-buttons">
                    <button className="nav-btn prev-btn">
                        <span className="icon">←</span>
                    </button>
                    <button className="nav-btn next-btn">
                        <span className="icon">→</span>
                    </button>
                </div>
            </div>

            <div className="products-slider">
                {saleProducts && saleProducts.length > 0 && saleProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={() => handleProductClick(product.id.toString())}
                    />
                ))}
            </div>

            <div className="view-all-container">
                <button className="btn btn-primary">Xem Tất Cả Sản Phẩm</button>
            </div>
        </section>
    );
};

export default FlashSaleSection;
