import React, { useReducer } from "react"
import { Product } from "../models/product.model"
import { ProductAction } from "../models/productAction"
import { shopService } from "../services/shopService"

export interface ProductState {
    products: Product[] | null
    currProduct: Product | null
}

type Action = SetProducts | SetProduct | RemoveProduct | SaveProduct

interface SetProducts {
    type: 'SET_PRODUCTS',
    payload: Product[]
}
interface SetProduct {
    type: 'SET_PRODUCT',
    payload: Product | null
}
interface RemoveProduct {
    type: 'REMOVE_PRODUCT',
    payload: string
}
interface SaveProduct {
    type: 'SAVE_PRODUCT',
    payload: Product
}



const productReducer = (state: ProductState, action: Action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload }

        case 'SET_PRODUCT':
            return { ...state, currProduct: action.payload }

        case 'REMOVE_PRODUCT':
            if (Array.isArray(state.products))
                return {
                    ...state,
                    products: [...state.products.filter(item => item.id !== action.payload)],
                    currProduct: null
                }
            else return state
        case 'SAVE_PRODUCT':
            if (Array.isArray(state.products)) {
                const idx = state.products.findIndex(product => product.id === action.payload.id)
                idx > -1 ? state.products.splice(idx, 1, action.payload) : state.products.push(action.payload)
                return {
                    ...state,
                    products: [...state.products],
                    currProduct: null
                }
            } else return state


        default:
            return state
    }
}

const initialState: ProductState = {
    products: null,
    currProduct: null
}

export const useProductReducer = () => {
    const [productState, dispatch] = useReducer(productReducer, initialState)

    const productDispatch = async ({ type, payload }: ProductAction) => {
        if (type === 'SET_PRODUCTS') {
            const products = await shopService.query(payload)
            return dispatch({ type, payload: products })
        } else if (type === 'SET_PRODUCT') {
            const newPayload = payload ? await shopService.getById(payload) : null
            return dispatch({ type, payload: newPayload })
        } else if (type === 'REMOVE_PRODUCT') {
            await shopService.remove(payload)
            return dispatch({ type, payload })
        } else if (type === 'SAVE_PRODUCT') {
            const product = payload.id ? await shopService.put(payload) : await shopService.post(payload)
            return dispatch({ type, payload: product })
        }

    }
    return { productState, productDispatch }

}