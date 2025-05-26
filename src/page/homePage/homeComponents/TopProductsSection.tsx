import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import { topProducts } from '../data/products';
import '../../../assets/css/homeStyles/topProductsSection.css';
import {useNavigate} from "react-router-dom";
import { Product } from '../types/product';
import useProduct from "../../../hooks/useProduct";


const TopProductsSection: React.FC = () => {
    const navigate = useNavigate();
    const {products} = useProduct();

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

            <div className="top-products-grid">
                {topProducts.map((products) => (
                    <ProductCard
<<<<<<< HEAD
                        key={product.id}
                        product={product}
                        onProductClick={() => handleProductClick(product.id.toString())}
=======
                        key={products.id}
                        product={products}
                        onProductClick={() => handleProductClick(products.id)}
>>>>>>> 2a63fcf381949e5cf14217beecd7905fc1fc1a96

                    />
                ))}
            </div>
        </section>
    );
};

export default TopProductsSection;
