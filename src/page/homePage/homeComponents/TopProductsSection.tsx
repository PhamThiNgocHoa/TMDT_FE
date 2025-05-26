import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import { topProducts } from '../data/products';
import '../../../assets/css/homeStyles/topProductsSection.css';
import {useNavigate} from "react-router-dom";


const TopProductsSection: React.FC = () => {
    const navigate = useNavigate();
    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };
    return (
        <section className="section top-products-section">
            <div className="top-products-header">
                <SectionHeader
                    label="Tháng này"
                    title="Top Sản Phẩm Hot"
                />

                <div className="view-all-container">
                    <button className="btn btn-primary">Xem Tất Cả Sản Phẩm</button>
                </div>
            </div>

            <div className="top-products-grid">
                {topProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={() => handleProductClick(product.id.toString())}

                    />
                ))}
            </div>
        </section>
    );
};

export default TopProductsSection;
