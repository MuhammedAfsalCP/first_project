import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AdminPanel from '../../Admin/AdminPanel';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchSpesificProduct, offerProduct } from '../../Redex/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCart } from '../../Redex/CartSlice';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, next, previous, offerproduct } = useSelector(state => state.Products);
  const { carterror, add, items } = useSelector(state => state.Cart);



  const { login } = useSelector((state) => state.User);

  const navigate = useNavigate()
  // Dispatch the fetchProducts action on component mount
  useEffect(() => {

    dispatch(fetchProducts({ page: 1, url: null }));
    dispatch(offerProduct())
  }, []);

  // If loading, display a loading message

  if (loading) {
    return /* From Uiverse.io by SouravBandyopadhyay */
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
    </div>
  }
  const cartadd = (productId) => {
    dispatch(addToCart({ productId: productId }))
    setTimeout(() => {
      dispatch(getCart())
    }, 100);
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }
  const fetchspecificproduct = (productId) => {


    navigate('/spesificproduct', { state: productId })
  }

  return (
    <>
      {login?.is_staff ? <AdminPanel /> : (
        <div className="min-h-screen bg-[#fcf8ef] overflow-hidden">
          <Navbar />

          {/* Special Offer Section */}
          <div className='w-full h-screen bg-gradient-to-r from-yellow-400 to-yellow-200 flex flex-col justify-center items-center text-center relative'>
            <img
              src={offerproduct?.Image}
              alt='Special Offer'
              className='absolute inset-0 w-full h-full object-cover object-center opacity-30'
            />
            <div className='relative z-10'>
              <h1 className='text-4xl font-bold text-gray-800 mb-4'>Special Offer!</h1>
              <p className='text-2xl text-gray-700 mb-6'>Get 20% off on your first purchase of pet food. Limited time offer!</p>
              <button className='bg-red-500 text-white px-8 py-4 text-lg rounded hover:bg-red-600 transition-all duration-300' onClick={() => fetchspecificproduct(offerproduct.id)}>
                Shop Now
              </button>
            </div>
          </div>

          {/* Product List Section */}
          <div className="pt-[80px] min-h-[60vh] w-full flex flex-wrap justify-center gap-6 p-4">
            {products?.length > 0 ? (products.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-80 bg-[#ede4e4] rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex justify-center items-center p-4">
                  <div className="w-32 h-32 overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={product.Image}
                      alt={product.Name}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center p-4">
                  <h1 className="text-lg font-semibold text-center">{product.Name}</h1>
                  <h2 className="text-md text-gray-600">Price = ₹{product.Price}</h2>
                  <div className="flex justify-between w-full mt-4">
                    <button className="bg-yellow-400 h-10 w-28 rounded hover:bg-yellow-600 hover:text-white transition-all duration-300" onClick={() => cartadd(product.id)}>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        fetchspecificproduct(product.id);
                      }}
                      className="bg-green-400 text-white h-10 w-28 rounded hover:bg-green-600 transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))) : <div><h1>invalid product</h1></div>}
          </div>

          {/* Pagination Buttons */}
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


          <Footer />
        </div>

      )}
    </>
  );
};

export default Home;
