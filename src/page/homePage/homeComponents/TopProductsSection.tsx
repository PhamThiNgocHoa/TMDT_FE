import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/topProductsSection.css';
import {useNavigate} from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import Shimmer from '../../../component/Shimmer';

const TopProductsSection: React.FC = () => {
    const [showAllProducts, setShowAllProducts] = useState(false);
    const navigate = useNavigate();
    const {products, loading} = useProduct();
    
    // Lọc sản phẩm hot và đảm bảo có dữ liệu
    const hotProducts = products ? products.filter(product => product.hot === true) : [];

    // Lấy 4 sản phẩm đầu tiên để hiển thị ban đầu
    const initialProducts = hotProducts.slice(0, 4);
    const allProducts = hotProducts;

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const handleViewAllClick = () => {
        setShowAllProducts(!showAllProducts);
    };

    // Nếu đang loading, hiển thị shimmer
    if (loading) {
        return (
            <section className="section top-products-section">
                <div className="top-products-header">
                    <SectionHeader
                        label="Tháng này"
                        title="Top Sản Phẩm Hot"
                    />
                </div>
                <div className="top-products-grid">
                    <Shimmer type="product-card" count={4} />
                </div>
            </section>
        );
    }

    // Nếu không có sản phẩm hot, không hiển thị section
    if (hotProducts.length === 0) {
        return null;
    }

    return (
        <section className="section top-products-section">
            <div className="top-products-header">
                <SectionHeader
                    label="Tháng này"
                    title="Top Sản Phẩm Hot"
                />

                {allProducts.length > 4 && (
                    <div className="view-all-container">
                        <button 
                            className="btn btn-primary"
                            onClick={handleViewAllClick}
                        >
                            {showAllProducts ? 'Thu gọn' : 'Xem Tất Cả Sản Phẩm'}
                        </button>
                    </div>
                )}
            </div>
            
            <div className="top-products-grid">
                {(showAllProducts ? allProducts : initialProducts).map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={() => handleProductClick(product.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default TopProductsSection;
