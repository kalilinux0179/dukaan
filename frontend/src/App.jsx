import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/selleradmin/auth/Login'
import Register from './pages/selleradmin/auth/Register'
import AdminLayout from './pages/admin/Layout/AdminLayout'
import AdminDashboard from './pages/admin/Layout/AdminDashboard'
import SellerLayout from './pages/sellers/Layout/SellerLayout'
import SellerDashboard from './pages/sellers/Layout/SellerDashboard'
import Categories from './pages/admin/Category/Categories'
import Layout from './pages/customer/Layout/Layout'
import Sellers from './pages/admin/Sellers/Sellers'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path='/' element={<Layout />} />
          {/* seller routes */}
          <Route path="/seller" element={<SellerLayout />} >
            <Route index element={<SellerDashboard />} />
          </Route>
          {/* admin routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/sellersList" element={<Sellers />} />
            <Route path="/admin/categories" element={<Categories />} />
          </Route>
          {/* seller and admin routes */}
          <Route path='/auth/sa/login' element={<Login />} />
          <Route path='/auth/sa/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App