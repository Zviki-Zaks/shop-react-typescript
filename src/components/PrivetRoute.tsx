import React from 'react'
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom'

interface Props {
    condition: boolean
    redirect: string
}

export const PrivetRoute: React.FC<Props> = ({ condition, redirect }) => {
    const context = useOutletContext()
    const { pathname } = useLocation()
    if (!condition) {
        return <Navigate to={redirect} state={{ from: pathname }} />
    }
    return (
        <Outlet context={context} />
    )
}
