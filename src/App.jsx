import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './User/Pages/Signup'
import Login from './User/Pages/Login'
import ContaxtForm from './User/Formvalidation/Form'
import Home from './User/Pages/Home'
import LandingPage from './User/Pages/Home'

import All from './User/Components/All'
import Dogs from './User/Components/Dogs'
import Cats from './User/Components/Cats'
import CartDetails from './User/Pages/CartDetails'
import Addtocart from './User/Pages/Addtocart'
export const Pascomponent = React.createContext()
function App() {


  return (
    <>
      <ContaxtForm>
     
        <Routes>
          <Route path='/' element={<Home />}/>

          <Route path='Signup' element={<Signup />} />
          <Route path='Login' element={<Login />} />
         
         <Route path=':userId' element={<CartDetails/>}/>
         <Route path='AddtoCart' element={<Addtocart/>}/>
        </Routes>
       
      </ContaxtForm>
    </>
  )
}

export default App
