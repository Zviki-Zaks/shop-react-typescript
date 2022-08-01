import React, { useContext } from 'react'
import { OutletProps } from 'react-router-dom'
import { Product } from '../models/product.model'
import { EditProduct } from './EditProduct'
import { ProductTable } from './common/ProductTable'
import { ProductContext } from '../context/ContextProvider'

export const EditShop: React.FC<OutletProps> = () => {
    const { productState, productDispatch } = useContext(ProductContext)

    const selectProduct = (productId: string | null) => {
        productDispatch({ type: 'SET_PRODUCT', payload: productId })
    }
    const saveProduct = async (product: Product) => {
        productDispatch({ type: "SAVE_PRODUCT", payload: product })
    }
    const removeProduct = async (productId: string) => {
        productDispatch({ type: 'REMOVE_PRODUCT', payload: productId })
    }

    return (
        <section className="edit-shop">
            {productState.products &&
                <>
                    {productState.products.length ?
                        <ProductTable products={productState.products} selectProduct={selectProduct} /> :
                        null
                    }
                    <EditProduct product={productState.currProduct} unSelectProduct={selectProduct} saveProduct={saveProduct} removeProduct={removeProduct} />
                </>
            }
        </section>
    )
}
