import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/productSection.css';
import {useNavigate} from 'react-router-dom';
import useProduct from "../../../hooks/useProduct";
import Shimmer from '../../../component/Shimmer';

const ProductsSection: React.FC = () => {
    const [showAllProducts, setShowAllProducts] = useState(false);
    const navigate = useNavigate();
    const {products, loading} = useProduct();

    // Lấy 8 sản phẩm đầu tiên để hiển thị ban đầu
    const initialProducts = products.slice(0, 8);
    const allProducts = products;

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const handleViewAllClick = () => {
        setShowAllProducts(!showAllProducts);
    };

    return (
        <section className="section products-section">
            <div className="products-header">
                <SectionHeader
                    label="Sản Phẩm Của Chúng Ta"
                    title="Khám phá các sản phẩm của chúng tôi"
                />

                {allProducts.length > 8 && (
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

            <div className="products-grid">
                {loading ? (
                    <Shimmer type="product-card" count={8} />
                ) : allProducts && allProducts.length > 0 ? (
                    (showAllProducts ? allProducts : initialProducts).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={() => handleProductClick(product.id)}
                        />
                    ))
                ) : (
                    <span>Không có sản phẩm</span>
                )}
            </div>
        </section>
    );
};

export default ProductsSection;
