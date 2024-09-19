import React from 'react'

import Footer from '../Components/Footer'
import { useNavigate,Link} from 'react-router-dom'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { Pascomponent } from '../../App'
const Signup = () => {
  
  const {handleSubmit,name, setName, email, setEmail,pass, setPass, confirm, setConfirm, verifyname, verifyemail, verifypass,verifyconfirm}=useContext(Pascomponent)
  
   return (
    <div className='h-[100vh] w-auto'>
      <div className='flex h-[65vh] w-auto bg-[#fcf8ef] justify-center items-center'>
        <div className='w-[300px] h-[390px] md:w-[60vw] border-solid border-[#1c110b] border-[2px] rounded-lg md:pl-6'>
          <h1 className='font-sofadi font-bold text-2xl ml-3 mt-2 md:text-4xl'>Create Account</h1>
          <div className='md:pt-6 md:w-auto flex justify-center items-center h-auto md:justify-start'>
            <form id='full_form' action="" onSubmit={handleSubmit} className='md:h-[50vh] flex md:block flex-wrap w-[220px] md:w-[60vw] justify-center md:justify-end' >
              <label className='md:ml-5 md:text-3xl text-lg font-semibold mt-2 md:mt-3'>Enter Your name :<span style={{display: verifyname ? 'none':verifyname==null?'none':'inline-block'}} className='pl-3'><box-icon name='error' type='solid' color='#ff0000' ></box-icon></span><span style={{display: verifyname ? 'inline-block':verifyname==null?'none':'none'}}><box-icon name='check' color='#14b30e' ></box-icon></span></label>
              <br className='md:hidden' />
              <input id='name'value={name} onChange={(e)=>setName(e.target.value)} className='md:ml-4 md:w-[50%] outline-none bg-transparent border-solid border-[#1c110b] border-[1px] rounded-lg mt-2 pl-3' type="text" placeholder='Enter Name' />
              <br />
              <label className='md:ml-5 md:text-3xl text-lg font-semibold mt-2'>Enter Your Email :<span style={{display: verifyemail ? 'none':verifyemail==null?'none':'inline-block'}} className='pl-3'><box-icon name='error' type='solid' color='#ff0000' ></box-icon></span><span style={{display: verifyemail ? 'inline-block':verifyemail==null?'none':'none'}}><box-icon name='check' color='#14b30e' ></box-icon></span></label>
              <br className='md:hidden' />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} id='mail' className='md:ml-4 md:w-[50%] outline-none bg-transparent border-solid border-[#1c110b] border-[1px] rounded-lg mt-2 pl-3' type="email" placeholder='Enter E-mail' />
              <br />
              <label className='md:ml-5 md:text-3xl text-lg font-semibold mt-2 md:mt-3'>Create a Password :<span style={{display: verifypass ? 'none':verifypass==null?'none':'inline-block'}} className='pl-3'><box-icon name='error' type='solid' color='#ff0000' ></box-icon></span><span style={{display: verifypass ? 'inline-block':verifypass==null?'none':'none'}}><box-icon name='check' color='#14b30e' ></box-icon></span></label>
              <br className='md:hidden' />
              <input value={pass} onChange={(e)=>setPass(e.target.value)} id='password' className='md:ml-4 md:w-[45%] outline-none bg-transparent border-solid border-[#1c110b] border-[1px] rounded-lg mt-2 pl-3' type="password" placeholder='Enter Password' />
              <br />
              <label className='md:ml-5 md:text-3xl text-base font-semibold mt-2'>Confirm Your Password</label>
              <span  className='hidden md:inline-block text-3xl font-semibold'>&nbsp;:</span>
              {/* <span style={{display: verifyconfirm ? 'none':verifyconfirm==null?'none':'inline-block'}} className='hidden md:inline-block ml-2'><box-icon name='error' type='solid' color='#ff0000' ></box-icon></span> */}
              <span style={{display: verifyconfirm ? 'inline-block':verifyconfirm==null?'none':'none'}}><box-icon name='check' color='#14b30e' ></box-icon></span>
              <span style={{display: verifyconfirm ? 'none':verifyconfirm==null?'none':'inline-block'}} className='md:hidden'><box-icon name='error' type='solid' color='#ff0000' ></box-icon></span>
              <br className='md:hidden' />
              <input id='confirm' value={confirm} onChange={(e)=>setConfirm(e.target.value)} className='md:ml-4 md:w-[45%] outline-none bg-transparent border-solid border-[#1c110b] border-[1px] rounded-lg mt-2 pl-3' type="password" placeholder='Re-Enter Password' />
              <br />
              <button className='md:ml-[270px] md:mt-8 md:w-[200px] md:text-3xl text-xl font-semibold mt-4 bg-[#ad9279] text-white w-[100px] rounded-md' type='submit'>Submit</button>
            </form>
          </div>
        </div>
        
      </div>
     <div className='h-[5vh] bg-[#fcf8ef] font-bold flex justify-center'>
     <Link to={'/Login'}>Alredy have Account</Link>
     </div>
      <Footer />
    </div>
  )
}

export default Signup
