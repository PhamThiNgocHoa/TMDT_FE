import React, { useState } from "react";
import useProduct from "../../../hooks/useProduct";
import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import { Link } from "react-router-dom";
import formatToVND from "../../../hooks/formatToVND";
import useCategory from "../../../hooks/useCategory";

const FilterBox = ({
                       open,
                       onClose,
                       inStockOnly,
                       setInStockOnly,
                       minPrice,
                       setMinPrice,
                       maxPrice,
                       setMaxPrice,
                       category,
                       setCategory,
                   }: {
    open: boolean;
    onClose: () => void;
    inStockOnly: boolean;
    setInStockOnly: (val: boolean) => void;
    minPrice: number | null;
    setMinPrice: (val: number | null) => void;
    maxPrice: number | null;
    setMaxPrice: (val: number | null) => void;
    category: string;
    setCategory: (val: string) => void;
}) => {
    const {categories} = useCategory();
    if (!open) return null;

    return (
        <div className={`custom-filter-dropdown${open ? " open" : ""}`}>
            <div className="custom-filter-popup">
                <div className="custom-filter-row custom-filter-popup-header">
                    <div className="custom-filter-group">
                        <span className="custom-filter-label">Tình trạng sản phẩm</span>
                        <button
                            className={`custom-filter-btn-option ${inStockOnly ? "active" : ""}`}
                            onClick={() => setInStockOnly(!inStockOnly)}
                        >
                            Còn hàng
                        </button>
                    </div>
                    <div className="custom-filter-group">
                        <span className="custom-filter-label">Giá</span>
                        <input
                            className="custom-filter-input"
                            placeholder="Từ..."
                            type="number"
                            onChange={(e) => setMinPrice(Number(e.target.value) || null)}
                            value={minPrice ?? ""}
                        />
                        <span style={{margin: "0 6px"}}>-</span>
                        <input
                            className="custom-filter-input"
                            placeholder="Đến..."
                            type="number"
                            onChange={(e) => setMaxPrice(Number(e.target.value) || null)}
                            value={maxPrice ?? ""}
                        />
                    </div>
                    <div className="custom-filter-group">
                        <span className="custom-filter-label">Danh mục</span>
                        <select
                            className="custom-filter-input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="custom-filter-close" onClick={onClose}>
                        X Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};
export default FilterBox;