import React from 'react'
import { CartAction } from '../models/cartAction.model'
import { CartProduct, Product } from '../models/product.model'

interface Props {
    product: Product | CartProduct,
    dispatch: React.Dispatch<CartAction>
}

export const ProductRow = ({ product, dispatch }: Props) => {
    const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)

    return (
        <tr className="product-row">
            <td>{product.name}</td>
            <td>{price}</td>
            {product.count &&
                <td className="actions">
                    <button className="remove" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product.id })}>-</button>
                    <span className="count">{product.count}</span>
                    <button className="remove" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product.id })}>+</button>
                </td>}
            {/* {product.inStock && <td>{product.inStock}</td>} */}
        </tr>
    )
}