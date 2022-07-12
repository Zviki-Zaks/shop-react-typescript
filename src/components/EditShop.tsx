import React, { useState } from 'react'
import { OutletProps, useOutletContext } from 'react-router-dom'
import { Product } from '../models/product.model'
import { shopService } from '../services/shopService'
import { EditProduct } from './EditProduct'
import { ProductTable } from './ProductTable'
import { useProducts } from './ShopApp'

interface Props {
    products?: Product[]
}

export const EditShop: React.FC<OutletProps> = () => {
    const { products } = useProducts()
    const [product, setProduct] = useState<Product | null>(null)
    const loadProduct = async (productId: string) => {
        const product = await shopService.getById(productId)
        console.log('product', product)
    }
    const saveProduct = async (product: Product) => {
        const newProduct = product.id ? await shopService.put(product) : await shopService.post(product)
    }


    return (
        <section className="edit-shop">
            {products && <ProductTable products={products} selectProduct={loadProduct} />}
            <EditProduct product={product} />
        </section>
    )
}
