import React from 'react'
import { Product } from '../models/product.model'
import { ProductPreview } from './ProductPreview'

interface Props {
    products: Product[],
    onAddToCart: (productId: string) => Promise<void>
}

export const ProductList: React.FC<Props> = ({ products, onAddToCart }: Props) => {
    return (
        <section className="product-list">
            <ul>
                {products.map(product =>
                    <li key={product.id}>
                        <ProductPreview product={product} onAddToCart={onAddToCart} />
                    </li>
                )}
            </ul>
        </section>
    )
}
