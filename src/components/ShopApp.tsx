import React, { useContext, useEffect, useState } from 'react'
import { shopService } from '../services/shopService'
import { Product } from '../models/product.model'
import { ProductList } from './ProductList'
import { Cart } from '../models/cart.model'
import { useCartReducer } from '../hooks/useCartReducer'
import { CartContext } from '../App'



const ShopApp: React.FC = () => {
    const [products, setProducts] = useState<Product[] | null>(null)
    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async (): Promise<void> => {
        const products = await shopService.query()
        setProducts(products)
    }

    const loadProduct = async (productId: string): Promise<Product> => {
        return await shopService.getById(productId)
    }

    const { cart, cartDispatch } = useContext(CartContext)
    // const [cart, cartDispatch] = useCartReducer()

    const onAddToCart = async (productId: string) => {
        // const product = await loadProduct(productId)
        // console.log('product', product)
        // if (!product.inStock) return alert('Not in stock')
        // const newCart: Cart = { products: [...cart.products, { ...product }], amount: cart.amount + product.price }
        // if (dispatch) dispatch({ type: 'ADD_TO_CART', payload: product })
        // if (setCart) setCart(newCart)
        // console.log('cart', cart)
        if (typeof cartDispatch === 'function')
            cartDispatch({ type: 'ADD_TO_CART', payload: productId })
    }


    return (
        <section className="shop-app container">
            {products && <ProductList products={products} onAddToCart={onAddToCart} />}
        </section>
    )
}


export default ShopApp