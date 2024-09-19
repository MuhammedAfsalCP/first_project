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
    <div>
      <Navbar/>
     
        {Details.map((x,index)=>{
          return (
            <div key={index} className='w-[100vw] min-h-[70vh] bg-[#fcf8ef] flex justify-around items-center flex-wrap pt-[100px]'>
        <div className='w-[45vw] h-[50vh] bg-[#fcf8ef]'>
          <img className='object-contain w-full h-full'  src={x.image} alt="" />
        </div>
        <div className='w-[45vw] min-h-[50vh] bg-[#fcf8ef] pl-7 '>
         <h1 className='text-2xl font-semibold'>{x.name}</h1>
         <div className='w-[60px] mt-3 h-[30px] bg-green-600 rounded flex justify-around items-center'>
          <h1 className='text-white text-xl'>{x.rating}</h1>
          <box-icon name='star-half' type='solid' color='#f9f3f3' ></box-icon>
         </div>
         <h1 className='mt-3 text-2xl font-semibold'>Price = ${x.price}</h1>
         <h1 className='mt-3 text-xl font-semibold'>Catagory</h1>
         <h1 className='mt-3 text-xl font-semibold'>Brand = {x.brand}</h1>
         <h1 className='mt-3 text-xl font-semibold'>Weight = {x.weight}</h1>
         <h1 className='mt-3'>{x.description}</h1>
         <h1 className='mt-3 inline-block'>Increadiance =
         {x.ingredients.map((item,i)=>(
          <div key={i}><h1 key={i} className='mt-3 inline-block'>{item}</h1><br/></div>
          
         ))}</h1>
         <div className='mt-5 mb-5'>
         <button onClick={()=>cartadd(x)} className='bg-yellow-400 h-[50px] w-[100px] rounded hover:bg-yellow-600 hover:text-white'>Add to Cart</button>
            
        </div>
        </div> 
      </div>
          )
        })}
   
      <Footer/>
    </div>
  )
}

export default CartDetails
