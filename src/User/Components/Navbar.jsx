import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { useNavigate,Link } from 'react-router-dom'
import { Pascomponent } from '../../App'
const Navbar = () => {
  const navigate=useNavigate()
  const [isOpen,setIsOpen]=useState(false)
 
  const toggleNavebar=()=>{
    setIsOpen(!isOpen)
  }
  const {itemfilter,setItemfilter,user,setUser,setUserid,userid,setCartview,totalQuantity,logout,setSearch,showname,setShowname}=useContext(Pascomponent)
  useEffect(()=>{
     
    const user=localStorage.getItem("user_Id")
    if(user){
      setUser(true)
      setUserid(localStorage.getItem("user_Id"))
      setShowname(localStorage.getItem("user_name"))
      
     
    }
  },[user])
 
  
  
  
  
  return (
    
    <div className='fixed top-0 left-0 w-full z-50 bg-[#fcf8ef]'>
  <div className='flex justify-center'>
    <nav className='w-[92%] h-[10vh] flex items-center justify-between'>
      {/* Logo and Menu Toggle Button */}
      <div className='w-[100px] flex items-center'>
        <span className='md:hidden cursor-pointer' onClick={toggleNavebar}>
          {isOpen 
            ? <box-icon name='x'></box-icon> 
            : <box-icon name='menu'></box-icon>}
        </span>
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div 
        style={{top: isOpen ? "10vh" : "-100%"}} 
        className='md:static fixed md:min-h-fit min-h-[30vh] left-0 md:w-auto w-full flex md:items-center px-5 bg-[#fcf8ef] transition-all duration-300'
      >
        <ul className='flex md:flex-row flex-col items-center md:gap-[4vw] gap-[60px]'>
          <li  className='hidden md:flex items-center '>< input onChange={(e)=>setSearch(e.target.value)} className='pl-5 border-solid border-[1px] border-black rounded outline-none focus:outline-none' placeholder='search' type="search" /></li>
          <li><Link to={'/'} onClick={() => setItemfilter(null)} className='font-semibold text-xl hover:text-gray-500'>All</Link></li>
          <li><Link to={'/'} onClick={() => setItemfilter(true)} className='font-semibold text-xl hover:text-gray-500'>Dogs</Link></li>
          <li><Link to={'/'} onClick={() => setItemfilter(false)} className='font-semibold text-xl hover:text-gray-500'>Cats</Link></li>
          {/* Carts and Logout - Shown only when user is logged in */}
          <li style={{display: user ? "inline-block" : "none"}}>
            <Link to={'/AddtoCart'} className='font-semibold text-xl hover:text-gray-500 flex justify-center items-center'><box-icon type='solid' name='cart'></box-icon>{totalQuantity}</Link>
          </li>
          <li style={{display: user ? "inline-block" : "none"}}>
            <Link className='font-semibold text-xl hover:text-gray-500 flex justify-center items-center'><box-icon name='user-circle' type='solid' ></box-icon>{showname}</Link>
            
          </li>
          
          <li style={{display: user ? "inline-block" : "none"}}>
            <a onClick={logout} className='font-semibold text-xl hover:text-gray-500'>Logout</a>
          </li>
        </ul>
      </div>

      {/* Sign In / Sign Up Buttons */}
      <div style={{display: user ? "none" : "flex"}} className='gap-6'>
        <button onClick={() => navigate('/Login')} className='bg-[#a6c1ee] w-[80px] h-[40px] rounded-full text-white hover:bg-[#87acec]'>Sign In</button>
        <button onClick={() => navigate('/Signup')} className='bg-[#a6c1ee] w-[80px] h-[40px] rounded-full text-white hover:bg-[#87acec]'>Sign Up</button>
      </div>
      <div className='md:hidden'>
        <input onChange={(e)=>setSearch(e.target.value)} type="search" className='pl-5 border-solid border-[1px] border-black rounded outline-none focus:outline-none' placeholder='Search'/>
      </div>
    </nav>
  </div>
</div>


  )
}

export default Navbar
