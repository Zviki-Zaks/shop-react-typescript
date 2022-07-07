import React, { useContext } from 'react'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { UserContext } from '../App'
import { useProducts } from './ShopApp'

interface Props {
    condition: boolean
    redirect: string
}

export const PrivetRoute: React.FC<Props> = ({ condition, redirect }) => {
    const context = useOutletContext()

    if (!condition) {
        return <Navigate to={redirect} />
    }
    return (
        <Outlet context={context} />
    )
}
