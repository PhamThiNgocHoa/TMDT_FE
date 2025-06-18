import React, {useState} from "react";
import useProduct from "../../../hooks/useProduct";
import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import {Link} from "react-router-dom";
import formatToVND from "../../../hooks/formatToVND";

interface Props {
    selectedCategory: string;
}

const FeaturedProductsSection: React.FC<Props> = ({selectedCategory}) => {
    const {products} = useProduct();

    const featuredProducts = (products || []).filter(
        (p) =>
            p.featured === true &&
            p.type === "Handbook" &&
            (selectedCategory === "" || p.categoryName === selectedCategory)
    );

    const [showAll, setShowAll] = useState(false);
    const displayedProducts = showAll ? featuredProducts : featuredProducts.slice(0, 8);

    return (
        <section className="custom-featured-section">
            <div className="custom-featured-header">
                <SectionHeader label="Sản phẩm" title={`Sản phẩm nổi bật: ${selectedCategory}`}/>
            </div>

            <div className="custom-featured-list">
                {displayedProducts.map((p) => (
                    <Link
                        to={`/product/${p.id}`}
                        key={p.id}
                        className="custom-product-card"
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <div className="custom-product-img">
                            <img src={p.img} alt={p.name}/>
                            <div className="custom-product-icons">
                                <span>♥</span>
                                <span>👁</span>
                            </div>
                        </div>
                        <div className="custom-product-name">{p.name}</div>
                        <div className="custom-product-price">{formatToVND(p.price)}</div>
                        {/*<div className="custom-product-rating">*/}
                        {/*    {"★".repeat(Math.round(p.ratings|| 5))}*/}
                        {/*    <span className="custom-product-reviews">(10)</span>*/}
                        {/*</div>*/}
                    </Link>
                ))}
            </div>

            {featuredProducts.length > 8 && (
                <div className="custom-featured-viewall-container">
                    <button
                        className="custom-featured-viewall"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Thu Gọn" : "Xem Tất Cả Sản Phẩm"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default FeaturedProductsSection;
