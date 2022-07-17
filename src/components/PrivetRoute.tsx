import React from 'react'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'

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
