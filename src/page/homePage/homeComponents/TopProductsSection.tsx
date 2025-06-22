import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/topProductsSection.css';
import {useNavigate} from "react-router-dom";
import useProduct from "../../../hooks/useProduct";


const TopProductsSection: React.FC = () => {
    const navigate = useNavigate();
    const {products} = useProduct();
    const hotProducts = products.filter(product => product.hot === true);

    const handleProductClick = (productId: number) => {
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
            {hotProducts.length > 0 && (
                <div className="top-products-grid">
                    {hotProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={() => handleProductClick(product.id)}
                        />
                    ))}
                </div>
            )}

        </section>
    );
};

export default TopProductsSection;
