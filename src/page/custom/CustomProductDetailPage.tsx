import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomProductServicePage.css";

const relatedServices = [
  {
    name: "Lót foam phím cơ",
    price: "30.000₫",
    img: "https://i.imgur.com/1.jpg",
  },
  {
    name: "PE mod",
    price: "20.000₫",
    img: "https://i.imgur.com/2.jpg",
  },
  {
    name: "Tape mod",
    price: "15.000₫",
    img: "https://i.imgur.com/3.jpg",
  },
  {
    name: "Stab mod",
    price: "90.000₫",
    img: "https://i.imgur.com/4.jpg",
  },
];

const iconTruck = (
  <svg
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#222"
    strokeWidth="1.5"
  >
    <rect x="2" y="7" width="13" height="10" rx="2" />
    <path d="M15 10h3l3 3v4a2 2 0 0 1-2 2h-1" />
    <circle cx="7.5" cy="19" r="1.5" />
    <circle cx="17.5" cy="19" r="1.5" />
  </svg>
);
const iconWarranty = (
  <svg
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#222"
    strokeWidth="1.5"
  >
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <path d="M8 12l2 2 4-4" />
  </svg>
);
const iconHeart = (
  <svg
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#d7263d"
    strokeWidth="1.5"
  >
    <path d="M12 21s-6-4.35-8.485-7.071C1.343 12.343 1 10.657 1 9.5 1 6.462 3.462 4 6.5 4c1.74 0 3.41 1.01 4.5 2.09C12.09 5.01 13.76 4 15.5 4 18.538 4 21 6.462 21 9.5c0 1.157-.343 2.843-2.515 4.429C18 16.65 12 21 12 21z" />
  </svg>
);

const CustomProductDetailPage = () => {
  const [selectedPosition, setSelectedPosition] = useState("Trên giữa");
  const [selectedHeight, setSelectedHeight] = useState("12.5");
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className="custom-detail-layout"
      style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}
    >
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        {/* Ảnh bên trái */}
        <div
          style={{
            flex: 1,
            background: "#fafbfc",
            borderRadius: 16,
            padding: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 320,
          }}
        >
          <img
            src="https://i.imgur.com/7.jpg"
            alt="Khắc tên/chữ ký"
            style={{ maxWidth: 320, maxHeight: 320, borderRadius: 8 }}
          />
        </div>
        {/* Thông tin bên phải */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Khắc tên/chữ ký
          </div>
          <div
            style={{
              color: "#f7b500",
              fontWeight: 600,
              marginBottom: 4,
              fontSize: 18,
            }}
          >
            ★★★★☆{" "}
            <span style={{ color: "#888", fontWeight: 400, fontSize: 16 }}>
              (27 đánh giá)
            </span>{" "}
            <span
              style={{
                color: "#4caf50",
                fontWeight: 500,
                fontSize: 16,
                marginLeft: 8,
              }}
            >
              | Sẵn sàng
            </span>
          </div>
          <div
            style={{
              color: "#d7263d",
              fontWeight: 700,
              fontSize: 26,
              margin: "10px 0",
            }}
          >
            450.000₫
          </div>
          <div style={{ marginBottom: 18, color: "#222", fontSize: 15 }}>
            Gói khắc tên/chữ ký dành cho bàn phím cơ của bạn. Đối với bàn phím
            cơ được gửi từ khách hàng, chính sách vận chuyển/bảo hành sẽ có sự
            khác biệt. Vui lòng xem trong mục Vận chuyển và Bảo hành ở phía dưới
          </div>
          <hr style={{ margin: "18px 0 18px 0", borderColor: "#e0e0e0" }} />
          {/* Vị trí */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Vị trí</div>
            <div style={{ display: "flex", gap: 12 }}>
              {["Trên trái", "Trên giữa", "Trên phải"].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(pos)}
                  style={{
                    padding: "8px 22px",
                    borderRadius: 8,
                    border:
                      selectedPosition === pos
                        ? "2px solid #d7263d"
                        : "1.5px solid #ccc",
                    background: selectedPosition === pos ? "#fff0f0" : "#fff",
                    color: selectedPosition === pos ? "#d7263d" : "#222",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
          {/* Chiều cao */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Chiều cao</div>
            <div style={{ display: "flex", gap: 12 }}>
              {["7.5", "10", "12.5", "15", "17.5"].map((h) => (
                <button
                  key={h}
                  onClick={() => setSelectedHeight(h)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border:
                      selectedHeight === h
                        ? "2px solid #d7263d"
                        : "1.5px solid #ccc",
                    background: selectedHeight === h ? "#fff0f0" : "#fff",
                    color: selectedHeight === h ? "#d7263d" : "#222",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          {/* Sản phẩm */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Sản phẩm</div>
            <input
              value="Bàn phím của khách hàng"
              readOnly
              style={{
                border: "none",
                borderBottom: "2px solid #d7263d",
                background: "transparent",
                padding: "8px 0",
                width: "100%",
                fontSize: 16,
                color: "#d7263d",
                fontWeight: 600,
                marginBottom: 4,
                outline: "none",
              }}
            />
          </div>
          {/* Ghi chú */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Ghi chú:</div>
            <textarea
              placeholder=""
              style={{
                border: "1.5px solid #ccc",
                borderRadius: 8,
                padding: "10px 12px",
                width: "100%",
                fontSize: 15,
                minHeight: 48,
                resize: "vertical",
                fontWeight: 500,
              }}
            />
          </div>
          {/* Số lượng, thanh toán, yêu thích */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                background: "#fff",
                fontWeight: 700,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              -
            </button>
            <span
              style={{
                minWidth: 32,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                background: "#fff",
                fontWeight: 700,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              +
            </button>
            <button
              style={{
                background: "#d7263d",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 36px",
                fontWeight: 700,
                fontSize: 17,
                cursor: "pointer",
                marginLeft: 12,
              }}
            >
              Thanh toán
            </button>
            <button
              style={{
                background: "#fff",
                border: "1.5px solid #d7263d",
                borderRadius: 8,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 8,
                cursor: "pointer",
              }}
            >
              {iconHeart}
            </button>
          </div>
          {/* Box vận chuyển, bảo hành */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #ccc",
                borderRadius: 10,
                padding: "14px 18px",
                gap: 16,
              }}
            >
              {iconTruck}
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>
                  Miễn phí vận chuyển
                </div>
                <div style={{ color: "#222", fontSize: 14 }}>
                  <a
                    href="#"
                    style={{
                      color: "#d7263d",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    Xem chính sách vận chuyển tại đây
                  </a>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #ccc",
                borderRadius: 10,
                padding: "14px 18px",
                gap: 16,
              }}
            >
              {iconWarranty}
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>
                  Bảo hành sản phẩm
                </div>
                <div style={{ color: "#222", fontSize: 14 }}>
                  <a
                    href="#"
                    style={{
                      color: "#d7263d",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    Chính sách bảo hành cho sản phẩm custom tại đây
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dịch vụ liên quan */}
      <div style={{ marginTop: 48 }}>
        <div
          style={{
            color: "#d7263d",
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 18,
          }}
        >
          Dịch vụ liên quan
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {relatedServices.map((s, idx) => (
            <div
              className="custom-product-card"
              key={idx}
              style={{ width: 180 }}
            >
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <div className="custom-product-name">{s.name}</div>
              <div className="custom-product-price">{s.price}</div>
              <div className="custom-product-rating">
                ★★★★★ <span className="custom-product-reviews">(65)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomProductDetailPage;
