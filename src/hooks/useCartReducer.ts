import { useReducer } from "react"
import { Cart } from "../models/cart.model"
import { CartAction } from "../models/cartAction.model"
import { shopService } from "../services/shopService"
import { Product } from "../models/product.model"

type Action = AddToCart | RemoveFromCart | RestartCart

interface AddToCart {
  type: 'ADD_TO_CART'
  payload: Product
}
interface RemoveFromCart {
  type: 'REMOVE_FROM_CART'
  payload: Product
}
interface RestartCart {
  type: 'RESTART_CART'
  payload: Cart
}

const cartReducer = (state: Cart, { type, payload }: Action) => {
  let currProduct: Product | undefined
  switch (type) {

    case 'ADD_TO_CART':
      currProduct = state.products.find(product => product.id === payload.id)
      var amount = +(state.amount + payload.price).toFixed(2)
      if (!currProduct) return state
      if (currProduct.count) {
        currProduct.count++
        return {
          ...state,
          products: state.products.map(product => product.id === currProduct?.id ? currProduct : product),
          amount
        }
      } else {
        currProduct = payload
        currProduct.count = 1
        delete currProduct.inStock
        return { ...state, products: [...state.products, { ...currProduct }], amount }
      }

    case 'REMOVE_FROM_CART':
      currProduct = state.products.find(product => product.id === payload.id)
      var amount = +(state.amount - payload.price).toFixed(2)
      if (!currProduct) return state
      if (currProduct.count === 1) {
        return { ...state, products: [...state.products.filter(product => product.id !== payload.id)], amount }
      }
      else if (typeof currProduct.count === 'number' && currProduct.count >= 2) {
        currProduct.count--
        return {
          ...state,
          products: state.products.map(product => product.id === currProduct?.id ? currProduct : product),
          amount
        }
      } else return state

    case 'RESTART_CART':
      return { ...payload }

    default:
      return state
  }
}

const initialState: Cart = {
  products: [],
  amount: 0
}

export const useCartReducer = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)
  const cartDispatch = async ({ type, payload }: CartAction) => {
    if (type === 'ADD_TO_CART') {
      const product = await shopService.getById(payload)
      if (!product.inStock) return alert('Not in stock')
      else return dispatch({ type, payload: product })
    }
    else if (type === 'REMOVE_FROM_CART') {
      const product = await shopService.getById(payload)
      return dispatch({ type, payload: product })
    }
    else if (type === 'RESTART_CART') {
      if (!payload) return dispatch({ type, payload: initialState })
      else {
        const isKeep: boolean = window.confirm('Want to keep your previous cart?')
        if (isKeep) {
          return dispatch({ type, payload })
        }
      }
    }
  }
  return { cart, cartDispatch }
}