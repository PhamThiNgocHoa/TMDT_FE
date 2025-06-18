import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import React, { useRef } from "react";
import { Category } from "../../../models/Category";

interface Props {
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    customCategories: Category[];
}

const CustomCategorySection: React.FC<Props> = ({
                                                    selectedCategory,
                                                    setSelectedCategory,
                                                    customCategories
                                                }) => {
    const listRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <section className="custom-category-section">
            <SectionHeader
                label="Sản phẩm xách tay/custom"
                title="Chọn Theo Danh Mục Custom"
            />
            <div className="custom-category-header">
                <div className="custom-category-nav">
                    <button className="custom-category-arrow" onClick={scrollLeft}>
                        <span>&larr;</span>
                    </button>
                    <button className="custom-category-arrow" onClick={scrollRight}>
                        <span>&rarr;</span>
                    </button>
                </div>
            </div>
            <div className="custom-category-list" ref={listRef}>
                {customCategories.map((cat, idx) => (
                    <div
                        className={`custom-category-item${selectedCategory === cat.name ? " active" : ""}`}
                        key={idx}
                        onClick={() =>
                            setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)
                        }
                    >
                        <div className="custom-category-img">
                            <img src={cat.img} alt={cat.name} />
                        </div>
                        <div className="custom-category-label">{cat.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CustomCategorySection;
