import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../models/product.model'
import { ProductList } from '../components/ProductList'
import { useFormRegister } from '../hooks/useFormRegister'
import { ProductFilter } from '../components/ProductFilter'
import { Link, Outlet } from 'react-router-dom'
import { CartContext, ProductContext, UserContext } from '../context/ContextProvider'



export const ShopApp: React.FC = () => {

    const { productState, productDispatch } = useContext(ProductContext)
    const filter = useFormRegister({ name: '', category: '' })
    useEffect(() => {
        productDispatch({ type: 'SET_PRODUCTS', payload: filter.fields })
    }, [filter.fields])

    const [categories, setCategories] = useState<string[] | null>()
    useEffect(() => {
        const categories = productState.products?.reduce((list: string[], product: Product) => {
            if (!list.includes(product.category)) list.push(product.category)
            return list
        }, [])
        setCategories(categories)
    }, [])

    const { cart, cartDispatch } = useContext(CartContext)
    const { loggedInUser } = useContext(UserContext)

    const onAddToCart = async (productId: string) => {
        if (typeof cartDispatch === 'function')
            cartDispatch({ type: 'ADD_TO_CART', payload: productId })
    }

    const [editState, setEditState] = useState({ isEdit: false, path: 'edit' })
    const toggleList = () => {
        const newState = { isEdit: !editState.isEdit, path: editState.path === 'edit' ? '' : 'edit' }
        setEditState(newState)
    }

    return (
        <section className="shop-app container">
            {productState.products && categories &&

                <>
                    <ProductFilter {...filter} options={categories} />
                    {<Link to={editState.path} onClick={toggleList}>{editState.isEdit ? 'Shop' : 'Edit Shop'}</Link>}
                    {!editState.isEdit && <ProductList products={productState.products} onAddToCart={onAddToCart} />}

                    <Outlet />

                </>
            }
        </section>
    )
}
