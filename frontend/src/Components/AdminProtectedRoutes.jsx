import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoutes = () => {

    const { verifyUser, user, setUser, loading } = useContext(AuthContext)

    if (loading) {
        return (<p className='text-2xl font-bold flex justify-center items-center'>Loading...</p>)
    }
    return (user?.role === "admin" ? (<Outlet />) : (<Navigate to='/login' replace />))

}

export default AdminProtectedRoutes