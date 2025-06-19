import { ProductImage } from "../../page/homePage/types/product";
import { RatingResponse } from "./RatingResponse";
import { ProductColorResponse } from "./ProductColorResponse";
import { ProductSizeResponse } from "./ProductSizeResponse";
import { ProductImageResponse } from "./ProductImageResponse";

export interface ProductResponse {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  images: ProductImage[];
  img?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  discount?: string;
  description?: string;
  ratings?: RatingResponse[];
  inStock?: boolean;
  hot?: boolean;
  featured?: boolean;
  type?: string;
  productNew?: boolean;
  productColors: ProductColorResponse[];
  productSizes: ProductSizeResponse[];
  productImages: ProductImageResponse[];
}
