import React, { useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'
const Addtocart =  () => {
  const {cartview,increament,decreament,totalamount,totalQuantity,spesificdelete,payment}=useContext(Pascomponent)
  return (
    <div>
    <Navbar />
    <div className='pt-[80px] pb-[60px] min-h-[70vh] w-full bg-[#fcf8ef] flex flex-col items-center'>
      <div className='w-full max-w-screen-lg bg-white p-6 rounded-lg shadow-lg'>
        {cartview.map((x) => (
          <div key={x.id} className='flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-4 px-2'>
            
            {/* Image Section */}
            <div className='w-full md:w-[20%] flex justify-center'>
              <img className='object-contain w-full h-32 md:h-40 rounded-lg shadow-sm' src={x.image} alt={x.name} />
            </div>
            
            {/* Details Section */}
            <div className='w-full md:w-[60%] flex flex-col md:flex-row justify-between items-center gap-4'>
              
              {/* Product Info */}
              <div className='w-full flex flex-col md:flex-row justify-between items-center gap-2'>
                <h1 className='text-lg font-semibold text-gray-800'>{x.name}</h1>
                <h1 className='text-lg text-gray-600'>{x.weight}</h1>
              </div>
              
              {/* Quantity Controls */}
              <div className='flex items-center justify-center gap-4'>
                <button onClick={() => increament(x)} className='p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200'>
                  <box-icon name='plus' />
                </button>
                <h1 className='text-lg'>{x.quantity}</h1>
                <button onClick={() => decreament(x)} className='p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200'>
                  <box-icon name='minus' />
                </button>
              </div>
              
              {/* Price and Delete */}
              <div className='flex items-center justify-between gap-4'>
                <h1 className='text-lg font-semibold text-gray-800'>${x.total_price}</h1>
                <button onClick={() => spesificdelete(x)} className='bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition duration-200'>Delete</button>
              </div>
            </div>
          </div>
        ))}
  
        {/* last Section */}
        <div className='w-full mt-6 flex flex-col md:flex-row justify-end items-center'>
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <div className='text-lg font-semibold text-gray-800'>Total Quantity: {totalQuantity}</div>
              <div className='text-lg font-semibold text-gray-800'>Total Amount: ${totalamount}</div>
            </div>
            <button onClick={payment} className='w-full md:w-[200px] h-[60px] bg-blue-600 text-white rounded mt-4 md:mt-0 hover:bg-blue-700 transition duration-200'>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  
    <Footer />
  </div>
  

  )
}

export default Addtocart
