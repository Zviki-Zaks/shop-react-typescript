import React, { useContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'
import { CartContext } from '../App'
import { ProductTable } from './ProductTable'

export const CartPage: React.FC = () => {
    const { cart, cartDispatch } = useContext(CartContext)
    console.log('cart', cart)
    return (
        <section className="cart-page container">
            <h1 className="title">Your Cart</h1>
            {(typeof cart === 'object') && cartDispatch && <ProductTable products={cart.products} dispatch={cartDispatch} />}
        </section>
    )
}
