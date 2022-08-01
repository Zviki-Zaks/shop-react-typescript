import { Cart } from "./cart.model";

export type CartAction = AddToCart | RemoveFromCart | RestartCart

interface AddToCart {
    type: 'ADD_TO_CART'
    payload: string
}
interface RemoveFromCart {
    type: 'REMOVE_FROM_CART'
    payload: string
}
interface RestartCart {
    type: 'RESTART_CART'
    payload?: Cart
}
