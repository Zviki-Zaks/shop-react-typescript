import { fireEvent } from '@testing-library/react'
import React, { useEffect } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { NewProduct, Product } from '../models/product.model'

interface Props {
    product?: Product | null,
    unSelectProduct: (productId: string | null) => Promise<void> | undefined
    saveProduct: (product: Product) => Promise<void>
    removeProduct: (productId: string) => Promise<void>
}

export const EditProduct = ({ product, unSelectProduct, saveProduct, removeProduct }: Props) => {
    const emptyProduct = {
        id: '',
        name: '',
        price: '',
        category: '',
        inStock: ''
    }
    const { fields, register, setFields } = useFormRegister<Product>(emptyProduct as unknown as Product)
    useEffect(() => {
        if (product) setFields(product)
        else resetForm()
    }, [product])

    const onSave = async () => {
        if (fields.name && fields.price && typeof fields.price === 'number' && fields.category) {
            await saveProduct(fields)
            resetForm()
        }
        else console.log('unvalid', fields)
    }
    const onCancel = () => {
        if (!product) return resetForm()
        unSelectProduct(null)
    }
    const onRemove = () => {
        if (product)
            removeProduct(product.id)
    }
    const resetForm = () => {
        setFields(emptyProduct as unknown as Product)
    }

    return (
        <section className="edit-product">
            <h3>{product ? 'Edit' : 'Add New'} Product</h3>
            {fields &&
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <label htmlFor="name">Name</label>
                    <input type="text" {...register('name')} placeholder="Name" />
                    <label htmlFor="category">Category</label>
                    <input type="text" {...register('category')} placeholder="Category" />
                    <label htmlFor="price">Price</label>
                    <input type="number" {...register('price')} placeholder="Price" />
                    <label htmlFor="inStock">In Stock</label>
                    <input type="number" {...register('inStock')} placeholder="In Stock" />
                    <div className="actions">
                        <button onClick={onCancel}>cancel</button>
                        <button onClick={onSave}>save</button>
                        {product && <button onClick={onRemove}>remove</button>}
                    </div>
                </form>
            }
        </section>
    )
}
