import { Product } from "../Product";
import {ProductCustomization} from "../ProductCustomization";

export interface CartItemResponse {
  id: number;
  product: Product;
  quantity: number;

  // 👉 Thêm các dòng dưới đây
  color?: string;
  customization?: ProductCustomization;
}
