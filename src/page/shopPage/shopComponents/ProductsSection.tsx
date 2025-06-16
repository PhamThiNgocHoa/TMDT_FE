import React, {useEffect, useState} from 'react';
import useProduct from "../../../hooks/useProduct";
import useCategory from "../../../hooks/useCategory";

interface Filters {
    inStock: boolean | null;
    priceRange: { min: number; max: number };
    rating: number;
    categoryName: string;
}

interface SelectedFilters {
    [key: string]: boolean | number | string | undefined;
}

const ProductsSection: React.FC = () => {
    const {products, setProducts} = useProduct();
    const {categories} = useCategory();
    const [visibleProducts, setVisibleProducts] = useState<number>(16);
    const [filters, setFilters] = useState<Filters>({
        inStock: null,
        priceRange: {min: 0, max: 1000000},
        rating: 1,
        categoryName: ''
    });
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false); // State kiểm soát việc ẩn/hiện filters

    const handleLoadMore = () => {
        setVisibleProducts(prev => prev + 16);
    };


    const applyFilters = () => {
        const filtered = products.filter(product => {
            return (
                (filters.inStock === null || product.inStock === filters.inStock) &&
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max &&
                // product.ratings >= filters.rating &&
                (filters.categoryName === '' || product.categoryName === filters.categoryName)
            );
        });
        return filtered;
    };

    const handleFilterChange = (filterType: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));

        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleApplyFilters = () => {
        setIsFiltered(true);
    };

    const handleResetFilters = () => {
        setFilters({
            inStock: null,
            priceRange: {min: 0, max: 1000000},
            rating: 1,
            categoryName: ''
        });
        setSelectedFilters({});
        setIsFiltered(false);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const newPriceRange = {...filters.priceRange, [type]: parseInt(e.target.value)};
        setFilters(prev => ({...prev, priceRange: newPriceRange}));
    };

    const filteredProducts = isFiltered ? applyFilters() : products;

    const toggleFilters = () => {
        setIsFiltersVisible(prev => !prev); // Đổi trạng thái ẩn/hiện filters
    };

    return (
        <section className="section products-section">
            <div className="products-header" onClick={toggleFilters}>
                <h3>Bộ lọc sản phẩm</h3>
            </div>

            {isFiltersVisible && ( // Chỉ hiển thị filters khi isFiltersVisible là true
                <div className="filters">
                    <div className="filter-group">
                        <h4>Tình trạng</h4>
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
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                className={`filter-btn ${filters.rating === rating ? 'active' : ''}`}
                                onClick={() => handleFilterChange('rating', rating)}
                            >
                                {[...Array(rating)].map((_, index) => (
                                    <span key={index} style={{color: 'gold', fontSize: '20px'}}>
                                        ★
                                    </span>
                                ))}
                            </button>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4>Danh mục</h4>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${filters.categoryName === category.name ? 'active' : ''}`}
                                onClick={() => handleFilterChange('categoryName', category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>


                    <div className="filter-group">
                        <h4>Lọc theo Giá</h4>
                        <div className="price-range">
                            <label>
                                Từ: {filters.priceRange.min} VND
                                <input
                                    type="range"
                                    min="0"
                                    max="1000000"
                                    value={filters.priceRange.min}
                                    onChange={(e) => handlePriceChange(e, 'min')}
                                    className="price-range-slider"
                                />
                            </label>
                            <label>
                                Đến: {filters.priceRange.max} VND
                                <input
                                    type="range"
                                    min="0"
                                    max="1000000"
                                    value={filters.priceRange.max}
                                    onChange={(e) => handlePriceChange(e, 'max')}
                                    className="price-range-slider"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="selected-filters">
                        <div><h3>Tiêu chí đã chọn:</h3></div>
                        <div className="selected-filters-list">
                            {Object.keys(selectedFilters).map((filterKey) => {
                                const value = selectedFilters[filterKey as keyof SelectedFilters];
                                return (
                                    <span key={filterKey} className="selected-filter-item">
                                        {filterKey === 'inStock' ? (value ? 'Còn hàng' : 'Hết hàng') :
                                            filterKey === 'rating' ? `${value} sao` :
                                                filterKey === 'categoryName' ? value :
                                                    ''}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="filter-buttons">
                        <button className="btn btn-primary" onClick={handleApplyFilters}>
                            Lọc
                        </button>
                        <button className="btn btn-secondary" onClick={handleResetFilters}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}

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
                                <img src={product.img} alt={product.name} className="product-image"/>
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
