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
import UsersProtectedRoutes from './Components/UsersProtectedRoutes'
import AdminProtectedRoutes from './Components/AdminProtectedRoutes'

const App = () => {


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


        {/* user private routes */}
        <Route element={<UsersProtectedRoutes />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/delivery&payment' element={<DeliveryAndPayment />} />
          <Route path='/orders' element={<Orders />} />
        </Route>

        {/* admin private routes */}
        <Route element={<AdminProtectedRoutes />}>
          <Route path='/dashboard' element={<DashboardHome />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App

