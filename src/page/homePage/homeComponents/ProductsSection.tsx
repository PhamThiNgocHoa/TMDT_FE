import React, {useEffect} from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/productSection.css';
import {useNavigate} from 'react-router-dom';
import useProduct from "../../../hooks/useProduct";

const ProductsSection: React.FC = () => {
    const navigate = useNavigate();
    const {fetchGetListProduct, products} = useProduct();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchGetListProduct();
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, [fetchGetListProduct]);

    const handleProductClick = (productId: number) => {
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
                {products && products.length > 0 ? (
                    products.map((product)=>(
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={() => handleProductClick(product.id)}
                        />
                    ))

                ): (
                    <span>Không có sản phẩm</span>

                )}
            </div>

            <div className="view-all-container">
                <button className="btn btn-primary">Xem Tất Cả Sản Phẩm</button>
            </div>
        </section>
    );
};

export default ProductsSection;
