import React, { createContext, ReactNode } from 'react'
import { Cart } from '../models/cart.model'
import { CartAction } from '../models/cartAction.model'
import { User } from '../models/user.model'

export interface CartCtx {
    cart: Cart,
    cartDispatch?: React.Dispatch<CartAction>
}

export interface UserCtx {
    loggedInUser: User | null
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const CartContext = createContext<CartCtx>(null!)
export const UserContext = createContext<UserCtx>(null!)

interface Props {
    children: ReactNode
    cartCtx: CartCtx
    userCtx: UserCtx
}

export const ContextProvider: React.FC<Props> = ({ children, cartCtx, userCtx }) => {
    return (
        <CartContext.Provider value={cartCtx}>
            <UserContext.Provider value={userCtx}>
                {children}
            </UserContext.Provider>
        </CartContext.Provider>
    )
}
