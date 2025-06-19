import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import React from "react";
import {ProductResponse} from "../../../models/response/ProductResponse";
import {Link} from "react-router-dom";

interface Props {
    products: ProductResponse[];
}

const CustomHandBookList: React.FC<Props> = ({products}) => {
    const handbookCustomProducts = products.filter(p => p.type === "Handbook-custom");

    return (
        <section className="custom-service-list-section">
            <SectionHeader label="Dịch vụ custom" title="Custom HandBook"/>
            <div style={{textAlign: "right", marginBottom: 16}}>
                <a
                    href="#"
                    style={{color: "#d7263d", fontWeight: 500, fontSize: "1rem"}}
                >
                    Xem chính sách cho sản phẩm xách tay
                </a>
            </div>

            <div className="custom-product-list">
                {handbookCustomProducts.map((product) => (
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="custom-product-card"
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <div key={product.id}>
                            <img src={product.img} alt={product.name}/>
                            <div className="custom-product-name">{product.name}</div>
                            <div className="custom-product-price">{product.price}</div>
                            {/*<div className="custom-product-rating">*/}
                            {/*    ★★★★★ <span className="custom-product-reviews">({product.ratings})</span>*/}
                            {/*</div>*/}
                        </div>
                    </Link>


                ))}
            </div>
        </section>
    );
};

export default CustomHandBookList;
