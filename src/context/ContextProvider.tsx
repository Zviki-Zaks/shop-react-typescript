import React, { createContext, ReactNode } from 'react'
import { ProductState } from '../hooks/useProductReducer'
import { Cart } from '../models/cart.model'
import { CartAction } from '../models/cartAction.model'
import { ProductAction } from '../models/productAction'
import { User } from '../models/user.model'

export interface CartCtx {
    cart: Cart
    cartDispatch?: React.Dispatch<CartAction>
}

export interface UserCtx {
    loggedInUser: User | null
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface ProductCtx {
    productState: ProductState
    productDispatch: ({ type, payload }: ProductAction) => Promise<void>
}

export const CartContext = createContext<CartCtx>(null!)
export const UserContext = createContext<UserCtx>(null!)
export const ProductContext = createContext<ProductCtx>(null!)

interface Props {
    children: ReactNode
    cartCtx: CartCtx
    userCtx: UserCtx
    productCtx: ProductCtx
}

export const ContextProvider: React.FC<Props> = ({ children, cartCtx, userCtx, productCtx }) => {
    return (
        <CartContext.Provider value={cartCtx}>
            <UserContext.Provider value={userCtx}>
                <ProductContext.Provider value={productCtx}>
                    {children}
                </ProductContext.Provider>
            </UserContext.Provider>
        </CartContext.Provider>
    )
}
