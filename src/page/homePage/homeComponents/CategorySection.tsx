import React, { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/caterogySection.css';
import useCategory from "../../../hooks/useCategory";
import {useNavigate} from "react-router-dom";

const CategorySection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { categories } = useCategory();
    const navigate = useNavigate();
    const defaultActiveId = categories.find(cat => cat.isActive)?.id ?? categories[0]?.id;
    const [activeCategoryId, setActiveCategoryId] = useState<number>(defaultActiveId);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth',
            });
        }
    };

    const customCategory = {
        id: -1,
        name: "Sản phẩm tùy chọn",
        img: "/images/custom-product.png", // đổi đường dẫn ảnh phù hợp
        isActive: false,
    };

    return (
        <section className="section category-section">
            <div className="category-header">
                <SectionHeader
                    label="Danh mục"
                    title="Chọn Theo Danh Mục"
                />
                <div className="navigation-buttons">
                    <button className="nav-btn prev-btn" onClick={() => scroll('left')}>
                        <span className="icon">←</span>
                    </button>
                    <button className="nav-btn next-btn" onClick={() => scroll('right')}>
                        <span className="icon">→</span>
                    </button>
                </div>
            </div>

            <div className="categories-grid" ref={scrollRef}>
                {[customCategory, ...categories].map(category => (
                    <div
                        key={category.id}
                        className={`category-card ${activeCategoryId === category.id ? 'active' : ''}`}
                        onClick={() => {
                            if (category.id === -1) {
                                navigate('/custom');
                            } else {
                                setActiveCategoryId(category.id);
                            }
                        }}
                    >
                        <div className="category-icon">
                            <img src={category.img} alt={category.name} />
                        </div>
                        <h3 className="category-name">{category.name}</h3>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default CategorySection;
