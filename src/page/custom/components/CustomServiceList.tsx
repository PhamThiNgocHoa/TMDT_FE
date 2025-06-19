import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import { Link } from "react-router-dom";
import React from "react";
import useProduct from "../../../hooks/useProduct";
import formatToVND from "../../../hooks/formatToVND";

interface CustomServiceListProps {
    categoryName: string;
}

const CustomServiceList: React.FC<CustomServiceListProps> = ({ categoryName }) => {
    const { products } = useProduct();

    const serviceProducts = products.filter(
        (p) => p.categoryName === categoryName && p.type === "Custom"
    );

    if (serviceProducts.length === 0) return null;

    return (
        <section className="custom-service-list-section">
            <SectionHeader label="Dịch vụ custom" title={categoryName} />

            <div style={{ textAlign: "right", marginBottom: 16 }}>
                <a
                    href="#"
                    style={{ color: "#d7263d", fontWeight: 500, fontSize: "1rem" }}
                >
                    Xem chính sách cho Custom {categoryName}
                </a>
            </div>

            <div style={{ marginBottom: 40 }}>
                <div className="custom-product-list">
                    {serviceProducts.map((p) => (
                        <Link
                            to={`/product/${p.id}`}
                            key={p.id}
                            className="custom-product-card"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="custom-product-img">
                                <img src={p.img} alt={p.name} />
                            </div>
                            <div className="custom-product-name">{p.name}</div>
                            <div className="custom-product-price">
                                {formatToVND(p.price)}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomServiceList;
