import React from "react";

interface Props {
    label: string;
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}

const CategoryItem: React.FC<Props> = ({ label, icon, selected = false, onClick }) => {
    return (
        <button
            className={`category-item ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            <div className="icon">{icon}</div>
            <div className="label">{label}</div>
        </button>
    );
};

export default CategoryItem;
