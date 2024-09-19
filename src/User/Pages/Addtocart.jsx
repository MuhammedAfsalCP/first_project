import React, { useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'
import axios from 'axios'

const Addtocart =  () => {
  const {userid,user,cartview,increament,decreament}=useContext(Pascomponent)
  
  
    
  
  
  return (
    <div>
      <Navbar />
      <div className='md:pt-[80px] md:mb-[60px] min-h-[70vh] w-[100vw] bg-[#fcf8ef] flex justify-center items-center'>
        <div>
          {cartview.map((x)=>{
            return (<div key={x.id} className='w-[70vw] bg-white flex items-center justify-center'>
            <div className='w-[15vw] h-[150px]'>
        <img className='object-contain w-full h-full' src={x.image} alt="" />
            </div>
            <div className='h-[200px] w-[55vw]  flex justify-center items-center gap-5'>
              <div className='h-[150px] w-[25vw]  flex justify-center items-center flex-wrap'>
                <div className='h-[75px] w-[25vw] flex justify-center items-center'>
                  <h1>{x.name}</h1>
                </div>
                <div className='h-[75px] w-[25vw] flex justify-center items-start'> <h1>{x.weight}</h1></div>
              </div>
              <div className='h-[150px] w-[10vw]  flex justify-center items-center gap-4'>
                <button onClick={()=>increament(x)} className='flex justify-center items-center'><box-icon name='plus'></box-icon></button>
                <h1>{x.quantity}</h1>
                <button onClick={()=>decreament(x)} className='flex justify-center items-center'><box-icon name='minus'></box-icon></button>
              </div>
              <div className='h-[150px] w-[10vw]  flex justify-center items-center'>
              <h1>$ {x.total_price}</h1>
              </div>
            </div>
          </div>)
          })}

          <div className='w-[70vw] h-[200px]  flex justify-end items-center'>
            <div className='w-[20vw] h-[180px]  flex flex-wrap'>
              <div className='w-[10vw] h-[90px]  flex justify-center items-center'>
                <h1>items</h1>
              </div>
              <div className='w-[10vw] h-[90px]  flex justify-center items-center'>
                <h1>total</h1>
              </div>
              <div className='w-[20vw] h-[90px] b flex justify-center items-center'>
                <button className='w-[200px] h-[60px] bg-blue-600 rounded'>Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Addtocart
