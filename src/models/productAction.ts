import { Product } from "./product.model"

export type ProductAction = SetProducts | SetProduct | RemoveProduct | SaveProduct

interface SetProducts {
    type: 'SET_PRODUCTS',
    payload?: { name?: string, category?: string }
}
interface SetProduct {
    type: 'SET_PRODUCT',
    payload: string | null
}
interface RemoveProduct {
    type: 'REMOVE_PRODUCT',
    payload: string
}
interface SaveProduct {
    type: 'SAVE_PRODUCT',
    payload: Product
}