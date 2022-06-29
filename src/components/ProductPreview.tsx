import React, { useContext } from 'react'
// import { CartContext } from '../App'
import { Product } from '../models/product.model'

interface Props {
    product: Product,
    onAddToCart: (productId: string) => Promise<void>
}

export const ProductPreview: React.FC<Props> = ({ product, onAddToCart }: Props) => {
    return (
        <section className="product-preview">
            <h3 className="product-name">{product.name}</h3>
            <h4 className="product-category">{product.category}</h4>
            <div className="actions">
                <button onClick={() => { onAddToCart(product.id) }}>Add To Cart</button>
            </div>
        </section>
    )
}
