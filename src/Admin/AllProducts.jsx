import React, { useContext, useEffect } from 'react';
import { Pascomponent } from '../App';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redex/ProductSlice';

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products, loading, error, selectedProduct, next, previous } = useSelector(state => state.Products);
  console.log(products)
  if (loading) {
    return (
    <div class="hourglassBackground">
      <div class="hourglassContainer">
        <div class="hourglassCurves"></div>
        <div class="hourglassCapTop"></div>
        <div class="hourglassGlassTop"></div>
        <div class="hourglassSand"></div>
        <div class="hourglassSandStream"></div>
        <div class="hourglassCapBottom"></div>
        <div class="hourglassGlass"></div>
      </div>
    </div>)
  }
  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-wrap justify-center gap-5'> {/*  product cards */}
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className='w-full sm:w-[300px] md:w-80 bg-[#ede4e4] rounded-lg shadow-lg transition-transform transform hover:scale-105'>

            <div className='flex justify-center items-center p-4'>
              <div className='w-32 h-32 overflow-hidden'>
                <img className='object-cover w-full h-full' src={product.Image &&
                  typeof product.Image === "string" &&
                  product.Image.startsWith("https://petfoood.s3.amazonaws.com/https%3A")
                  ? product.Image.replace(
                    "https://petfoood.s3.amazonaws.com/https%3A",
                    "https://"
                  )
                  : product.Image} alt={product.Name} />
              </div>
            </div>

            <div className='flex flex-col items-center p-4'>
              <h1 className='text-lg font-semibold text-center'>{product.Name}</h1>
              <h2 className='text-md text-gray-600'>Price = ${product.Price}</h2>
              <h2 className='text-md text-gray-600'>category = {product.Category}</h2>
            </div>
          </div>
        )
      })}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          disabled={!previous} // Disable if no previous page
          onClick={() => dispatch(fetchProducts({ url: previous }))}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          disabled={!next} // Disable if no next page
          onClick={() => dispatch(fetchProducts({ url: next }))}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllProducts; 
