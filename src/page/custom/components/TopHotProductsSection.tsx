import React, {useState} from "react";
import useProduct from "../../../hooks/useProduct";
import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import {Link} from "react-router-dom";
import formatToVND from "../../../hooks/formatToVND";
import FilterBox from "./FilterBox";

interface Props {
    selectedCategory: string;
}

const TopHotProductsSection: React.FC<Props> = ({selectedCategory}) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [category, setCategory] = useState("");
    const {products} = useProduct();
    const [showAll, setShowAll] = useState(false);


    const clearFilters = () => {
        setInStockOnly(false);
        setMinPrice(null);
        setMaxPrice(null);
        setCategory("");
    };

    const hotProducts = (products || []).filter((p) => p.hot === true
        && p.type === "Handbook"
        && (selectedCategory === "" || p.categoryName === selectedCategory));

    const filteredProducts = hotProducts
        .filter((p) => (inStockOnly ? p.inStock === true : true))
        .filter((p) => (minPrice !== null ? p.price >= minPrice : true))
        .filter((p) => (maxPrice !== null ? p.price <= maxPrice : true))
        .filter((p) => (category ? p.categoryName === category : true));

    return (
        <section className="custom-top-hot-section">
            <div className="custom-filter-row" style={{position: "relative"}}>
                <button
                    className="custom-filter-btn"
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <span role="img" aria-label="filter">⚙️</span> Bộ lọc
                </button>
                <FilterBox
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    category={category}
                    setCategory={setCategory}
                />
            </div>

            {(inStockOnly || minPrice !== null || maxPrice !== null || category) && (
                <div className="custom-filter-selected-row">
                    <span className="custom-filter-label">Tiêu chí đã chọn:</span>
                    {inStockOnly && <span className="custom-filter-chip">Còn hàng</span>}
                    {(minPrice !== null || maxPrice !== null) && (
                        <span className="custom-filter-chip">
              {minPrice ?? "0"}đ - {maxPrice ?? "∞"}đ
            </span>
                    )}
                    {category && <span className="custom-filter-chip">{category}</span>}
                    <button
                        onClick={clearFilters}
                        style={{
                            width: "140px",
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginLeft: "12px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d9363e")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4f")}
                    >
                        Xóa bộ lọc
                    </button>

                </div>
            )}

            <div className="custom-top-hot-header">
                <SectionHeader label="Tháng này" title="Top Sản Phẩm Hot"/>
                {filteredProducts.length > 5 && (
                    <button
                        className="custom-view-all small"
                        onClick={() => setShowAll(!showAll)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            backgroundColor: "#d52a2a",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#af2929")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#c31d1d")}
                    >
                        {showAll ? "Ẩn bớt" : "Xem Tất Cả"}
                    </button>
                )}

            </div>
            <div className="custom-product-list">
                {(showAll ? filteredProducts : filteredProducts.slice(0, 5)).map((p) => (
                    <Link
                        to={`/product/${p.id}`}
                        key={p.id}
                        className="custom-product-card"
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <div className="custom-product-img">
                            <img src={p.img} alt={p.name}/>
                            <div className="custom-product-icons">
                                <span>♥</span>
                                <span>👁</span>
                            </div>
                        </div>
                        <div className="custom-product-name">{p.name}</div>
                        <div className="custom-product-price">{formatToVND(p.price)}</div>
                        <div className="custom-product-rating">
                            {"★".repeat(Math.round(5))}
                            <span className="custom-product-reviews">(10)</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default TopHotProductsSection;