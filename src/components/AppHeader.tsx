import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../context/ContextProvider'

export const AppHeader = () => {
    const { cart } = useContext(CartContext)
    const cartCount = cart.products.reduce((a, product) => a + (product.count ? product.count : 0), 0)
    return (
        <header className="app-header">
            <section className="container">
                <div className="shop-logo">SHOP</div>
                <nav className="app-nav">
                    <NavLink className="shop" to={'/'}>Shop</NavLink>
                    <NavLink className="shop" to={'/login'}>Login</NavLink>
                    <NavLink className="cart" to={'/cart'}>
                        Cart
                        <span className="product-count">{cartCount ? cartCount : ''}</span>
                    </NavLink>
                </nav>
            </section>
        </header>
    )
}
