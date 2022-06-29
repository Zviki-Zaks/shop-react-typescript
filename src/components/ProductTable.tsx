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
        <section className="product-table">
            {products.length ?
                <table>
                    <thead><tr><th>Name</th><th>Price</th><th></th></tr></thead>
                    <tbody>
                        {products.map(product =>
                            <ProductRow product={product} dispatch={dispatch} key={product.id} />
                        )}
                    </tbody>
                </table>
                :
                <div>Cart is empty</div>
            }
        </section>
    )
}
