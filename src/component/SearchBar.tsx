import React, { useState, useEffect } from "react";
import "../assets/css/header.css";
import { SearchIcon } from "../assets/icons/SearchIcon";
import {listFindByName, searchProduct} from "../server/api/product/product.get"; // ✅ Import API
import { ProductResponse } from "../models/response/ProductResponse";
import {useNavigate} from "react-router-dom"; // ✅ Kiểu dữ liệu thật

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ProductResponse[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    const performSearch = async (term: string) => {
        if (term.trim() === '') {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        try {
            const results = await listFindByName(term);
            setSearchResults(results);
            setShowResults(true);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            performSearch(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleInputFocus = () => {
        if (searchResults.length > 0) setShowResults(true);
    };

    const handleResultClick = (productId: number) => {
        navigator(`/product/${productId}`);
        setShowResults(false);
    };

    return (
        <div className="searchContainer">
            <input
                type="text"
                className="searchPlaceholder"
                placeholder="Bạn muốn tìm kiếm gì ?"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={() => setTimeout(() => setShowResults(false), 100)}
            />
            <SearchIcon/>

            {showResults && (
                <div className="searchResultsDropdown">

                    {loading ? (
                        <div className="searchLoading">Đang tìm kiếm...</div>
                    ) : searchResults.length === 0 ? (
                        <div className="searchNoResult">Không tìm thấy sản phẩm</div>
                    ) : (
                        searchResults.map(product => (
                            <div
                                key={product.id}
                                className="searchResultItem"
                                onClick={() => handleResultClick(product.id)}
                            >
                                <img src={product.img} alt={product.name} className="searchResultImage" />
                                <div className="searchResultInfo">
                                    <div className="searchResultName">{product.name}</div>
                                    <div className="searchResultPrices">
                                        <span className="searchResultDiscountedPrice">{product.discount}</span>
                                        <span className="searchResultOriginalPrice">{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
