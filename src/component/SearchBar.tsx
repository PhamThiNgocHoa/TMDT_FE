"use client";
import React from "react";
import "../assets/css/header.css";
import { SearchIcon } from "../assets/icons/SearchIcon";

export const SearchBar = () => {
    return (
        <div className="searchContainer">
            <input
                type="text"
                className="searchPlaceholder"
                placeholder="Bạn muốn tìm kiếm gì ?"
            /> <SearchIcon/>
        </div>
    );
};
