import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Pascomponent } from '../../App'

const CartDetails = () => {
  const {filteredProducts,specificcart,cartadd}=useContext(Pascomponent)
  const [Details,setDetails]=useState([])
  useEffect(() => {
    if (filteredProducts.length > 0) {
      sessionStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
      sessionStorage.setItem('specificcart', specificcart);
    }
  }, [filteredProducts, specificcart]);

  // Retrieve data from sessionStorage if available on page load
  useEffect(() => {
    const storedProducts = sessionStorage.getItem('filteredProducts');
    const storedCartId = sessionStorage.getItem('specificcart');

    if (storedProducts && storedCartId) {
      const parsedProducts = JSON.parse(storedProducts);
      const filtered = parsedProducts.filter((x) => x.id === storedCartId);
      setDetails(filtered);
    } else {
      // If no session storage, use filteredProducts (initial load)
      const filtered = filteredProducts.filter((x) => x.id === specificcart);
      setDetails(filtered);
    }
  }, [filteredProducts, specificcart]);
 
  return (
    <div className='bg-[#fcf8ef]'>
    <Navbar />
    <div className='flex flex-col items-center'>
      {Details.map((x, index) => (
        <div key={index} className='w-full min-h-[70vh] bg-white shadow-lg rounded-lg flex flex-col md:flex-row justify-between items-center py-10 px-5 md:py-20'>
          
          {/* Image Section */}
          <div className='w-full md:w-[45vw] h-[300px] md:h-[50vh] bg-[#fcf8ef] flex items-center justify-center rounded-lg overflow-hidden shadow-md'>
            <img className='object-contain w-full h-full transition-transform duration-300 hover:scale-105' src={x.image} alt={x.name} />
          </div>
  
          {/* Details Section */}
          <div className='w-full md:w-[45vw] p-5 md:pl-7 flex flex-col justify-start'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800'>{x.name}</h1>
            
            <div className='flex items-center mt-3'>
              <div className='w-[60px] h-[30px] bg-green-600 rounded flex justify-center items-center'>
                <h1 className='text-white text-sm md:text-xl'>{x.rating}</h1>
                <box-icon name='star-half' type='solid' color='#f9f3f3' className='ml-1'></box-icon>
              </div>
            </div>
            
            <h1 className='mt-3 text-lg md:text-2xl font-semibold text-gray-600'>Price: <span className='text-green-600'>${x.price}</span></h1>
            <h1 className='mt-3 text-lg md:text-xl font-semibold text-gray-600'>Category: {x.category}</h1>
            <h1 className='mt-3 text-lg md:text-xl font-semibold text-gray-600'>Brand: {x.brand}</h1>
            <h1 className='mt-3 text-lg md:text-xl font-semibold text-gray-600'>Weight: {x.weight}</h1>
            <h1 className='mt-3 text-lg md:text-xl text-gray-700'>{x.description}</h1>
            
            <h1 className='mt-5 text-lg md:text-xl font-semibold text-gray-600'>
              Ingredients:
              <div className='mt-2'>
                {x.ingredients.map((item, i) => (
                  <span key={i} className='inline-block bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-800 mr-2'>{item}</span>
                ))}
              </div>
            </h1>
            
            <div className='mt-5'>
              <button onClick={() => cartadd(x)} className='bg-yellow-400 h-[50px] w-full md:w-[150px] rounded hover:bg-yellow-600 hover:text-white text-lg transition duration-300'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  
    <Footer />
  </div>
  

  )
}

export default CartDetails
