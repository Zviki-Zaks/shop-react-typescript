import React from 'react'
import { CartAction } from '../../models/cartAction.model'
import { CartProduct, Product } from '../../models/product.model'

interface Props {
    product: Product,
    dispatch?: React.Dispatch<CartAction>
    selectProduct?: (productId: string) => void
}

export const ProductRow: React.FC<Props> = ({ product, dispatch, selectProduct }) => {
    const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)

    return (
        <tr className="product-row" onClick={() => { if (typeof selectProduct === 'function') selectProduct(product.id) }}>
            <td>{product.name}</td>
            <td>{price}</td>
            {/* <td>{product.category}</td> */}
            {product.count && dispatch &&
                <td className="actions">
                    <button className="remove" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product.id })}>-</button>
                    <span className="count">{product.count}</span>
                    <button className="add" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product.id })}>+</button>
                </td>}
            {product.inStock && <td>{product.inStock}</td>}
        </tr>
    )
}
