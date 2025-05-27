import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    img: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    productNew?: boolean;
    inStock: boolean;
    rating: number;
    brand: string;
}

interface Filters {
    inStock: boolean | null;
    priceRange: { min: number; max: number };
    rating: number;
    brand: string;
}

interface SelectedFilters {
    [key: string]: boolean | number | string | undefined;  // Cho phép index bất kỳ kiểu string
}

const ProductsSection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(16);
    const [filters, setFilters] = useState<Filters>({
        inStock: null,
        priceRange: { min: 0, max: 1000000 },
        rating: 1,
        brand: ''
    });
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

    useEffect(() => {
        const dummyProducts: Product[] = Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            name: `Sản phẩm ${index + 1}`,
            img: 'https://via.placeholder.com/250x250',
            price: 500000 + index * 10000,
            originalPrice: 600000 + index * 10000,
            discount: '10%',
            productNew: index % 2 === 0,
            inStock: index % 2 === 0,
            rating: Math.floor(Math.random() * 5) + 1,
            brand: index % 2 === 0 ? 'Brand A' : 'Brand B'
        }));

        setProducts(dummyProducts);
    }, []);

    // Hàm lọc sản phẩm
    const applyFilters = () => {
        const filtered = products.filter(product => {
            return (
                (filters.inStock === null || product.inStock === filters.inStock) &&
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max &&
                product.rating >= filters.rating &&
                (filters.brand === '' || product.brand === filters.brand)
            );
        });
        return filtered;
    };

    // Hàm cập nhật bộ lọc
    const handleFilterChange = (filterType: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));

        // Cập nhật các bộ lọc đã chọn
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Hàm xử lý khi nhấn "Xem thêm"
    const handleLoadMore = () => {
        setVisibleProducts(prev => prev + 16);
    };

    const filteredProducts = applyFilters();

    return (
        <section className="section products-section">
            <div className="products-header">
                <h2>Bộ lọc</h2>
            </div>

            {/* Hiển thị tiêu chí đã chọn */}
            <div className="selected-filters">
                <h3>Tiêu chí đã chọn:</h3>
                <div className="selected-filters-list">
                    {Object.keys(selectedFilters).map((filterKey) => {
                        const value = selectedFilters[filterKey as keyof SelectedFilters];  // Chỉ định kiểu để tránh lỗi
                        return (
                            <span key={filterKey} className="selected-filter-item">
                                {filterKey === 'inStock' ? (value ? 'Còn hàng' : 'Hết hàng') :
                                    filterKey === 'rating' ? `${value} sao` :
                                        filterKey === 'brand' ? value :
                                            ''}
                                <button
                                    onClick={() => handleFilterChange(filterKey, filterKey === 'inStock' ? null : '')}
                                    className="clear-filter-btn"
                                >
                                    X
                                </button>
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Các nút lọc */}
            <div className="filters">
                <div className="filter-group">
                    <h4>Còn Hàng</h4>
                    <button
                        className={`filter-btn ${filters.inStock === true ? 'active' : ''}`}
                        onClick={() => handleFilterChange('inStock', true)}
                    >
                        Còn hàng
                    </button>
                    <button
                        className={`filter-btn ${filters.inStock === false ? 'active' : ''}`}
                        onClick={() => handleFilterChange('inStock', false)}
                    >
                        Hết hàng
                    </button>
                </div>

                <div className="filter-group">
                    <h4>Đánh Giá</h4>
                    {[1, 2, 3, 4, 5].map(rating => (
                        <button
                            key={rating}
                            className={`filter-btn ${filters.rating === rating ? 'active' : ''}`}
                            onClick={() => handleFilterChange('rating', rating)}
                        >
                            {rating} sao
                        </button>
                    ))}
                </div>

                <div className="filter-group">
                    <h4>Thương Hiệu</h4>
                    {['Brand A', 'Brand B'].map(brand => (
                        <button
                            key={brand}
                            className={`filter-btn ${filters.brand === brand ? 'active' : ''}`}
                            onClick={() => handleFilterChange('brand', brand)}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                <button
                    className="btn btn-primary"
                    onClick={applyFilters}
                >
                    Lọc
                </button>
            </div>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, visibleProducts).map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                {product.discount && parseFloat(product.discount) > 0 && (
                                    <div className="discount-badge">
                                        -{product.discount}
                                    </div>
                                )}
                                <img src={product.img} alt={product.name} className="product-image" />
                            </div>

                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-price">
                                    <span className="current-price">
                                        {product.price.toLocaleString()} VND
                                    </span>
                                    {product.originalPrice && (
                                        <span className="original-price">
                                            {product.originalPrice.toLocaleString()} VND
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span>Không có sản phẩm phù hợp</span>
                )}
            </div>

            {visibleProducts < filteredProducts.length && (
                <div className="container-btn">
                    <button className="btn btn-primary" onClick={handleLoadMore}>
                        Xem Tất Cả Sản Phẩm
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProductsSection;
