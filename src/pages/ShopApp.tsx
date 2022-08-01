import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../models/product.model'
import { useFormRegister } from '../hooks/useFormRegister'
import { ProductFilter } from '../components/ProductFilter'
import { Link, Outlet } from 'react-router-dom'
import { ProductContext } from '../context/ContextProvider'



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
    }, [productState.products])

    const [linkPath, setLinkPath] = useState('edit')
    const toggleLink = () => {
        setLinkPath(prevPath => prevPath === 'edit' ? '' : 'edit')
    }

    return (
        <section className="shop-app container">
            {productState.products && categories &&
                <>
                    <ProductFilter {...filter} options={categories} />
                    <Link to={linkPath} onClick={toggleLink}>{linkPath === 'edit' ? 'Shop' : 'Edit Shop'}</Link>
                    <Outlet />
                </>
            }
        </section>
    )
}
