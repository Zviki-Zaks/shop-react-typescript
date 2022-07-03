import React from 'react'
import { Product } from '../models/product.model'

interface Props {
    product: Product,
    onAddToCart: (productId: string) => Promise<void>
}

export const ProductPreview: React.FC<Props> = ({ product, onAddToCart }: Props) => {
    const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)
    return (
        <section className="product-preview">
            <div className="info">
                <div className="flex space-between align-center">
                    <h3 className="product-name">{product.name}</h3>
                    <span className="price">{price}</span>
                </div>
                <p className="product-category">{product.category}</p>
            </div>
            <div className="actions">
                <button className="add-btn" onClick={() => { onAddToCart(product.id) }}>Add To Cart</button>
            </div>
        </section>
    )
}
