import React from 'react'
import { CartAction } from '../models/cartAction.model'
import { CartProduct, Product } from '../models/product.model'
import { ProductRow } from './ProductRow'

interface Props {
    products: Product[]
    dispatch?: React.Dispatch<CartAction>
    selectProduct?: (productId: string) => void
}

export const ProductTable = ({ products, dispatch, selectProduct }: Props) => {
    return (
        <section className="product-table">
            <table>
                <thead><tr><th>Name</th><th>Price</th><th>{products[0].inStock ? 'In Stock' : ''}</th></tr></thead>
                <tbody>
                    {products.map(product =>
                        <ProductRow product={product} dispatch={dispatch} selectProduct={selectProduct} key={product.id} />
                    )}
                </tbody>
                <tfoot><tr></tr></tfoot>
            </table>
        </section>
    )
}
