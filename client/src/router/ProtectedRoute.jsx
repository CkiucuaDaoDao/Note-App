import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    if(!localStorage.getItem('accessToken')) {
        <Navigate to='/login' />
        return
    }

    return (
        <Outlet />
    )
}
