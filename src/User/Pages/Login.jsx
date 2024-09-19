import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const navigate=useNavigate()
  const {loginmail,setLoginmail,loginpass,setLoginpass,loginSubmit}=useContext(Pascomponent)
 
  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-[70vh] w-[100vw] bg-[#fcf8ef] flex justify-center items-center'>
      <div className='w-[80vw] h-[40vh]'>
      <h1 className='font-sofadi text-3xl'>Sign In</h1>
      <form className='mt-8' onSubmit={loginSubmit}>
        <label className='font-semibold ml-5 text-xl '>Enter Your E-mail</label>
        <input value={loginmail} onChange={(e)=>setLoginmail(e.target.value)} className='outline-none p-3 bg-[#fcf8ef] rounded-md border-solid border-black border-[1px] ml-5' type="email" />
        <br />
        <label className='font-semibold ml-5 text-xl'>Enter Your Password</label>
        <input value={loginpass} onChange={(e)=>setLoginpass(e.target.value)} className='outline-none p-3 mt-3 ml-5 bg-[#fcf8ef] rounded-md border-solid border-black border-[1px]' type="password" />
        <br />
        <br />
        <button className='md:ml-[200px] w-[100px] ml-6 rounded-md font-semibold border-solid border-black border-[2px] text-xl' type='submit'>Submit</button>
      </form>
      </div>
      </div>
      <Footer/>
      
    </div>
  )
}

export default Login
