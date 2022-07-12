import React, { useEffect } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { NewProduct, Product } from '../models/product.model'

interface Props {
    product?: Product | null
}

export const EditProduct = ({ product }: Props) => {
    const { fields, register, setFields } = useFormRegister<Product | NewProduct>({
        id: '',
        name: '',
        price: '',
        category: ''
    })
    useEffect(() => {
        if (product) setFields(product)
    }, [product])

    return (
        <section className="edit-product">
            {fields &&
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <input type="text" {...register('name')} placeholder="Name" />
                    <input type="text" {...register('category')} placeholder="Category" />
                    <input type="number" {...register('price')} placeholder="Price" />
                </form>
            }
        </section>
    )
}
