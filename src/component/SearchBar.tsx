import React, { useState, useEffect } from "react";
import "../assets/css/header.css";
import { SearchIcon } from "../assets/icons/SearchIcon";
<<<<<<< HEAD

// Fake product data for search results
const fakeProducts = [
    {
        id: 1,
        name: 'Laptop MSI Modern 15',
        price: '18.490.000₫',
        discountedPrice: '10.990.000₫',
        imageUrl: 'https://via.placeholder.com/50x50', // Placeholder image URL
    },
    {
         id: 2,
        name: 'Laptop Dell XPS 13',
        price: '30.000.000₫',
        discountedPrice: '25.000.000₫',
        imageUrl: 'https://via.placeholder.com/50x50',
    },
     {
         id: 3,
        name: 'Laptop HP Spectre x360',
        price: '35.000.000₫',
        discountedPrice: '30.000.000₫',
        imageUrl: 'https://via.placeholder.com/50x50',
    },
     {
         id: 4,
        name: 'Máy tính bảng Samsung',
        price: '15.000.000₫',
        discountedPrice: '12.000.000₫',
        imageUrl: 'https://via.placeholder.com/50x50',
    },
];
=======
import {listFindByName, searchProduct} from "../server/api/product/product.get"; // ✅ Import API
import { ProductResponse } from "../models/response/ProductResponse"; // ✅ Kiểu dữ liệu thật
>>>>>>> 2a63fcf381949e5cf14217beecd7905fc1fc1a96

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ProductResponse[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    // Thực hiện gọi API tìm kiếm sản phẩm
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

    // Debounce input để tránh gọi API liên tục
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
        console.log("Clicked product:", productId);
        // TODO: Bạn có thể điều hướng đến trang chi tiết tại đây
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
<<<<<<< HEAD
                    {searchResults.map(product => (
                        <div 
                            key={product.id} 
                            className="searchResultItem"
                             onClick={() => handleResultClick(product.id.toString())} // Add click handler
                        >
                            <img src={product.imageUrl} alt={product.name} className="searchResultImage" />
                            <div className="searchResultInfo">
                                <div className="searchResultName">{product.name}</div>
                                <div className="searchResultPrices">
                                    <span className="searchResultDiscountedPrice">{product.discountedPrice}</span>
                                    <span className="searchResultOriginalPrice">{product.price}</span>
=======
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
>>>>>>> 2a63fcf381949e5cf14217beecd7905fc1fc1a96
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
