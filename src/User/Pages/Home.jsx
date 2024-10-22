import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Pascomponent } from '../../App';
import axios from 'axios';
import AdminPanel from '../../Admin/AdminPanel';

const Home = () => {
  const [products, setProducts] = useState([])
  const {filteredProducts,setFilteredProducts,cartadd,search,admin,setAdmin}=useContext(Pascomponent)
  const {itemfilter,click}=useContext(Pascomponent)
  useEffect(()=>{
     
    const admin=localStorage.getItem("admin")
    if(admin){
      setAdmin(true)
      
    }
  },[admin])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Prudocts"); // Corrected URL
        setProducts(response.data); // Set the products state with the response data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const special = products.map((item)=> item.image)
  
  
 useEffect(()=>{
  const filterProducts = () => {
    if (itemfilter === true) {
      return products.filter((item) => item.category === "Dog Food");
    } else if (itemfilter === false) {
      return products.filter((item) => item.category === "Cat Food");
    } else {
      return products;
    }
 }
 setFilteredProducts(filterProducts());
}, [itemfilter, products])
  return (
    <>
    {admin?<AdminPanel/>:<div className='min-h-screen bg-[#fcf8ef] overflow-hidden'> 
  <Navbar />
  
  {/* Special Offer Section */}
  <div className='w-full h-screen bg-gradient-to-r from-yellow-400 to-yellow-200 flex flex-col justify-center items-center text-center relative'>
    <img
      src={special[3]} 
      alt='Special Offer'
      className='absolute inset-0 w-full h-full object-cover object-center opacity-30' 
    />
    <div className='relative z-10'> 
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>Special Offer!</h1>
      <p className='text-2xl text-gray-700 mb-6'>Get 20% off on your first purchase of pet food. Limited time offer!</p>
      <button className='bg-red-500 text-white px-8 py-4 text-lg rounded hover:bg-red-600 transition-all duration-300' onClick={() => click(4, 3)}>
        Shop Now
      </button>
    </div>
  </div>
  <div className='pt-[80px] min-h-[60vh] w-full flex flex-wrap justify-center gap-6 p-4'>
    {filteredProducts.filter((cart) => {
      return search.toLowerCase() === "" ? cart : cart.name.toLowerCase().includes(search);
    }).map((cart, index) => {
      return (
        <div key={cart.id} className='w-full sm:w-80 bg-[#ede4e4] rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-center items-center p-4'>
            <div className='w-32 h-32 overflow-hidden'>
              <img className='object-cover w-full h-full' src={cart.image} alt={cart.name} />
            </div>
          </div>
          <div className='flex flex-col items-center p-4'>
            <h1 className='text-lg font-semibold text-center'>{cart.name}</h1>
            <h2 className='text-md text-gray-600'>Price = ${cart.price}</h2>
            <div className='flex justify-between w-full mt-4'>
              <button onClick={() => cartadd(cart)} className='bg-yellow-400 h-10 w-28 rounded hover:bg-yellow-600 hover:text-white transition-all duration-300'>Add to Cart</button>
              <button onClick={() => click(cart.id, index)} className='bg-green-400 text-white h-10 w-28 rounded hover:bg-green-600 transition-all duration-300'>View Details</button>
            </div>
          </div>
        </div>
      )
    })}
  </div>
  <Footer />
</div>
}
    </>
  );
};

export default Home;
