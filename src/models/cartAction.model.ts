import { Cart } from "./cart.model";
import { Product } from "./product.model";

export interface CartAction { type: string, payload?: string | Cart }
