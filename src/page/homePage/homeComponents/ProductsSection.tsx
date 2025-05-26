import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import { allProducts } from '../data/products';
import '../../../assets/css/homeStyles/productSection.css';
import { useNavigate } from 'react-router-dom';

const ProductsSection: React.FC = () => {
    const navigate = useNavigate();

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };
    return (
        <section className="section products-section">
            <div className="products-header">
                <SectionHeader
                    label="Sản Phẩm Của Chúng Ta"
                    title="Khám phá các sản phẩm của chúng tôi"
                />

                <div className="navigation-buttons">
                    <button className="nav-btn prev-btn">
                        <span className="icon">←</span>
                    </button>
                    <button className="nav-btn next-btn">
                        <span className="icon">→</span>
                    </button>
                </div>
            </div>

            <div className="products-grid">
                {allProducts.slice(0, 8).map(product => (
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

export default ProductsSection;
