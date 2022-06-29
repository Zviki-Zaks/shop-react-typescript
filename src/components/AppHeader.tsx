import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../App'

export const AppHeader = () => {
    const { cart } = useContext(CartContext)
    const cartCount = cart.products.reduce((a, product) => a + (product.count ? product.count : 0), 0)
    return (
        <header className="app-header">
            <section className="container">
                <div className="shop-logo">SHOP</div>
                <nav className="app-nav">
                    <NavLink className="shop" to={'/'}>shop</NavLink>
                    <NavLink className="cart" to={'/cart'}>
                        cart
                        <span className="product-count">{cartCount ? cartCount : ''}</span>
                    </NavLink>
                </nav>
            </section>
        </header>
    )
}
