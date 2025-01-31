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
    (<div class="hourglassBackground">
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
  const cartadd = (productId) => {
    if(login){
    dispatch(addToCart({ productId: productId }))
    setTimeout(() => {
      dispatch(getCart())
    }, 100);
    }else{
      navigate("/Login")}
  }

  // If there's an error, display the error message
  if (error) {
    return (<div>Error: {error}</div>)
  }
  const fetchspecificproduct = (productId) => {


    navigate('/spesificproduct', { state: productId })
  }
  
  return (
    <>
      {login?.is_staff ? <AdminPanel /> : (
        <div className="min-h-screen bg-[#f0f4f8] overflow-hidden flex flex-col">
          <Navbar />

          {/* Special Offer Section */}
          <div className="relative w-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 mx-auto md:mt-[6%] mt-[13%] max-w-6xl">
            <div className="max-w-md text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Special Offer!</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                Get <span className="font-bold text-blue-600">20% off</span> on your first purchase of pet food. Don't miss out!
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-3 text-lg rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                onClick={() => fetchspecificproduct(offerproduct.id)}
              >
                Shop Now
              </button>
            </div>
            <div className="flex-1">
              <img
                src={
                  offerproduct?.Image &&
                  typeof offerproduct?.Image === "string" &&
                  offerproduct?.Image.startsWith("https://petfoood.s3.amazonaws.com/https%3A")
                    ? offerproduct?.Image.replace(
                        "https://petfoood.s3.amazonaws.com/https%3A",
                        "https://"
                      )
                    : offerproduct?.Image
                }
                alt="Special Offer"
                className="w-full h-72 object-contain rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Product List Section */}
          <div className="pt-12 w-full flex flex-wrap justify-center gap-6 px-4 sm:px-6 md:px-12">
            {products?.length > 0 ? (
              products.map((product) => {
                // Ensure product.Image exists and is a string before applying the check
                const cleanImageUrl =
                  product.Image && typeof product.Image === "string" &&
                    product.Image.startsWith("https://petfoood.s3.amazonaws.com/https%3A")
                    ? product.Image.replace(
                      "https://petfoood.s3.amazonaws.com/https%3A",
                      "https://"
                    )
                    : product.Image;

                return (
                  <div
                    key={product.id}
                    className="w-full sm:w-72 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="overflow-hidden rounded-t-lg">
                      <img
                        className="w-full h-48 object-contain"
                        src={cleanImageUrl}
                        alt={product.Name}
                      />
                    </div>
                    <div className="p-4 flex flex-col items-center">
                      <h1 className="text-xl font-bold text-gray-800 text-center mb-2">
                        {product.Name}
                      </h1>
                      <h2 className="text-lg text-gray-600 mb-4">
                        Price: ₹{product.Price}
                      </h2>
                      <div className="flex justify-between w-full gap-4">
                        <button
                          className="flex-1 bg-blue-400 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transform hover:scale-105 transition-all"
                          onClick={() => cartadd(product.id)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="flex-1 bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transform hover:scale-105 transition-all"
                          onClick={() => fetchspecificproduct(product.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-red-500">No products found</h1>
              </div>
            )}
          </div>


          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mt-8 gap-4 mb-5">
            <button
              disabled={!previous}
              onClick={() => dispatch(fetchProducts({ url: previous }))}
              className={`px-6 py-2 rounded-md font-medium ${previous
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Previous
            </button>
            <button
              disabled={!next}
              onClick={() => dispatch(fetchProducts({ url: next }))}
              className={`px-6 py-2 rounded-md font-medium ${next
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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
