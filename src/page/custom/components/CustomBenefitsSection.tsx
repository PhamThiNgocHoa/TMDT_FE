import React from "react";

const CustomBenefitsSection = () => (
    <section className="custom-benefits-section">
        <div className="custom-benefit-item">
            <div className="custom-benefit-icon-wrap">
        <span className="custom-benefit-icon">
          {/* Truck icon */}
            <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#D1D1D1" />
            <circle cx="40" cy="40" r="30" fill="#111" />
            <g stroke="#fff" strokeWidth="3" fill="none">
              <rect x="26" y="44" width="20" height="10" rx="2.5" />
              <rect x="46" y="48" width="8" height="6" rx="2.5" />
              <path d="M26 50v-14a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
              <circle cx="30" cy="58" r="3" />
              <circle cx="50" cy="58" r="3" />
            </g>
          </svg>
        </span>
            </div>
            <div className="custom-benefit-title">Vận chuyển nhanh chóng</div>
            <div className="custom-benefit-desc">
                Miễn phí phí vận chuyển với đơn từ 1.5 tr
            </div>
        </div>
        <div className="custom-benefit-item">
            <div className="custom-benefit-icon-wrap">
        <span className="custom-benefit-icon">
          {/* Headphone icon */}
            <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#D1D1D1" />
            <circle cx="40" cy="40" r="30" fill="#111" />
            <g stroke="#fff" strokeWidth="3" fill="none">
              <path d="M26 50v-6a14 14 0 0 1 28 0v6" />
              <circle cx="30" cy="54" r="4" />
              <circle cx="50" cy="54" r="4" />
            </g>
          </svg>
        </span>
            </div>
            <div className="custom-benefit-title">Bảo hành tận tâm</div>
            <div className="custom-benefit-desc">Chính sách bảo hành phù hợp</div>
        </div>
        <div className="custom-benefit-item">
            <div className="custom-benefit-icon-wrap">
        <span className="custom-benefit-icon">
          {/* Shield check icon */}
            <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#D1D1D1" />
            <circle cx="40" cy="40" r="30" fill="#111" />
            <g stroke="#fff" strokeWidth="3" fill="none">
              <path d="M40 26l14 6v10c0 10-14 16-14 16s-14-6-14-16V32l14-6z" />
              <path d="M36 44l4 4 8-8" />
            </g>
          </svg>
        </span>
            </div>
            <div className="custom-benefit-title">Đổi trả phù hợp</div>
            <div className="custom-benefit-desc">
                Đổi trả nếu sản phẩm lỗi từ nsx/do chúng tôi
            </div>
        </div>
    </section>
);
export default CustomBenefitsSection;
