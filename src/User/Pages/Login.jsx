import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const navigate=useNavigate()
  const {loginmail,setLoginmail,loginpass,setLoginpass,loginSubmit}=useContext(Pascomponent)
 
  return (
    <div className='h-[100vh] w-[100vw] bg-[#fcf8ef]'>
   
    <div className='h-[70vh] w-[100vw] bg-[#fcf8ef] flex justify-center items-center'>
  <div className='w-[90vw] max-w-[500px] bg-white shadow-lg rounded-md p-8'>
    <h1 className='font-sofadi text-3xl text-center mb-6'>Sign In</h1>
    <form className='space-y-6' onSubmit={loginSubmit}>
      {/* Email Input */}
      <div className='flex flex-col'>
        <label className='font-semibold text-lg mb-2'>Enter Your E-mail</label>
        <input 
          value={loginmail} 
          onChange={(e) => setLoginmail(e.target.value)} 
          className='outline-none p-3 bg-[#fcf8ef] rounded-md border border-black'
          type='email'
          placeholder='Enter your email'
        />
      </div>

      {/* Password Input */}
      <div className='flex flex-col'>
        <label className='font-semibold text-lg mb-2'>Enter Your Password</label>
        <input 
          value={loginpass} 
          onChange={(e) => setLoginpass(e.target.value)} 
          className='outline-none p-3 bg-[#fcf8ef] rounded-md border border-black'
          type='password'
          placeholder='Enter your password'
        />
      </div>

      {/* Submit Button */}
      <div className='flex justify-center'>
        <button 
          className='w-full bg-[#a6c1ee] text-white rounded-md py-2 font-semibold border border-black hover:bg-[#87acec] transition-all duration-300' 
          type='submit'
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
<div className='bg-[#fcf8ef] font-bold text-center py-2'>
      <Link to={'/Signup'} className='text-blue-500 hover:underline'>Don't have an account? Signup here</Link>
    </div>
      <Footer/>
    </div>
  )
}

export default Login
