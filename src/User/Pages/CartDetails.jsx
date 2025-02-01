import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSpesificProduct } from '../../Redex/ProductSlice';
import { addToCart, getCart } from '../../Redex/CartSlice';

const CartDetails = () => {
  const { selectedProduct, loading, error } = useSelector(state => state.Products);

  const location = useLocation();
  const productId = location.state || null; // Fallback if location.state is null
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    if (productId) {
      dispatch(fetchSpesificProduct(productId));
    }
  }, []);

  if (loading) {
    return (<div class="hourglassBackground">
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

  if (error) {
    return (<div>Error: {error}</div>)
  }

  if (!selectedProduct) {
    return (<div>No product found!</div>)
  }
  const Back = () => {
    navigate('/')
   };
    const cartadd=()=>{
       if(login){
    dispatch(addToCart({ productId: productId }))
    setTimeout(() => {
      dispatch(getCart())
    }, 100);
    }else{
      navigate("/Login")}
     }
  return (
    <div className="bg-[#f0f4f8]">
    <Navbar />
    <div className="flex flex-col items-center">
      <div className="w-full min-h-[70vh] bg-white shadow-lg rounded-lg flex flex-col md:flex-row justify-between items-center py-10 px-5 md:py-20">
        {/* Image Section */}
        <div className="w-full md:w-[45vw] h-[300px] md:h-[50vh] bg-[#fcf8ef] flex items-center justify-center rounded-lg overflow-hidden mt-10 sm:mt-0 shadow-md">
          {selectedProduct.Image ? (
            <img
              className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
              src={selectedProduct.Image &&
                typeof selectedProduct.Image === "string" &&
                selectedProduct.Image.startsWith("https://petfoood.s3.amazonaws.com/https%3A")
                  ? selectedProduct.Image.replace(
                      "https://petfoood.s3.amazonaws.com/https%3A",
                      "https://"
                    )
                  : selectedProduct.Image}
              alt={selectedProduct.Name}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
  
        {/* Details Section */}
        <div className="w-full md:w-[45vw] p-5 md:pl-7 flex flex-col justify-start">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
            {selectedProduct.Name}
          </h1>
          <h1 className="mt-3 text-lg md:text-2xl font-semibold text-gray-600">
            Price: <span className="text-green-600">₹{selectedProduct.Price}</span>
          </h1>
          <h1 className="mt-3 text-lg md:text-xl font-semibold text-gray-600">
            Category: {selectedProduct.Category}
          </h1>
          <h1 className="mt-3 text-lg md:text-xl font-semibold text-gray-600">
            Brand: {selectedProduct.Brand}
          </h1>
          <h1 className="mt-3 text-lg md:text-xl font-semibold text-gray-600">
            Weight: {selectedProduct.Weight}
          </h1>
          <h1 className="mt-3 text-lg md:text-xl font-semibold text-gray-600">
            Stock: {selectedProduct.Stock}
          </h1>
          <h1 className="mt-3 text-lg md:text-xl text-gray-700">
            {selectedProduct.Description}
          </h1>
          <h1 className="mt-5 text-lg md:text-xl font-semibold text-gray-600">
            Ingredients:
            <div className="mt-2">
              {selectedProduct.Ingredient && selectedProduct.Ingredient.length > 0 ? (
                selectedProduct.Ingredient.map((item, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-800 mr-2"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span>No ingredients listed</span>
              )}
            </div>
          </h1>
          
          {/* Button Section */}
          <div className="mt-5 flex gap-3 w-full justify-between md:justify-start">
            <button
              onClick={Back} // Navigate to the previous page
              className="bg-gray-300 h-[50px] w-[90px] md:w-[150px] rounded hover:bg-gray-500 hover:text-white text-lg transition duration-300"
            >
              Back
            </button>
            <button 
              className="flex-1 bg-blue-400 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transform hover:scale-105 transition-all" 
              onClick={() => cartadd()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  

  );
};

export default CartDetails;
