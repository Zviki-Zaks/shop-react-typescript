import React from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { Product } from '../models/product.model'

export const EditProduct = () => {
    const { fields, register } = useFormRegister<Product>(null!)
    return (
        <div></div>
    )
}
