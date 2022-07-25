import React, { useState } from 'react'
import { OutletProps } from 'react-router-dom'
import { Product } from '../models/product.model'
import { shopService } from '../services/shopService'
import { EditProduct } from './EditProduct'
import { ProductTable } from './common/ProductTable'
import { useProducts } from '../pages/ShopApp'

interface Props {
    products?: Product[]
}

export const EditShop: React.FC<OutletProps> = () => {
    const { products, setProducts } = useProducts()
    const [product, setProduct] = useState<Product | null>(null)
    const loadProduct = async (productId: string) => {
        const selectedProduct = await shopService.getById(productId)
        setProduct(selectedProduct)
    }
    const selectProduct = (productId: string | null) => {
        if (productId) return loadProduct(productId)
        else setProduct(null)
    }
    const saveProduct = async (product: Product) => {
        const newProduct = product.id ? await shopService.put(product) : await shopService.post(product)
        const idx = products.findIndex(product => product.id === newProduct.id)
        if (idx === -1) {
            setProducts([...products, newProduct])
        } else {
            setProducts([...products.filter((item, index) => index !== idx), newProduct])
        }
    }
    const removeProduct = async (productId: string) => {
        await shopService.remove(productId)
        setProducts([...products.filter(product => product.id !== productId)])

    }


    return (
        <section className="edit-shop">
            {products && <ProductTable products={products} selectProduct={selectProduct} />}
            <EditProduct product={product} unSelectProduct={selectProduct} saveProduct={saveProduct} removeProduct={removeProduct} />
        </section>
    )
}
