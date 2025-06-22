import SectionHeader from "../../homePage/homeComponents/SectionHeader";
import React from "react";

const CustomMouseServiceList = () => (
    <section className="custom-service-list-section">
        <SectionHeader label="Dịch vụ custom" title="Custom chuột" />
        <div style={{ textAlign: "right", marginBottom: 16 }}>
            <a
                href="#"
                style={{ color: "#d7263d", fontWeight: 500, fontSize: "1rem" }}
            >
                Xem chính sách cho Custom chuột
            </a>
        </div>
        <div className="custom-product-list">
            <div className="custom-product-card">
                <img src="https://i.imgur.com/8.jpg" alt="Thay switch chuột" />
                <div className="custom-product-name">Thay switch chuột</div>
                <div className="custom-product-price">100.000₫ - 350.000₫</div>
                <div className="custom-product-rating">
                    ★★★★★ <span className="custom-product-reviews">(65)</span>
                </div>
            </div>
            <div className="custom-product-card">
                <img src="https://i.imgur.com/9.jpg" alt="Thay feet chuột" />
                <div className="custom-product-name">Thay feet chuột</div>
                <div className="custom-product-price">35.000₫</div>
                <div className="custom-product-rating">
                    ★★★★★ <span className="custom-product-reviews">(65)</span>
                </div>
            </div>
            <div className="custom-product-card">
                <img src="https://i.imgur.com/10.jpg" alt="Coating chuột" />
                <div className="custom-product-name">Coating chuột</div>
                <div className="custom-product-price">250.000₫ - 750.000₫</div>
                <div className="custom-product-rating">
                    ★★★★★ <span className="custom-product-reviews">(65)</span>
                </div>
            </div>
            <div className="custom-product-card">
                <img src="https://i.imgur.com/11.jpg" alt="Vẽ hình custom lên chuột" />
                <div className="custom-product-name">Vẽ hình custom lên chuột</div>
                <div className="custom-product-price">450.000₫ - 950.000₫</div>
                <div className="custom-product-rating">
                    ★★★★★ <span className="custom-product-reviews">(65)</span>
                </div>
            </div>
        </div>
    </section>
);
export default CustomMouseServiceList;