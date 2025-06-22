import React, {useEffect, useState} from 'react';
import useProduct from "../../../hooks/useProduct";
import useCategory from "../../../hooks/useCategory";
import formatToVND from "../../../hooks/formatToVND";

interface Filters {
    inStock: boolean | null;
    priceRange: { min: number; max: number };
    categoryId: number;
    type: string;
}

interface SelectedFilters {
    [key: string]: boolean | number | string | undefined;
}

const ProductsSection: React.FC = () => {
    const {products, setProducts} = useProduct();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>(''); // '' = không sắp xếp
    const {categories} = useCategory();
    const [visibleProducts, setVisibleProducts] = useState<number>(16);
    const [filters, setFilters] = useState<Filters>({
        inStock: null,
        priceRange: {min: 0, max: 100000000},
        categoryId: 0,
        type: '',
    });

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false); // State kiểm soát việc ẩn/hiện filters

    const handleLoadMore = () => {
        setVisibleProducts(prev => prev + 16);
    };


    const applyFilters = () => {
        let filtered = products.filter(product => {
            return (
                (filters.inStock === null || product.inStock === filters.inStock) &&
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max &&
                (filters.categoryId === 0 || product.categoryId === filters.categoryId) &&
                (filters.type === '' || product.type === filters.type)
            );
        });

        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

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
            priceRange: {min: 0, max: 100000000},
            categoryId: 0,
            type: '',
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
                        <h4>Danh mục</h4>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${filters.categoryId === category.id ? 'active' : ''}`}
                                onClick={() => handleFilterChange('categoryId', category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>


                    <div className="filter-group">
                        <h4>Lọc theo Giá</h4>
                        <div className="price-range">
                            <label>
                                Từ: <strong>{formatToVND(filters.priceRange.min)}</strong>
                                <input
                                    type="range"
                                    min="0"
                                    max="100000000"
                                    step="100000"
                                    value={filters.priceRange.min}
                                    onChange={(e) => handlePriceChange(e, 'min')}
                                    className="price-range-slider"
                                />
                            </label>
                            <label>
                                Đến: <strong>{formatToVND(filters.priceRange.max)}</strong>
                                <input
                                    type="range"
                                    min="0"
                                    max="100000000"
                                    step="100000"
                                    value={filters.priceRange.max}
                                    onChange={(e) => handlePriceChange(e, 'max')}
                                    className="price-range-slider"
                                />
                            </label>
                        </div>

                        <div className="sort-options"
                             style={{display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0'}}>
                            <label htmlFor="sortPrice" style={{fontWeight: 'bold', fontSize: '16px'}}>
                                Sắp xếp theo giá:
                            </label>
                            <select
                                id="sortPrice"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
                                style={{
                                    padding: '8px 12px',
                                    fontSize: '14px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">Không sắp xếp</option>
                                <option value="asc">Tăng dần</option>
                                <option value="desc">Giảm dần</option>
                            </select>
                        </div>

                    </div>
                    <div className="filter-group">
                        <h4>Loại sản phẩm</h4>
                        {['Handbook', 'Custom', 'Handbook-custom'].map((t) => (
                            <button
                                key={t}
                                className={`filter-btn ${filters.type === t ? 'active' : ''}`}
                                onClick={() => handleFilterChange('type', t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="selected-filters">
                        <div><h3>Tiêu chí đã chọn:</h3></div>
                        <div className="selected-filters-list">
                            {Object.keys(selectedFilters).map((filterKey) => {
                                const value = selectedFilters[filterKey as keyof SelectedFilters];

                                if (filterKey === 'inStock') {
                                    return (
                                        <span key={filterKey} className="selected-filter-item">
                                            {value ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                    );
                                }

                                if (filterKey === 'categoryId') {
                                    const category = categories.find(c => c.id === value);
                                    return (
                                        <span key={filterKey} className="selected-filter-item">
                                            Danh mục: {category?.name}
                                        </span>
                                    );
                                }

                                if (filterKey === 'type') {
                                    return (
                                        <span key={filterKey} className="selected-filter-item">
                                            Loại: {value}
                                        </span>
                                    )
                                }

                                return null;
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
