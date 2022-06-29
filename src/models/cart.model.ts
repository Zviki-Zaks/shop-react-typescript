import { CartProduct, Product } from "./product.model";

export interface Cart {
    products: Product[],
    // products:  CartProduct[] ,
    amount: number
}