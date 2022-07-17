import React, { useContext, useEffect, useState } from 'react'
import { shopService } from '../services/shopService'
import { Product } from '../models/product.model'
import { ProductList } from './ProductList'
import { useFormRegister } from '../hooks/useFormRegister'
import { ProductFilter } from './ProductFilter'
import { Link, Outlet, useOutletContext } from 'react-router-dom'
import { CartContext, UserContext } from '../context/ContextProvider'



export const ShopApp: React.FC = () => {

    const [products, setProducts] = useState<Product[]>(null!)
    const filter = useFormRegister({ name: '', category: '' })
    useEffect(() => {
        loadProducts(filter.fields)
    }, [filter.fields])

    const [categories, setCategories] = useState<string[] | null>()
    useEffect(() => {
        const categories = products?.reduce((list: string[], product: Product) => {
            if (!list.includes(product.category)) list.push(product.category)
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
    const toggleList = () => {
        const newState = { isEdit: !editState.isEdit, path: editState.path === 'edit' ? '' : 'edit' }
        setEditState(newState)
    }

    return (
        <section className="shop-app container">
            {products && categories &&

                <>
                    <ProductFilter {...filter} options={categories} />
                    {<Link to={editState.path} onClick={toggleList}>{editState.isEdit ? 'Shop' : 'Edit Shop'}</Link>}
                    {!editState.isEdit && <ProductList products={products} onAddToCart={onAddToCart} />}

                    <Outlet context={{ products, setProducts }} />

                </>
            }
        </section>
    )
}


interface OutletCtx {
    products: Product[]
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
export const useProducts = () => {
    return useOutletContext<OutletCtx>()
}