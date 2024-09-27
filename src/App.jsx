import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './User/Pages/Signup'
import Login from './User/Pages/Login'
import ContaxtForm from './User/Contaxt/Contaxt'
import Home from './User/Pages/Home'
import CartDetails from './User/Pages/CartDetails'
import Addtocart from './User/Pages/Addtocart'
import Paymentsection from './User/Pages/Paymentsection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './Admin/AllProducts'
import Users from './Admin/Users'
import UserDetail from './Admin/UserDetail'
import DashBoard from './Admin/DashBoard'
import Editproduct from './Admin/Editproduct'
import AddProducts from './Admin/AddProducts'


export const Pascomponent = React.createContext()
function App() {


  return (
    <>
      <ContaxtForm>
     
        <Routes>
          <Route path='/' element={<Home />}>
          <Route path='AllProducts' element={<AllProducts/>}/>
          <Route path='Users' element={<Users/>}/>
          <Route path='Dashboard' element={<DashBoard/>}/>
          <Route path='EditProducts' element={<Editproduct/>}/>
          <Route path=':userId' element={<UserDetail/>}/>
          <Route path='Addproduct' element={<AddProducts/>}/>
          </Route>

          <Route path='Signup' element={<Signup />} />
          <Route path='Login' element={<Login />} />
         
         <Route path='cart/:userId' element={<CartDetails/>}/>
         <Route path='AddtoCart' element={<Addtocart/>}/>
         <Route path='Payment' element={<Paymentsection/>}/>
        </Routes>
       
      </ContaxtForm>
      <ToastContainer/>
    </>
  )
}

export default App
