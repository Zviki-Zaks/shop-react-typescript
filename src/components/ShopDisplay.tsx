import React, { useContext } from 'react'
import { CartContext, ProductContext } from '../context/ContextProvider'
import { ProductList } from './ProductList'

export const ShopDisplay: React.FC = () => {

    const { productState } = useContext(ProductContext)
    const { cartDispatch } = useContext(CartContext)

    const onAddToCart = async (productId: string) => {
        if (typeof cartDispatch === 'function')
            cartDispatch({ type: 'ADD_TO_CART', payload: productId })
    }

    return (
        <section className="shop-display">
            {productState.products && <ProductList products={productState.products} onAddToCart={onAddToCart} />}
        </section>
    )
}
