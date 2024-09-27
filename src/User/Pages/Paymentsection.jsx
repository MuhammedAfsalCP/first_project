import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'
import Navbar from '../Components/Navbar'

const Paymentsection = () => {
    const {verifyOrder, Addresscheck, address, setaddress, addressmail, setaddressmail, addressname, setAddressname, paymentview, totalamount } = useContext(Pascomponent)
    return (
      <div className='min-h-[100vh] w-full bg-[#fcf8ef]'>
      <Navbar />
      <div className='min-h-[80vh] w-full flex flex-col md:flex-row justify-center items-center p-4 mt-10'>
        {/* Address Form Section */}
        <div className='h-auto w-full md:w-[45vw] p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center mb-6 md:mb-0'>
          <form className='flex flex-col space-y-4' onSubmit={Addresscheck}>
            {/* Name Input */}
            <div className='flex flex-col'>
              <label className='text-lg font-semibold mb-1'>Enter Your Name</label>
              <input  onChange={(e) => setAddressname(e.target.value)} type="text" placeholder='Enter Full Name' className='p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
    
            {/* Email Input */}
            <div className='flex flex-col'>
              <label className='text-lg font-semibold mb-1'>Enter Your Email</label>
              <input  onChange={(e) => setaddressmail(e.target.value)}  type="email"  placeholder='Enter your email' className='p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
    
            {/* Address Input */}
            <div className='flex flex-col'>
              <label className='text-lg font-semibold mb-1'>Enter Your Address</label>
              <textarea  onChange={(e) => setaddress(e.target.value)}  placeholder='Enter your address' className='p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500' rows="4"/>
            </div>
    
            {/* Submit Button */}
            <button type="submit" className='bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition-colors'>Submit</button>
          </form>
        </div>
    
        {/* Payment Section */}
        <div style={{ display: paymentview ? "block" : "none" }} className='h-auto w-full md:w-[45vw] p-6 bg-white shadow-lg rounded-lg flex flex-col space-y-4'>
          <h1 className='text-2xl font-semibold mb-4'>Amount: ${totalamount}</h1>
          <div className='flex flex-col space-y-2'>
            {['Cash on Delivery', 'UPI', 'Card', 'EMI'].map((method, index) => (
              <div key={index} className='flex items-center'>
                <input type="radio" id={method.toLowerCase().replace(/ /g, "-")}  name="payment-method" className='mr-2'/>
                <label htmlFor={method.toLowerCase().replace(/ /g, "-")} className='text-lg'>{method}</label>
              </div>
            ))}
          </div>
          <button onClick={verifyOrder} className='bg-blue-600 text-white rounded-md py-2 mt-4 w-full hover:bg-blue-700 transition duration-300'>Pay</button>
        </div>
      </div>
      <Footer />
    </div>
    )
}

export default Paymentsection
