import React from 'react'
import { OutletProps, useOutletContext } from 'react-router-dom'
import { Product } from '../models/product.model'
import { ProductTable } from './ProductTable'
import { useProducts } from './ShopApp'

interface Props {
    products?: Product[]
}

export const EditShop: React.FC<OutletProps> = () => {
    const { products } = useProducts()
    return (
        <section className="edit-shop">
            Edit
            {products && <ProductTable products={products} />}
        </section>
    )
}
