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
  const {itemfilter,setItemfilter,user,setUser,setUserid,userid,setCartview}=useContext(Pascomponent)
  useEffect(()=>{
     
    const user=localStorage.getItem("user_Id")
    if(user){
      setUser(true)
      setUserid(localStorage.getItem("user_Id"))
     
    }
  },[user])
  
  
  const logout = () => {
    // Clear localStorage and sessionStorage
    localStorage.removeItem('user_Id');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('cart'); // Clear cart from sessionStorage
    
    // Reset user-related state
    setUserid("");
    setCartview([]);
    setUser(false);
  
    // Navigate to login page
    navigate('/Login');
  };
  
  
  
  return (
    <div className='md:fixed h-auto'>
      <div className='flex justify-center bg-[#fcf8ef] w-[100vw]'>
      <nav className='w-[92%] h-[10vh] bg-[#fcf8ef] flex items-center justify-between'>
     
       <div className='w-[100px] flex items-center'>
       <span className='md:hidden cursor-pointer' onClick={toggleNavebar}>{isOpen?<box-icon name='x'></box-icon>:<box-icon name='menu' ></box-icon>}</span>
        <img src={logo} alt="" />
       </div>
       <div style={{top:isOpen?"9%":"-100%"}} className='md:static absolute md:min-h-fit  min-h-[30vh]  left-0 top-[-100%] md:w-auto w-full flex md:items-center px-5'>
       <ul className='flex md:flex-row flex-col items-center md:hap-[4vw] gap-[60px]'>
       <li><Link onClick={()=>setItemfilter(null)} className='font-semibold text-xl hover:text-gray-500'>All</Link></li>
        <li><Link onClick={()=>setItemfilter(true)} className='font-semibold text-xl hover:text-gray-500'>Dogs</Link></li>
        <li><Link onClick={()=>setItemfilter(false)} className='font-semibold text-xl hover:text-gray-500'>Cats</Link></li> 
        <li style={{display:user?"inline-block":"none"}}><Link to={'/AddtoCart'} className='font-semibold text-xl hover:text-gray-500'>Carts</Link></li> 
        <li style={{display:user?"inline-block":"none"}}><a onClick={logout} className='font-semibold text-xl hover:text-gray-500'>Logout</a></li> 
        
       </ul>
       </div>
       <div  style={{display:user?"none":"flex"}} className='gap-6'>
        <button onClick={()=>navigate('/Login')} className='bg-[#a6c1ee] w-[80px] h-[40px] rounded-full text-white hover:bg-[#87acec]'>Sign In</button>
        <button onClick={()=>navigate('/Signup')} className='bg-[#a6c1ee] w-[80px] h-[40px] rounded-full text-white hover:bg-[#87acec]'>Sign Up</button>
       </div>
      </nav>
    </div>
    </div>
  )
}

export default Navbar
