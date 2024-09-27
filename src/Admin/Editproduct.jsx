import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Pascomponent } from '../App';

const Editproduct = () => {
  const {products, setProducts}=useContext(Pascomponent)
  const {productdelete}=useContext(Pascomponent)
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/Prudocts");
           // Corrected URL
          setProducts(response.data); 
         // Set the products state with the response data
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
      
    }, []);
    useEffect(()=>{
      const productadd=()=>{
        console.log(products)
        return products
        
      }
      productadd()
    },[products])
return (
  <div className='flex flex-wrap justify-center gap-5'>
  {products.map((item) => {
    return (
      <div 
        key={item.id} 
        className='w-full sm:w-[300px] md:w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-105'>
        
        {/* Product Image */}
        <div className='flex justify-center items-center bg-gray-100 p-4'>
          <div className='w-32 h-32 overflow-hidden rounded-full'>
            <img 
              className='object-cover w-full h-full' 
              src={item.image} 
              alt={item.name} 
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className='p-4'>
          <h1 className='text-lg font-bold text-gray-800 text-center mb-2'>{item.name}</h1>
          <h2 className='text-md text-gray-600 text-center'>Price: <span className='font-semibold'>${item.price}</span></h2>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-around p-4 border-t border-gray-200'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'>Edit</button>
          <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors' onClick={()=>productdelete(item)}>Delete</button>
        </div>
      </div>
    )
  })}
</div>


)
}

export default Editproduct
