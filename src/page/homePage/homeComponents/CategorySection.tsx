import React, {useRef, useState} from 'react';
import SectionHeader from './SectionHeader';
import { categories } from '../data/categories';
import '../../../assets/css/homeStyles/caterogySection.css';
import useCategory from "../../../hooks/useCategory";

const CategorySection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const {categories} = useCategory();
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

            <div className="categories-grid">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className={`category-card ${activeCategoryId === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategoryId(category.id)}                    >
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
