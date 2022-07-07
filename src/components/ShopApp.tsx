import React, { useContext, useEffect, useRef, useState } from 'react'
import { shopService } from '../services/shopService'
import { Product } from '../models/product.model'
import { ProductList } from './ProductList'
import { CartContext, UserContext } from '../App'
import { useFormRegister } from '../hooks/useFormRegister'
import { ProductFilter } from './ProductFilter'
import { EditShop } from './EditShop'
import { Link, Outlet, Route, Routes, useNavigate, useOutletContext } from 'react-router-dom'
import { PrivetRoute } from './PrivetRoute'



export const ShopApp: React.FC = () => {

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
        const products = await shopService.query(filterBy)
        setProducts(products)
    }

    const { cart, cartDispatch } = useContext(CartContext)
    const { loggedInUser } = useContext(UserContext)

    const onAddToCart = async (productId: string) => {
        if (typeof cartDispatch === 'function')
            cartDispatch({ type: 'ADD_TO_CART', payload: productId })
    }

    const [editState, setEditState] = useState({ isEdit: false, path: 'edit' })
    const navigate = useNavigate()
    const toggleList = () => {
        console.log('editState', editState)
        const newState = { isEdit: !editState.isEdit, path: editState.path === 'edit' ? '' : 'edit' }
        navigate(editState.path)
        setEditState(newState)
    }

    return (
        <section className="shop-app container">
            {categories && products &&

                <>
                    <ProductFilter {...filter} options={categories} />
                    {!editState.isEdit && <ProductList products={products} onAddToCart={onAddToCart} />}
                    {<button onClick={toggleList}>{editState.isEdit ? 'Shop' : 'Edit Shop'}</button>}

                    <Outlet context={{ products }} />

                </>
            }
        </section>
    )
}
interface OutletCtx {
    products: Product[]
}
export const useProducts = () => {
    return useOutletContext<OutletCtx>()
}