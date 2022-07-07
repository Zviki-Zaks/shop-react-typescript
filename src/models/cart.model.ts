import { CartProduct, Product } from "./product.model";

export interface Cart {
    products: Product[]
    amount: number
}