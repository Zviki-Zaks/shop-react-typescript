import React from 'react'

interface Props {
    cartCount: number
    amount: number
}

export const CartEnd: React.FC<Props> = ({ cartCount, amount }) => {
    const displayAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    return (
        <div className="cart-end flex space-between">
            <div>Products: {cartCount}</div>
            <div>Amount: {displayAmount}</div>
        </div>
    )
}
