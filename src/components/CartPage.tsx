import React, { useContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'
import { CartContext } from '../App'
import { ProductTable } from './ProductTable'
import { CartEnd } from './CartEnd'

export const CartPage: React.FC = () => {
    const { cart, cartDispatch } = useContext(CartContext)
    const cartCount = cart.products.reduce((a, product) => a + (product.count ? product.count : 0), 0)
    return (
        <section className="cart-page container">
            <h1 className="title">Your Cart</h1>
            {cart.products.length ?
                (typeof cart === 'object') && cartDispatch &&
                <>
                    <ProductTable products={cart.products} dispatch={cartDispatch} />
                    <CartEnd cartCount={cartCount} amount={cart.amount} />
                </>
                : <div>Cart is empty</div>}
        </section>
    )
}
