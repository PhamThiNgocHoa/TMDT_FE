import React, { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import "../assets/css/wishlistPage.css"; // CSS for this page

// Assuming you have a way to fetch full product details by ID
// This is a placeholder function using fake data
const fetchFakeProductsByIds = (ids: number[]) => {
  console.log("Fetching fake products for IDs:", ids);
  // This is placeholder fake data, match structure from ProductCard
  const fakeProductsData = [
    {
      id: 1,
      name: "Laptop MSI Modern 15",
      price: "18.490.000₫",
      discountedPrice: "10.990.000₫",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/11c73c757bebbfeb527092163e780840067258db",
      discountPercentage: 40, // Example
      isNew: false,
      rating: 4.5, // Example
      reviewCount: 120, // Example
      colors: ["#000", "#fff", "#ccc"], // Example
      formattedPrice: "18.490.000₫",
      formattedOriginalPrice: "10.990.000₫",
    },
  ];

  // Filter fake products based on the provided IDs
  return fakeProductsData.filter((product) => ids.includes(Number(product.id)));
};

const WishlistPage: React.FC = () => {
  const { wishlistItems, addOrRemoveFromWishlist } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]); // State to hold product details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching product details for IDs in wishlist
    // Simulate fetching product details for IDs in wishlist
    const products = fetchFakeProductsByIds(wishlistItems.map(Number));
    setWishlistProducts(products);
    setLoading(false);
  }, [wishlistItems]); // Re-fetch products when wishlistItems change

  const handleRemoveFromWishlist = (productId: number) => {
    addOrRemoveFromWishlist(productId); // Use context function to remove
  };

  if (loading) {
    return (
      <div className="wishlist-loading">Đang tải danh sách yêu thích...</div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2>Danh sách sản phẩm yêu thích</h2>

      {wishlistProducts.length > 0 ? (
        <div className="wishlist-items-list">
          {" "}
          {/* Container for grid items */}
          {wishlistProducts.map((product) => (
            <div key={product.id} className="wishlist-item">
              {" "}
              {/* Item structure */}
              <div className="wishlistItemImageContainer">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="wishlistItemImage"
                />
                {/* Badges */}
                <div className="item-badges">
                  {product.isNew && <span className="new-badge">Mới</span>}
                  {product.discountPercentage &&
                    product.discountPercentage > 0 && (
                      <span className="discount-badge">
                        -{product.discountPercentage}%
                      </span>
                    )}
                </div>
                {/* Remove button overlay */}
                <button
                  className="wishlistRemoveButton"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  &times; {/* Or a trash icon */}
                </button>
              </div>
              <div className="wishlistItemInfo">
                <div className="wishlistItemName">{product.name}</div>
                <div className="wishlistItemPrices">
                  {/* Use formatted prices from fake data if available, otherwise use price/discountedPrice */}
                  <span className="wishlistItemDiscountedPrice">
                    {product.formattedDiscountedPrice ||
                      product.discountedPrice}
                  </span>
                  {product.price &&
                    product.price !== product.discountedPrice && (
                      <span className="wishlistItemOriginalPrice">
                        {product.formattedOriginalPrice || product.price}
                      </span>
                    )}
                </div>
                {/* Add other product details here as needed, e.g., rating */}
              </div>
              {/* Add to cart button */}
              <div className="wishlist-add-to-cart-container">
                <button
                  className="wishlist-add-to-cart-button"
                  onClick={() =>
                    console.log("Add to cart clicked for", product.id)
                  } // Placeholder logic
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="wishlist-empty">Danh sách yêu thích của bạn trống.</div>
      )}
    </div>
  );
};

export default WishlistPage;
