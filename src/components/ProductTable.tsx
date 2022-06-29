import React from 'react'
import { CartAction } from '../models/cartAction.model'
import { CartProduct, Product } from '../models/product.model'
import { ProductRow } from './ProductRow'

interface Props {
    products: Product[] | CartProduct[],
    dispatch: React.Dispatch<CartAction>
}

export const ProductTable = ({ products, dispatch }: Props) => {
    return (
        <section className="Product-table">
            <table>
                <tbody>
                    {products.map(product =>
                        <ProductRow product={product} dispatch={dispatch} key={product.id} />
                    )}
                </tbody>
            </table>
        </section>
    )
}
