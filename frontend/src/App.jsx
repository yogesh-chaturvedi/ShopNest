import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Product from './pages/Product'
import Cart from './pages/Cart'
import DeliveryAndPayment from './pages/DeliveryAndPayment'
import DashboardHome from './pages/Dashboard/DashboardHome'
import Orders from './pages/Orders'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import PasswordReset from './pages/PasswordReset'

const App = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const role = JSON.parse(localStorage.getItem("role"))

  const navigate = useNavigate()

  useEffect(() => {
    if (token && role === "admin") {
      navigate('/dashboard')
    }
  }, [token, role])

  const PrivateRoute = ({ children }) => {
    return token && role === 'user' ? children : <Navigate to="/login" />
  }

  const AdminRoute = ({ children }) => {
    return token && role === 'admin' ? children : <Navigate to='login' />
  }

  return (
    <div className='text-black'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/passwordReset' element={<PasswordReset />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path={'/product/:item'} element={<Product />} />


        {/* private routes */}

        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/delivery&payment' element={<PrivateRoute><DeliveryAndPayment /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='/dashboard' element={<AdminRoute><DashboardHome /></AdminRoute>} />
      </Routes>
    </div>
  )
}

export default App

