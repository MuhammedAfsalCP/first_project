import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'
import { Link} from 'react-router-dom'
const Login = () => {
  const {loginmail,setLoginmail,loginpass,setLoginpass,loginSubmit}=useContext(Pascomponent)
  return (
    <div className='h-screen w-full bg-[#fcf8ef] flex flex-col'>
  {/* Main Content */}
  <div className='flex-grow flex justify-center items-center'>
    <div className='w-full max-w-md bg-white shadow-lg rounded-md p-8'>
      <h1 className='font-sofadi text-3xl text-center mb-6'>Sign In</h1>
      <form className='space-y-6' onSubmit={loginSubmit}>
        
        {/* Email Input */}
        <div className='flex flex-col'>
          <label className='font-semibold text-lg mb-2'>Enter Your E-mail</label>
          <input  onChange={(e) => setLoginmail(e.target.value)} className='outline-none p-3 bg-transparent border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300'  type='email'  placeholder='Enter your email' required/>
        </div>

        {/* Password Input */}
        <div className='flex flex-col'>
          <label className='font-semibold text-lg mb-2'>Enter Your Password</label>
          <input  onChange={(e) => setLoginpass(e.target.value)}  className='outline-none p-3 bg-transparent border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300' type='password' placeholder='Enter your password' required/>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
          <button className='w-full bg-[#a6c1ee] text-white rounded-md py-2 font-semibold border border-transparent hover:bg-[#87acec] transition-all duration-300' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  </div>

  {/* Footer Link */}
  <div className='bg-[#fcf8ef] font-bold text-center py-2'>
    <Link to={'/Signup'} className='text-blue-500 hover:underline'>Don't have an account? Signup here</Link>
  </div>
  <Footer />
</div>
  )
}

export default Login
