import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import '../../../assets/css/homeStyles/caterogySection.css';
import useCategory from "../../../hooks/useCategory";
import {useNavigate} from "react-router-dom";
import Shimmer from '../../../component/Shimmer';

const CategorySection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { categories, loading, error, setCategories } = useCategory();
    const navigate = useNavigate();
    const defaultActiveId = categories && categories.length > 0
        ? (categories.find(cat => cat.active)?.id ?? categories[0].id)
        : -1;
 //   const [activeCategoryId, setActiveCategoryId] = useState<number>(defaultActiveId);
    const [activeCategoryId, setActiveCategoryId] = useState<number | undefined>(undefined);
    
    // Kiểm tra an toàn cho categories
    const safeCategories = categories || [];

    // Debug logging
    console.log('Categories from API:', categories);
    console.log('Safe categories:', safeCategories);

    // Set active category khi categories được load
    useEffect(() => {
        if (safeCategories.length > 0) {
            // Sử dụng active thay vì isActive
            const activeCategory = safeCategories.find(cat => cat.active === true);
            const defaultCategory = safeCategories[0];
            setActiveCategoryId(activeCategory?.id ?? defaultCategory?.id);
            console.log('Active category set to:', activeCategory?.id ?? defaultCategory?.id);
        }
    }, [safeCategories]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth',
            });
        }
    };

    const displayCategories = safeCategories;

    const handleCategoryClick = (categoryId: number) => {
        if (categoryId === -1) {
            navigate('/custom');
        } else {
            setActiveCategoryId(categoryId);
            // Chuyển hướng đến trang shop với category tương ứng
            navigate(`/shop?category=${categoryId}`);
        }
    };

    // Hiển thị loading state
    if (loading) {
        return (
            <section className="section category-section">
                <div className="category-header">
                    <SectionHeader
                        label="Danh mục"
                        title="Chọn Theo Danh Mục"
                    />
                </div>
                <div className="categories-grid">
                    <Shimmer type="card" count={6} />
                </div>
            </section>
        );
    }

    // Hiển thị error state
    if (error) {
        return (
            <section className="section category-section">
                <div className="category-header">
                    <SectionHeader
                        label="Danh mục"
                        title="Chọn Theo Danh Mục"
                    />
                </div>
                <div className="categories-grid">
                    <div className="error-message">
                        Không thể tải danh mục. Vui lòng thử lại sau.
                        <br />
                        <small>Lỗi: {error}</small>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section category-section">
            <div className="category-header">
                <SectionHeader
                    label="Danh mục"
                    title="Chọn Theo Danh Mục"
                />
                {displayCategories.length > 4 && (
                    <div className="navigation-buttons">
                        <button className="nav-btn prev-btn" onClick={() => scroll('left')}>
                            <span className="icon">←</span>
                        </button>
                        <button className="nav-btn next-btn" onClick={() => scroll('right')}>
                            <span className="icon">→</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="categories-grid" ref={scrollRef}>
                {displayCategories.map(category => (
                    <div
                        key={category.id}
                        className={`category-card ${activeCategoryId === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <div className="category-icon">
                            <img 
                                src={category.img} 
                                alt={category.name}
                                onError={(e) => {
                                    // Fallback image nếu ảnh không load được
                                    e.currentTarget.src = '/images/default-category.png';
                                }}
                            />
                        </div>
                        <h3 className="category-name">{category.name}</h3>
                        {category.products && category.products.length > 0 && (
                            <span className="product-count">
                                {category.products.length} sản phẩm
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
