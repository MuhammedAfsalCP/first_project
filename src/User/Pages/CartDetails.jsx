import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { Pascomponent } from '../../App'
import axios from 'axios'

const CartDetails = () => {
  
  const {filteredProducts,specificcart,cartadd,cartview}=useContext(Pascomponent)
  const [Details,setDetails]=useState([])
  const navigate=useNavigate()
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
      <div key={index} className='w-full min-h-[70vh] bg-[#fcf8ef] flex flex-col md:flex-row justify-around items-center py-10 px-5 md:py-20'>
        {/* Image Section */}
        <div className='w-full md:w-[45vw] h-[300px] md:h-[50vh] bg-[#fcf8ef] flex items-center justify-center'>
          <img className='object-contain w-full h-full' src={x.image} alt={x.name} />
        </div>
        
        {/* Details Section */}
        <div className='w-full md:w-[45vw] min-h-[50vh] bg-[#fcf8ef] p-5 md:pl-7'>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold'>{x.name}</h1>
          
          <div className='flex items-center mt-3'>
            <div className='w-[60px] h-[30px] bg-green-600 rounded flex justify-center items-center'>
              <h1 className='text-white text-sm md:text-xl'>{x.rating}</h1>
              <box-icon name='star-half' type='solid' color='#f9f3f3' className='ml-1' ></box-icon>
            </div>
          </div>
          
          <h1 className='mt-3 text-lg md:text-2xl font-semibold'>Price = ${x.price}</h1>
          <h1 className='mt-3 text-lg md:text-xl font-semibold'>Category</h1>
          <h1 className='mt-3 text-lg md:text-xl font-semibold'>Brand = {x.brand}</h1>
          <h1 className='mt-3 text-lg md:text-xl font-semibold'>Weight = {x.weight}</h1>
          <h1 className='mt-3 text-lg md:text-xl'>{x.description}</h1>
          
          <h1 className='mt-5 text-lg md:text-xl font-semibold'>
            Ingredients =
            {x.ingredients.map((item, i) => (
              <div key={i} className='mt-2'>
                <span className='inline-block'>{item}</span>
              </div>
            ))}
          </h1>
          
          <div className='mt-5'>
            <button onClick={() => cartadd(x)} className='bg-yellow-400 h-[50px] w-full md:w-[150px] rounded hover:bg-yellow-600 hover:text-white text-lg'>
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
