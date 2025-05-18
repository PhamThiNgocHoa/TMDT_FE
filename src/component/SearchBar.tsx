"use client";
import React, { useState, useEffect } from "react";
import "../assets/css/header.css";
import { SearchIcon } from "../assets/icons/SearchIcon";

// Fake product data for search results
const fakeProducts = [
    {
        id: '1',
        name: 'Laptop MSI Modern 15',
        price: '18.490.000₫',
        discountedPrice: '10.990.000₫',
        imageUrl: 'https://via.placeholder.com/50x50', // Placeholder image URL
    },
    {
         id: '2',
        name: 'Laptop Dell XPS 13',
        price: '30.000.000₫',
        discountedPrice: '25.000.000₫',
        imageUrl: 'https://via.placeholder.com/50x50',
    },
     {
         id: '3',
        name: 'Laptop HP Spectre x360',
        price: '35.000.000₫',
        discountedPrice: '30.000.000₫',
        imageUrl: 'https://via.placeholder.com/50x50',
    },
     {
         id: '4',
        name: 'Máy tính bảng Samsung',
        price: '15.000.000₫',
        discountedPrice: '12.000.000₫',
        imageUrl: 'https://via.placeholder.com/50x50',
    },
];

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<typeof fakeProducts>([]); // Use typeof fakeProducts for type safety
    const [showResults, setShowResults] = useState(false);

    // Simulate search functionality (replace with actual API call)
    const fakeSearch = (term: string) => {
        if (term.trim() === '') {
            setSearchResults([]);
             setShowResults(false);
            return;
        }
        console.log('Searching for:', term);
         // Filter fake data based on term (case-insensitive)
        const filteredResults = fakeProducts.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredResults);
         setShowResults(true); // Show results when there are results
    };

    useEffect(() => {
        // Debounce could be added here for performance in a real app
        const handler = setTimeout(() => {
            fakeSearch(searchTerm);
        }, 300); // Simulate debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]); // Re-run effect when searchTerm changes

    // Hide results when clicking outside (basic implementation)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
             // You might need a more robust way to check if click is outside both input and results
             // For simplicity, hide when clicking anywhere outside for now
            // if (/* check if click is outside search bar and results */) {
            //     setShowResults(false);
            // }
        };

        // window.addEventListener('click', handleClickOutside);
        // return () => {
        //     window.removeEventListener('click', handleClickOutside);
        // };
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        // setShowResults(true); // Optionally show results immediately on input
    };

    const handleInputFocus = () => {
        // Show results when input is focused, if there's a search term
         if (searchTerm.trim() !== '') {
             setShowResults(true);
         }
    };

     const handleResultClick = (productId: string) => {
         console.log('Clicked product:', productId);
         // Implement navigation to product details page
         setShowResults(false); // Hide results after clicking
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
                 onBlur={() => setTimeout(() => setShowResults(false), 100)} // Hide results on blur, with a slight delay to allow click
            />
            <SearchIcon/>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
                <div className="searchResultsDropdown">
                    {searchResults.map(product => (
                        <div 
                            key={product.id} 
                            className="searchResultItem"
                             onClick={() => handleResultClick(product.id)} // Add click handler
                        >
                            <img src={product.imageUrl} alt={product.name} className="searchResultImage" />
                            <div className="searchResultInfo">
                                <div className="searchResultName">{product.name}</div>
                                <div className="searchResultPrices">
                                    <span className="searchResultDiscountedPrice">{product.discountedPrice}</span>
                                    <span className="searchResultOriginalPrice">{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};
