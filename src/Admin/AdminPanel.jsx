import React, { useState } from 'react'

import { useContext } from 'react'
import { Pascomponent } from '../App'
import { Link, Outlet } from 'react-router-dom'


const AdminPanel = () => {
 const{logout}=useContext(Pascomponent)
  const [check,setcheck]=useState(true)
  return ( 
    <div className="flex flex-wrap">
    {/* Header */}
    <div className="w-full h-[10vh] flex items-center justify-between bg-[#007BFF] px-4">
      <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
      <button onClick={logout} className="bg-[#FF5733] text-white font-semibold py-2 px-4 rounded hover:bg-[#C0392B] transition-all duration-300">Logout</button>
    </div>
  
    {/* Sidebar */}
    <div className="bg-[#2C3E50] w-[20%] h-[90vh] flex flex-col">
      
      <ul className="flex flex-col">
        <Link onClick={()=>setcheck(false)} to={'Dashboard'} className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Dashboard</Link>
        <Link onClick={()=>setcheck(false)} to={'Users'}><li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Users</li></Link>
        <Link onClick={()=>setcheck(false)} to={'EditProducts'} className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Edit Products</Link>
        <Link onClick={()=>setcheck(false)} to={'Addproduct'}><li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">Add Products</li></Link>
        <Link onClick={()=>setcheck(false)} to={'AllProducts'}><li className="text-white p-4 hover:bg-[#34495E] cursor-pointer">All Products</li></Link>
      </ul>
    </div>
    
    {/* Main Content Area */}
    <div className="bg-[#ECF0F1] w-[80%] h-[90vh] overflow-scroll p-6">
      
     <Outlet/>
      {/* Additional content goes here */}
    </div>
  </div>
  


  )
}

export default AdminPanel
