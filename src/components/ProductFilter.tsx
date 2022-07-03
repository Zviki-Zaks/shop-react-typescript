import React from 'react'

interface Props {
    fields: {
        name?: string;
        category?: string;
    };
    register: (filed: string) => {
        name: string;
        id: string;
        value: string;
        onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    },
    options: string[]
}

export const ProductFilter: React.FC<Props> = ({ register, options }) => {
    return (
        <div className="product-filter">
            <input type="text" {...register('name')} placeholder="Search by name" />
            <input type="text" {...register('category')} placeholder="Search by category" />
        </div>
    )
}
