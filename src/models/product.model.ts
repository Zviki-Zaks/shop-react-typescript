export interface Product {
    id: string,
    name: string,
    price: number
    category: string
    inStock?: number,
    img?: string,
    count?: number
}
export interface CartProduct {
    id: string,
    name: string,
    price: number
    category: string
    img?: string,
    count?: number
}