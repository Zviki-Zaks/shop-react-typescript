import React from 'react'
import { CartAction } from '../models/cartAction.model'
import { CartProduct, Product } from '../models/product.model'

interface Props {
    product: Product | CartProduct,
    dispatch: React.Dispatch<CartAction>
}

export const ProductRow = ({ product, dispatch }: Props) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className="actions">
                <button className="remove" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product.id })}>-</button>
                <span>{product.count}</span>
                <button className="remove" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product.id })}>+</button>
            </td>
        </tr>
    )
}
