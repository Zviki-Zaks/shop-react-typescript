import { useReducer } from "react"
import { Cart } from "../models/cart.model"
import { CartAction } from "../models/cartAction.model"
import { shopService } from "../services/shopService"
import { CartProduct, Product } from "../models/product.model"

interface Action { type: string, payload: Product }

const cartReducer = (state: Cart, action: Action) => {
  console.log('cartReducer invoked')
  let currProduct = state.products.find(product => product.id === action.payload.id)
  switch (action.type) {

    case 'ADD_TO_CART':
      var amount = +(state.amount + action.payload.price).toFixed(2)
      if (currProduct?.count) {
        console.log('if', currProduct)
        currProduct.count++
        return {
          ...state,
          products: state.products.map(product => product.id === currProduct?.id ? currProduct : product),
          amount
        }
      } else {
        currProduct = action.payload
        currProduct.count = 1
        delete currProduct.inStock
        return { ...state, products: [...state.products, { ...currProduct }], amount }
      }

    case 'REMOVE_FROM_CART':
      var amount = +(state.amount - action.payload.price).toFixed(2)
      if (currProduct?.count === 1) {
        return { ...state, products: [...state.products.filter(product => product.id !== action.payload.id)], amount }
      }
      else if (typeof currProduct?.count === 'number' && currProduct.count >= 2) {
        currProduct.count--
        return {
          ...state,
          products: state.products.map(product => product.id === currProduct?.id ? currProduct : product),
          amount
        }
      } else return state
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
  const cartDispatch = async (action: CartAction) => {
    const product = await shopService.getById(action.payload)
    if (action.type === 'ADD_TO_CART' && !product.inStock) return alert('Not in stock')
    else return dispatch({ ...action, payload: product })
  }



  return { cart, cartDispatch }
}