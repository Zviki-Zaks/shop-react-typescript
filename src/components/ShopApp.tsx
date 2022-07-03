import React, { useContext, useEffect, useState } from 'react'
import { shopService } from '../services/shopService'
import { Product } from '../models/product.model'
import { ProductList } from './ProductList'
import { CartContext } from '../App'
import { useFormRegister } from '../hooks/useFormRegister'
import { ProductFilter } from './ProductFilter'



const ShopApp: React.FC = () => {
    const [products, setProducts] = useState<Product[] | null>(null)
    const filter = useFormRegister({ name: '', category: '' })
    useEffect(() => {
        loadProducts(filter.fields)
    }, [filter.fields])
    const [categories, setCategories] = useState<string[] | null>()
    useEffect(() => {
        const categories = products?.reduce((list: string[], product: Product) => {
            if (list.includes(product.category)) list.push(product.category)
            return list
        }, [])
        setCategories(categories)
    }, [products])


    const loadProducts = async (filterBy: { name?: string, category?: string }): Promise<void> => {
        console.log('filterBy', filterBy)
        const products = await shopService.query(filterBy)
        setProducts(products)
    }

    const { cart, cartDispatch } = useContext(CartContext)

    const onAddToCart = async (productId: string) => {
        if (typeof cartDispatch === 'function')
            cartDispatch({ type: 'ADD_TO_CART', payload: productId })
    }

    return (
        <section className="shop-app container">
            {categories && <ProductFilter {...filter} options={categories} />}
            {products && <ProductList products={products} onAddToCart={onAddToCart} />}
        </section>
    )
}


export default ShopApp