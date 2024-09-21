import React from 'react'

import Footer from '../Components/Footer'
import { useNavigate,Link} from 'react-router-dom'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { Pascomponent } from '../../App'
const Signup = () => {
  const {handleSubmit,name, setName, email, setEmail,pass, setPass, confirm, setConfirm, verifyname, verifyemail, verifypass,verifyconfirm}=useContext(Pascomponent)
   return (
    <div className='min-h-screen bg-[#fcf8ef] flex flex-col'>
  {/* Main Content */}
  <div className='flex-grow flex items-center justify-center p-5'>
    <div className='w-full max-w-md bg-white border border-[#1c110b] rounded-lg p-8 shadow-lg'>
      <h1 className='font-sofadi font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-6'>Create Account</h1>
      <form id='full_form' onSubmit={handleSubmit} className='flex flex-col space-y-6'>
        
        {/* Name Input */}
        <div className='flex flex-col'>
          <label className='text-base md:text-lg lg:text-xl font-semibold'>Enter Your Name<span className={`ml-3 ${verifyname === null ? 'hidden' : 'inline-block'}`}> <box-icon name={verifyname ? 'check' : 'error'} color={verifyname ? '#14b30e' : '#ff0000'}></box-icon> </span></label>
          <input id='name' value={name} onChange={(e) => setName(e.target.value)} className='mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300' type='text' placeholder='Enter Name' required/>
        </div>

        {/* Email Input */}
        <div className='flex flex-col'>
          <label className='text-base md:text-lg lg:text-xl font-semibold'>
            Enter Your Email<span className={`ml-3 ${verifyemail === null ? 'hidden' : 'inline-block'}`}><box-icon name={verifyemail ? 'check' : 'error'} color={verifyemail ? '#14b30e' : '#ff0000'}></box-icon></span></label>
          <input id='mail' value={email} onChange={(e) => setEmail(e.target.value)} className='mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300' type='email'  placeholder='Enter E-mail' required/>
        </div>

        {/* Password Input */}
        <div className='flex flex-col'>
          <label className='text-base md:text-lg lg:text-xl font-semibold'>Create a Password<span className={`ml-3 ${verifypass === null ? 'hidden' : 'inline-block'}`}><box-icon name={verifypass ? 'check' : 'error'} color={verifypass ? '#14b30e' : '#ff0000'}></box-icon></span></label>
          <input id='password' value={pass} onChange={(e) => setPass(e.target.value)} className='mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300' type='password' placeholder='Enter Password' required/>
        </div>

        {/* Confirm Password Input */}
        <div className='flex flex-col'>
          <label className='text-base md:text-lg lg:text-xl font-semibold'>Confirm Your Password<span className={`ml-3 ${verifyconfirm === null ? 'hidden' : 'inline-block'}`}><box-icon name={verifyconfirm ? 'check' : 'error'} color={verifyconfirm ? '#14b30e' : '#ff0000'}></box-icon></span></label>
          <input id='confirm' value={confirm}  onChange={(e) => setConfirm(e.target.value)} className='mt-2 p-3 bg-transparent border border-[#1c110b] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300' type='password' placeholder='Re-Enter Password' required/>
        </div>

        {/* Submit Button */}
        <button className='bg-[#ad9279] text-white rounded-md py-2 text-lg md:text-xl lg:text-2xl font-semibold w-full mt-4 transition-all duration-300 hover:bg-[#927156]' type='submit'>Submit</button>
      </form>
    </div>
  </div>

  {/* Footer */}
  <div className='bg-[#fcf8ef] font-bold text-center py-2'>
    <Link to={'/Login'} className='text-blue-500 hover:underline'>Already have an account?</Link>
  </div>
  <Footer />
</div>
  )
}

export default Signup
