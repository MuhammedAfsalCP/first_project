import React, { useContext, useEffect } from 'react'; 
import { Pascomponent } from '../App';
import axios from 'axios';

const AllProducts = () => {
  const { products, setProducts } = useContext(Pascomponent); // contaxt accessing

  // rendering time product store
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Prudocts"); //getting product json
        setProducts(response.data); // product update
      } catch (error) {
        console.error("Error fetching products:", error); 
      }
    };
    fetchProducts(); 
  }, [setProducts]); 

  

  return (
    <div className='flex flex-wrap justify-center gap-5'> {/*  product cards */}
      {products.map((item) => {
        return (
          <div 
            key={item.id} 
            className='w-full sm:w-[300px] md:w-80 bg-[#ede4e4] rounded-lg shadow-lg transition-transform transform hover:scale-105'>
            
            <div className='flex justify-center items-center p-4'>
              <div className='w-32 h-32 overflow-hidden'>
                <img className='object-cover w-full h-full' src={item.image} alt={item.name}/>
              </div>
            </div>
            
            <div className='flex flex-col items-center p-4'>
              <h1 className='text-lg font-semibold text-center'>{item.name}</h1>
              <h2 className='text-md text-gray-600'>Price = ${item.price}</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllProducts; 
